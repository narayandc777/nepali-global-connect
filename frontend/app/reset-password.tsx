import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPasswordFormData, resetPasswordSchema } from '../src/utils/forms/formFields';
import { useLocalSearchParams, router } from 'expo-router';
import api from '../src/config/api';
import { AuthScreen } from '../src/components/container/AuthScreen';
import { MBTextInput } from '../src/components/ui/MBTextInput';
import { MBButton } from '../src/components/ui/MBButton';
import { MBNotificationBar } from '../src/components/ui/MBNotificationBar';

const ResetPasswordScreen = () => {
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
    <AuthScreen>
      <View style={styles.form}>
        <MBTextInput
          control={control}
          name="newPassword"
          label="New Password"
          placeholder="Enter new password"
          secureTextEntry
          error={errors.newPassword?.message}
        />

        <MBTextInput
          control={control}
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Re-enter new password"
          secureTextEntry
          error={errors.confirmPassword?.message}
        />

        <MBButton variant="primary" onPress={handleSubmit(onSubmit)} loading={loading}>
          Reset Password
        </MBButton>
      </View>

      <MBNotificationBar
        visible={snackbarVisible}
        message={message}
        type={isSuccess ? 'success' : 'error'}
        onDismiss={() => setSnackbarVisible(false)}
      />
    </AuthScreen>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  form: {
    width: '100%',
  },
});
