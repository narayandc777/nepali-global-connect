import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ForgotPasswordFormData, forgotPasswordSchema } from '../src/utils/forms/formFields';
import { Link, router } from 'expo-router';
import api from '../src/config/api';
import { colors } from '@/src/theme/colors';
import { AuthScreen } from '../src/components/container/AuthScreen';
import { MBTextInput } from '../src/components/ui/MBTextInput';
import { MBButton } from '../src/components/ui/MBButton';
import { MBNotificationBar } from '../src/components/ui/MBNotificationBar';

const ForgotPasswordScreen = () => {
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
    <AuthScreen>
      <View style={styles.form}>
        <MBTextInput
          control={control}
          name="email"
          label="Email"
          placeholder="Enter your email"
          error={errors.email?.message}
        />

        <MBButton variant="primary" onPress={handleSubmit(onSubmit)} loading={loading}>
          Send Reset Link
        </MBButton>

        {success && resetToken && (
          <View style={styles.tokenContainer}>
            <Text style={styles.tokenText}>Reset Token (for demo):</Text>
            <Text style={styles.token}>{resetToken}</Text>
            <MBButton variant="outline" onPress={handleResetPassword} loading={loading}>
              Go to Reset Password
            </MBButton>
          </View>
        )}

        <View style={styles.backContainer}>
          <Text style={styles.rememberText}>Remember your password? </Text>
          <Link href="/login" asChild>
            <Text style={styles.backText}>Back to Login</Text>
          </Link>
        </View>
      </View>

      <MBNotificationBar
        visible={snackbarVisible}
        message={message}
        type={success ? 'success' : 'error'}
        onDismiss={() => setSnackbarVisible(false)}
      />
    </AuthScreen>
  );
};

export default ForgotPasswordScreen;

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
    alignItems: 'center',
    marginTop: 16,
  },
  backText: {
    color: colors.primary,
    fontWeight: '600',
  },
  rememberText: {
    color: colors.textGray,
    fontSize: 14,
  },
  successSnackbar: {
    backgroundColor: '#2e7d32',
  },
  errorSnackbar: {
    backgroundColor: '#d32f2f',
  },
});
