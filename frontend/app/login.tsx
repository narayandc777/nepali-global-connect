import { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormData, loginSchema } from '../src/utils/forms/formFields';
import { Link, router } from 'expo-router';
import { useAuth } from '../src/contexts/AuthContext';
import { GlobeIcon } from '../src/components/GlobeIcon';
import { AuthScreen } from '../src/components/container/AuthScreen';
import { MBTextInput } from '../src/components/ui/MBTextInput';
import { MBTextLink } from '../src/components/ui/MBTextLink';
import { MBButton } from '../src/components/ui/MBButton';
import { MBDivider } from '../src/components/ui/MBDivider';
import { MBNotificationBar } from '../src/components/ui/MBNotificationBar';
import { colors } from '../src/theme/colors';

const LoginScreen = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);
      setError('');
      await login(data.email, data.password);
      router.replace('/(tabs)/home');
    } catch (err: any) {
      setError(err.message || 'Login failed');
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
          <GlobeIcon size={100} color={colors.primary} />
          <Text style={styles.title}>Nepali Global Connect</Text>
          <Text style={styles.subtitle}>Welcome Back!</Text>
          <Text style={styles.description}>Login to connect with Nepalese worldwide</Text>
        </View>

        {/* Login Form */}
        <View style={styles.formContainer}>
          <MBTextInput
            control={control}
            name="email"
            label="Email"
            placeholder="Enter your email"
            error={errors.email?.message}
            left={<TextInput.Icon icon="email-outline" color={colors.primary} />}
          />

          <MBTextInput
            control={control}
            name="password"
            label="Password"
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
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

          <MBTextLink text="Forgot Password?" href="/forgot-password" position="end" />
          <MBButton variant="primary" onPress={handleSubmit(onSubmit)} loading={loading}>
            Login
          </MBButton>

          <MBDivider text="OR" />

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <Link href="/register" asChild>
              <Pressable>
                <Text style={styles.signupLink}>Sign Up</Text>
              </Pressable>
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

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 22,
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
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    color: colors.textGray,
    fontSize: 14,
  },
  signupLink: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
});
