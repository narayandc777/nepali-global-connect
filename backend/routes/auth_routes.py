from fastapi import APIRouter, HTTPException, status, Depends
from datetime import datetime, timedelta
from bson import ObjectId
import sys
from pathlib import Path

# Add parent directory to path
sys.path.append(str(Path(__file__).parent.parent))

from models import (
    UserCreate, UserResponse, Token, LoginRequest, 
    RefreshTokenRequest, ForgotPasswordRequest, 
    ResetPasswordRequest, PasswordChangeRequest
)
from auth import (
    get_password_hash, verify_password, create_access_token,
    create_refresh_token, verify_token, generate_reset_token,
    get_current_user_id, RESET_TOKEN_EXPIRE_HOURS
)

router = APIRouter(prefix="/auth", tags=["authentication"])

# This will be set by the main server.py
db = None

def set_db(database):
    global db
    db = database

@router.post("/register", response_model=Token, status_code=status.HTTP_201_CREATED)
async def register(user: UserCreate):
    """Register a new user"""
    # Check if user already exists
    existing_user = await db.users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Check if username is taken
    existing_username = await db.users.find_one({"username": user.username})
    if existing_username:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already taken"
        )
    
    # Create new user
    user_dict = {
        "email": user.email,
        "username": user.username,
        "hashed_password": get_password_hash(user.password),
        "profile_image": None,
        "created_at": datetime.utcnow(),
        "reset_token": None,
        "reset_token_expiry": None
    }
    
    result = await db.users.insert_one(user_dict)
    user_id = str(result.inserted_id)
    
    # Create tokens
    access_token = create_access_token(data={"sub": user_id})
    refresh_token = create_refresh_token(data={"sub": user_id})
    
    return Token(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer"
    )

@router.post("/login", response_model=Token)
async def login(login_data: LoginRequest):
    """Login with email and password"""
    # Find user by email
    user = await db.users.find_one({"email": login_data.email})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Verify password
    if not verify_password(login_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    user_id = str(user["_id"])
    
    # Create tokens
    access_token = create_access_token(data={"sub": user_id})
    refresh_token = create_refresh_token(data={"sub": user_id})
    
    return Token(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer"
    )

@router.post("/refresh", response_model=Token)
async def refresh_token(refresh_data: RefreshTokenRequest):
    """Get a new access token using refresh token"""
    payload = verify_token(refresh_data.refresh_token, "refresh")
    
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token"
        )
    
    user_id = payload.get("sub")
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token"
        )
    
    # Verify user still exists
    user = await db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    
    # Create new tokens
    access_token = create_access_token(data={"sub": user_id})
    new_refresh_token = create_refresh_token(data={"sub": user_id})
    
    return Token(
        access_token=access_token,
        refresh_token=new_refresh_token,
        token_type="bearer"
    )

@router.post("/forgot-password")
async def forgot_password(request: ForgotPasswordRequest):
    """Request a password reset token"""
    user = await db.users.find_one({"email": request.email})
    
    # Always return success to prevent email enumeration
    if not user:
        return {"message": "If the email exists, a reset token has been generated"}
    
    # Generate reset token
    reset_token = generate_reset_token()
    reset_token_expiry = datetime.utcnow() + timedelta(hours=RESET_TOKEN_EXPIRE_HOURS)
    
    # Update user with reset token
    await db.users.update_one(
        {"_id": user["_id"]},
        {"$set": {
            "reset_token": reset_token,
            "reset_token_expiry": reset_token_expiry
        }}
    )
    
    # In production, send email here with reset_token
    # For now, return it in response (ONLY FOR DEVELOPMENT)
    return {
        "message": "If the email exists, a reset token has been generated",
        "reset_token": reset_token  # Remove this in production
    }

@router.post("/reset-password")
async def reset_password(request: ResetPasswordRequest):
    """Reset password using reset token"""
    # Find user with valid reset token
    user = await db.users.find_one({
        "reset_token": request.token,
        "reset_token_expiry": {"$gt": datetime.utcnow()}
    })
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token"
        )
    
    # Update password and clear reset token
    await db.users.update_one(
        {"_id": user["_id"]},
        {"$set": {
            "hashed_password": get_password_hash(request.new_password),
            "reset_token": None,
            "reset_token_expiry": None
        }}
    )
    
    return {"message": "Password reset successful"}

@router.get("/me", response_model=UserResponse)
async def get_current_user(user_id: str = Depends(get_current_user_id)):
    """Get current user information"""
    user = await db.users.find_one({"_id": ObjectId(user_id)})
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return UserResponse(
        id=str(user["_id"]),
        email=user["email"],
        username=user["username"],
        profile_image=user.get("profile_image"),
        created_at=user["created_at"]
    )

@router.post("/change-password")
async def change_password(
    request: PasswordChangeRequest,
    user_id: str = Depends(get_current_user_id)
):
    """Change password for authenticated user"""
    user = await db.users.find_one({"_id": ObjectId(user_id)})
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Verify old password
    if not verify_password(request.old_password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid old password"
        )
    
    # Update password
    await db.users.update_one(
        {"_id": user["_id"]},
        {"$set": {"hashed_password": get_password_hash(request.new_password)}}
    )
    
    return {"message": "Password changed successfully"}

@router.post("/logout")
async def logout(user_id: str = Depends(get_current_user_id)):
    """Logout (client should delete tokens)"""
    # In a more sophisticated system, you might invalidate tokens here
    # For JWT, we rely on client-side token deletion
    return {"message": "Logged out successfully"}