import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Snackbar } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLocalSearchParams, router } from 'expo-router';
import { AuthContainer } from '../src/components/AuthContainer';
import { AuthInput } from '../src/components/AuthInput';
import { AuthButton } from '../src/components/AuthButton';
import api from '../src/config/api';

const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordScreen() {
  const { token } = useLocalSearchParams<{ token?: string }>();
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      setMessage('Invalid reset token');
      setSnackbarVisible(true);
      return;
    }

    try {
      setLoading(true);
      await api.post('/auth/reset-password', {
        token,
        new_password: data.newPassword,
      });
      setIsSuccess(true);
      setMessage('Password reset successful!');
      setSnackbarVisible(true);
      setTimeout(() => {
        router.replace('/login');
      }, 2000);
    } catch (err: any) {
      setMessage(err.response?.data?.detail || 'Failed to reset password');
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer title="Reset Password" subtitle="Enter your new password">
      <View style={styles.form}>
        <AuthInput
          control={control}
          name="newPassword"
          label="New Password"
          placeholder="Enter new password"
          secureTextEntry
          error={errors.newPassword?.message}
        />

        <AuthInput
          control={control}
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Re-enter new password"
          secureTextEntry
          error={errors.confirmPassword?.message}
        />

        <AuthButton onPress={handleSubmit(onSubmit)} loading={loading}>
          Reset Password
        </AuthButton>
      </View>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={isSuccess ? styles.successSnackbar : styles.errorSnackbar}
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
  successSnackbar: {
    backgroundColor: '#2e7d32',
  },
  errorSnackbar: {
    backgroundColor: '#d32f2f',
  },
});
