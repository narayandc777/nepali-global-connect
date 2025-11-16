import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Snackbar } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFormData, registerSchema } from '../src/utils/forms/formFields';
import { Link, router } from 'expo-router';
import { useAuth } from '../src/contexts/AuthContext';
import { GlobeIcon } from '../src/components/GlobeIcon';
import { AuthScreen } from '../src/components/container/AuthScreen';
import { MBTextInput } from '../src/components/ui/MBTextInput';
import { MBButton } from '../src/components/ui/MBButton';
import { MBDivider } from '../src/components/ui/MBDivider';
import { MBNotificationBar } from '../src/components/ui/MBNotificationBar';
import { colors } from '../src/theme/colors';

const RegisterScreen = () => {
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setLoading(true);
      setError('');
      await register(data.email, data.password, data.username);
      router.replace('/(tabs)/home');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthScreen>
      <View style={styles.container}>
        {/* Header with Globe */}
        <View style={styles.header}>
          <GlobeIcon size={80} color={colors.primary} />
          <Text style={styles.title}>Join Nepali Global Connect</Text>
          <Text style={styles.subtitle}>Create Your Account</Text>
          <Text style={styles.description}>Connect with Nepalese around the world</Text>
        </View>

        {/* Register Form */}
        <View style={styles.formContainer}>
          <MBTextInput
            control={control}
            name="username"
            label="Username"
            error={errors.username?.message}
            left={<TextInput.Icon icon="account-outline" color={colors.primary} />}
          />

          <MBTextInput
            control={control}
            name="email"
            label="Email"
            error={errors.email?.message}
            left={<TextInput.Icon icon="email-outline" color={colors.primary} />}
          />

          <MBTextInput
            control={control}
            name="password"
            label="Password"
            error={errors.password?.message}
            left={<TextInput.Icon icon="lock-outline" color={colors.primary} />}
            right={
              <TextInput.Icon
                icon={showPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowPassword(!showPassword)}
                color={colors.primary}
              />
            }
          />

          <MBTextInput
            control={control}
            name="confirmPassword"
            label="Confirm Password"
            error={errors.confirmPassword?.message}
            left={<TextInput.Icon icon="lock-check-outline" color={colors.primary} />}
            right={
              <TextInput.Icon
                icon={showConfirmPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                color={colors.primary}
              />
            }
          />

          <MBButton variant="primary" onPress={handleSubmit(onSubmit)}>
            Sign Up
          </MBButton>

          <MBDivider text="OR" />

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <Link href="/login" asChild>
              <Text style={styles.loginLink}>Login</Text>
            </Link>
          </View>
        </View>
      </View>

      <MBNotificationBar
        visible={snackbarVisible}
        message={error}
        type="error"
        onDismiss={() => setSnackbarVisible(false)}
      />
    </AuthScreen>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.primary,
    marginTop: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  input: {
    marginBottom: 8,
    backgroundColor: colors.background,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginBottom: 12,
    marginLeft: 8,
  },
  registerButton: {
    marginVertical: 16,
    borderRadius: 8,
  },
  registerButtonContent: {
    paddingVertical: 8,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: colors.textGray,
    fontSize: 14,
  },
  loginLink: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  snackbar: {
    backgroundColor: colors.error,
  },
});
