"# 🚀 Nepali Global Connect - Local Setup Guide

Complete step-by-step guide to set up and run the app locally on your machine.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software:
1. **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
2. **Python** (v3.9 or higher) - [Download](https://www.python.org/)
3. **MongoDB** (v5.0 or higher) - [Download](https://www.mongodb.com/try/download/community)
4. **Git** - [Download](https://git-scm.com/)
5. **Yarn** (Package Manager) - Install via: `npm install -g yarn`
6. **Expo CLI** (for mobile development) - Install via: `npm install -g expo-cli`

### Optional (for mobile testing):
- **Expo Go** app on your iOS/Android device
- **Android Studio** (for Android emulator)
- **Xcode** (for iOS simulator - Mac only)

---

## 📁 Project Structure

```
nepali-global-connect/
├── backend/              # FastAPI backend
│   ├── server.py
│   ├── models.py
│   ├── auth.py
│   ├── routes/
│   │   └── auth_routes.py
│   ├── requirements.txt
│   └── .env
├── frontend/             # Expo React Native app
│   ├── app/             # Screens (expo-router)
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── config/
│   │   ├── theme/
│   │   └── utils/
│   ├── package.json
│   └── .env
└── README.md
```

---

## 🗄️ Step 1: MongoDB Setup

### Option A: Local MongoDB Installation

1. **Install MongoDB Community Edition**
   ```bash
   # For macOS (using Homebrew)
   brew tap mongodb/brew
   brew install mongodb-community

   # For Ubuntu/Debian
   sudo apt-get install -y mongodb-org

   # For Windows
   # Download and install from: https://www.mongodb.com/try/download/community
   ```

2. **Start MongoDB Service**
   ```bash
   # macOS
   brew services start mongodb-community

   # Ubuntu/Debian
   sudo systemctl start mongod
   sudo systemctl enable mongod

   # Windows
   # MongoDB runs as a Windows Service automatically
   # Or run: net start MongoDB
   ```

3. **Verify MongoDB is Running**
   ```bash
   # Check if MongoDB is running
   mongosh
   # You should see MongoDB shell prompt

   # Or check the process
   ps aux | grep mongod  # macOS/Linux
   ```

4. **Create Database** (Optional - will be created automatically)
   ```bash
   mongosh
   > use test_database
   > show dbs
   > exit
   ```

### Option B: MongoDB Atlas (Cloud - Free Tier)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (Free tier)
4. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
5. Whitelist your IP address (0.0.0.0/0 for development)

---

## 🔧 Step 2: Backend Setup (FastAPI)

### 2.1 Navigate to Backend Directory
```bash
cd /path/to/your/project/backend
```

### 2.2 Create Python Virtual Environment
```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# macOS/Linux:
source venv/bin/activate

# Windows:
venv\Scripts\activate

# You should see (venv) in your terminal prompt
```

### 2.3 Install Python Dependencies
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

**requirements.txt content:**
```txt
fastapi==0.110.1
uvicorn==0.25.0
python-dotenv>=1.0.1
pymongo==4.5.0
motor==3.3.1
pydantic>=2.6.4
email-validator>=2.2.0
pyjwt>=2.10.1
bcrypt==4.1.3
passlib>=1.7.4
python-jose>=3.3.0
python-multipart>=0.0.9
```

### 2.4 Create Backend .env File
```bash
# Create .env file in backend directory
touch .env
```

**Edit .env file with:**
```env
# MongoDB Configuration
MONGO_URL=mongodb://localhost:27017
# For MongoDB Atlas, use:
# MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/

DB_NAME=nepali_global_connect

# JWT Secret (IMPORTANT: Change this in production!)
SECRET_KEY=your-super-secret-key-change-this-in-production-min-32-chars
```

### 2.5 Test Backend
```bash
# Make sure you're in the backend directory with venv activated
uvicorn server:app --reload --host 0.0.0.0 --port 8001

# You should see:
# INFO:     Uvicorn running on http://0.0.0.0:8001
# INFO:     Application startup complete.
```

### 2.6 Verify Backend is Working
Open a new terminal and test:
```bash
# Test root endpoint
curl http://localhost:8001/api/

# Expected response:
# {\"message\":\"Hello World\"}

# Test registration
curl -X POST http://localhost:8001/api/auth/register \
  -H \"Content-Type: application/json\" \
  -d '{
    \"email\": \"test@example.com\",
    \"username\": \"testuser\",
    \"password\": \"test123456\"
  }'

# You should get access_token and refresh_token
```

---

## 📱 Step 3: Frontend Setup (Expo React Native)

### 3.1 Navigate to Frontend Directory
```bash
cd /path/to/your/project/frontend
```

### 3.2 Install Node Dependencies
```bash
# Install dependencies using Yarn
yarn install

# Or using npm
npm install
```

### 3.3 Create Frontend .env File
```bash
# Create .env file in frontend directory
touch .env
```

**Edit .env file with:**
```env
# Backend API URL
EXPO_PUBLIC_BACKEND_URL=http://localhost:8001

# For testing on physical device, use your computer's IP:
# EXPO_PUBLIC_BACKEND_URL=http://192.168.1.XXX:8001
# Find your IP: ipconfig (Windows) or ifconfig (Mac/Linux)
```

### 3.4 Clear Cache (Optional but Recommended)
```bash
# Clear Metro bundler cache
yarn start --clear

# Or
npx expo start --clear
```

---

## 🎯 Step 4: Running the Application

### 4.1 Start Backend Server

**Terminal 1: Backend**
```bash
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

Keep this terminal running. You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8001
INFO:     Application startup complete.
```

### 4.2 Start Frontend Development Server

**Terminal 2: Frontend**
```bash
cd frontend
yarn start
# Or: npx expo start
```

You'll see a QR code and options to run on:
- Press `w` - Run on web browser
- Press `a` - Run on Android emulator
- Press `i` - Run on iOS simulator (Mac only)
- Scan QR code with Expo Go app on your phone

---

## 📲 Step 5: Testing the App

### Option 1: Web Browser (Easiest)
1. After `yarn start`, press `w`
2. Browser will open at `http://localhost:19006`
3. You'll see the splash screen → login page

### Option 2: Physical Device (Recommended for best experience)

**For Android:**
1. Install \"Expo Go\" app from Google Play Store
2. Make sure phone and computer are on the same WiFi
3. Scan the QR code from terminal
4. App will load on your phone

**For iOS:**
1. Install \"Expo Go\" app from App Store
2. Make sure phone and computer are on the same WiFi
3. Scan the QR code with Camera app
4. Tap notification to open in Expo Go

### Option 3: Android Emulator

1. **Install Android Studio**
2. **Set up Android Virtual Device (AVD)**
   - Open Android Studio
   - Tools → Device Manager
   - Create Virtual Device
   - Choose Pixel 4 or similar
   - Download system image (API 33 recommended)

3. **Start Emulator**
   ```bash
   # Start emulator from command line
   emulator -avd Pixel_4_API_33
   
   # Or start from Android Studio Device Manager
   ```

4. **Run App**
   ```bash
   cd frontend
   yarn start
   # Press 'a' when emulator is running
   ```

### Option 4: iOS Simulator (Mac Only)

1. **Install Xcode** from App Store
2. **Install Command Line Tools**
   ```bash
   xcode-select --install
   ```

3. **Run App**
   ```bash
   cd frontend
   yarn start
   # Press 'i'
   ```

---

## 🧪 Step 6: Testing the Features

### Test Authentication Flow:

1. **Splash Screen**
   - Should show for 3 seconds
   - Animated globe with \"Nepali Global Connect\"

2. **Register a New User**
   - Click \"Sign Up\" on login screen
   - Fill in: username, email, password
   - Submit registration

3. **Login**
   - Use registered credentials
   - Should redirect to home screen

4. **Home Screen**
   - View profile information
   - See \"Coming Soon\" features
   - Test logout button

5. **Forgot Password**
   - Click \"Forgot Password?\"
   - Enter email
   - Get reset token (for development)
   - Reset password

---

## 🔍 Step 7: Troubleshooting

### Backend Issues:

**Issue: MongoDB Connection Error**
```
pymongo.errors.ServerSelectionTimeoutError
```
**Solution:**
- Check if MongoDB is running: `mongosh`
- Verify MONGO_URL in .env
- For Atlas: Check network access and whitelist IP

**Issue: Module Not Found Error**
```
ModuleNotFoundError: No module named 'fastapi'
```
**Solution:**
- Activate virtual environment: `source venv/bin/activate`
- Reinstall dependencies: `pip install -r requirements.txt`

**Issue: Port Already in Use**
```
ERROR: [Errno 48] Address already in use
```
**Solution:**
```bash
# Find process using port 8001
lsof -i :8001  # Mac/Linux
netstat -ano | findstr :8001  # Windows

# Kill the process
kill -9 <PID>  # Mac/Linux
taskkill /PID <PID> /F  # Windows

# Or use different port
uvicorn server:app --reload --port 8002
```

### Frontend Issues:

**Issue: Network Request Failed**
```
Network request failed / Cannot connect to backend
```
**Solution:**
- Check backend is running on port 8001
- For physical device: Use computer's IP instead of localhost
  ```bash
  # Find your IP
  ipconfig  # Windows
  ifconfig | grep inet  # Mac/Linux
  
  # Update .env
  EXPO_PUBLIC_BACKEND_URL=http://192.168.1.XXX:8001
  ```
- Restart Expo: `yarn start --clear`

**Issue: Unable to Resolve Module**
```
Unable to resolve module react-native-paper
```
**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules
yarn install
yarn start --clear
```

**Issue: Expo Go App Not Connecting**
```
Could not connect to development server
```
**Solution:**
- Ensure phone and computer on same WiFi
- Disable VPN
- Check firewall isn't blocking port 19000
- Try tunnel mode: `yarn start --tunnel`

**Issue: White Screen / Blank Screen**
```
App loads but shows blank screen
```
**Solution:**
```bash
# Clear Metro cache
yarn start --clear

# Check logs in terminal
# Look for errors in console
```

### Common Errors:

**Issue: \"expo-secure-store not working on web\"**
- This is expected - web uses localStorage instead
- Works fine on physical devices

**Issue: API calls returning 401**
- Check EXPO_PUBLIC_BACKEND_URL is correct
- Clear app data and re-login
- Check backend logs for errors

---

## 📊 Step 8: View Database (Optional)

### Using MongoDB Compass (GUI):

1. **Download MongoDB Compass**: https://www.mongodb.com/try/download/compass
2. **Connect**: `mongodb://localhost:27017`
3. **Navigate**: `test_database` → `users` collection
4. **View**: All registered users

### Using mongosh (Command Line):

```bash
mongosh

> use test_database
> db.users.find().pretty()
> db.users.countDocuments()
> exit
```

---

## 🛠️ Development Workflow

### Daily Development:

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate
uvicorn server:app --reload --port 8001
```

**Terminal 2 - Frontend:**
```bash
cd frontend
yarn start
```

**Terminal 3 - MongoDB (if needed):**
```bash
mongosh
> use test_database
> db.users.find()
```

### Hot Reload:
- **Backend**: Auto-reloads on file changes (--reload flag)
- **Frontend**: Metro bundler auto-updates on save

---

## 📝 Important Notes

### For Physical Device Testing:
1. **Update Backend URL** in `frontend/.env`:
   ```env
   EXPO_PUBLIC_BACKEND_URL=http://YOUR_COMPUTER_IP:8001
   ```
2. Find your IP:
   ```bash
   # macOS/Linux
   ifconfig | grep \"inet \"
   
   # Windows
   ipconfig
   
   # Look for IPv4 Address (e.g., 192.168.1.XXX)
   ```

### Security Considerations:
- Change SECRET_KEY in production
- Use environment variables for sensitive data
- Never commit .env files to Git
- Use HTTPS in production

### Performance Tips:
- Use `--clear` flag when strange caching issues occur
- Restart both servers if hot reload stops working
- Close unused background apps to free memory

---

## 🎯 Quick Reference Commands

### Backend:
```bash
# Start backend
cd backend && source venv/bin/activate && uvicorn server:app --reload --port 8001

# Test endpoint
curl http://localhost:8001/api/

# View logs
tail -f server.log  # if logging to file
```

### Frontend:
```bash
# Start frontend
cd frontend && yarn start

# Clear cache and start
yarn start --clear

# Start with tunnel (for remote devices)
yarn start --tunnel

# Build for production
eas build --platform android  # or ios
```

### MongoDB:
```bash
# Start MongoDB
brew services start mongodb-community  # macOS
sudo systemctl start mongod  # Linux

# Check status
brew services list | grep mongodb  # macOS
sudo systemctl status mongod  # Linux

# Access MongoDB shell
mongosh
```

---

## 📱 Production Deployment Tips

### Backend Deployment:
- Use production WSGI server (Gunicorn)
- Enable HTTPS
- Set environment variables securely
- Use MongoDB Atlas or managed database
- Set up proper CORS policies

### Frontend Deployment:
- Build for production: `eas build`
- Submit to App Store / Play Store
- Configure app.json properly
- Use production API URLs
- Enable analytics

---

## 🆘 Getting Help

### Resources:
- **FastAPI Docs**: https://fastapi.tiangolo.com/
- **Expo Docs**: https://docs.expo.dev/
- **React Native Paper**: https://callstack.github.io/react-native-paper/
- **MongoDB Docs**: https://www.mongodb.com/docs/

### Common Issues:
- Check terminal logs for errors
- Verify all services are running
- Ensure .env files are configured
- Clear caches when in doubt

---

## ✅ Setup Verification Checklist

- [ ] MongoDB installed and running
- [ ] Python virtual environment created and activated
- [ ] Backend dependencies installed
- [ ] Backend .env file configured
- [ ] Backend starts successfully on port 8001
- [ ] Node.js and Yarn installed
- [ ] Frontend dependencies installed
- [ ] Frontend .env file configured
- [ ] Frontend starts successfully
- [ ] Can access app on web/device
- [ ] Can register new user
- [ ] Can login successfully
- [ ] Backend API responds to requests

---

## 🎉 You're All Set!

Your **Nepali Global Connect** app should now be running locally!

**Next Steps:**
1. Test all authentication features
2. Start building community features (events, posts, feeds)
3. Add more functionality as needed
4. Deploy to production when ready

Happy Coding! 🚀
"