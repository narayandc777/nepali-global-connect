import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Snackbar } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, router } from 'expo-router';
import { AuthContainer } from '../src/components/AuthContainer';
import { AuthInput } from '../src/components/AuthInput';
import { AuthButton } from '../src/components/AuthButton';
import api from '../src/config/api';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordScreen() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resetToken, setResetToken] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [message, setMessage] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setLoading(true);
      const response = await api.post('/auth/forgot-password', data);
      setSuccess(true);
      setResetToken(response.data.reset_token);
      setMessage('Password reset token generated! Check your email.');
      setSnackbarVisible(true);
    } catch (err: any) {
      setMessage(err.response?.data?.detail || 'Failed to send reset link');
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = () => {
    router.push(`/reset-password?token=${resetToken}`);
  };

  return (
    <AuthContainer
      title="Forgot Password"
      subtitle="Enter your email to receive a reset link"
    >
      <View style={styles.form}>
        <AuthInput
          control={control}
          name="email"
          label="Email"
          placeholder="Enter your email"
          keyboardType="email-address"
          error={errors.email?.message}
        />

        <AuthButton onPress={handleSubmit(onSubmit)} loading={loading}>
          Send Reset Link
        </AuthButton>

        {success && resetToken && (
          <View style={styles.tokenContainer}>
            <Text style={styles.tokenText}>Reset Token (for demo):</Text>
            <Text style={styles.token}>{resetToken}</Text>
            <AuthButton mode="outlined" onPress={handleResetPassword}>
              Go to Reset Password
            </AuthButton>
          </View>
        )}

        <View style={styles.backContainer}>
          <Text>Remember your password? </Text>
          <Link href="/login" asChild>
            <Text style={styles.backText}>Back to Login</Text>
          </Link>
        </View>
      </View>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={4000}
        style={success ? styles.successSnackbar : styles.errorSnackbar}
      >
        {message}
      </Snackbar>
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  form: {
    width: '100%',
  },
  tokenContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
  },
  tokenText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  token: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: '#2e7d32',
    marginBottom: 16,
  },
  backContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  backText: {
    color: '#6200ee',
    fontWeight: '600',
  },
  successSnackbar: {
    backgroundColor: '#2e7d32',
  },
  errorSnackbar: {
    backgroundColor: '#d32f2f',
  },
});
