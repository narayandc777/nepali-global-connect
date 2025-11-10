import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, Snackbar, Card } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../../src/theme/colors';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(7, 'Phone number is too short'),
  adults: z
    .string()
    .regex(/^\d+$/, 'Must be a number')
    .refine((val) => parseInt(val) > 0, 'At least one adult required'),
  children: z.string().regex(/^\d+$/, 'Must be a number'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function EventRegisterScreen() {
  const { id } = useLocalSearchParams();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Dummy event (replace with real data later)
  const event = {
    id,
    title: 'AI & Machine Learning Meetup',
    date: 'Nov 20, 2025 | 6:00 PM',
    location: 'WeWork, Midtown NYC',
    description: 'Join fellow AI enthusiasts for lightning talks and networking.',
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      adults: '1',
      children: '0',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      console.log('Registration data:', data);
      setSuccess(true);
    } catch (err: any) {
      setError('Registration failed. Please try again.');
      setSnackbarVisible(true);
    }
  };

  if (success) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.successContainer}>
          <Text variant="headlineSmall" style={styles.successTitle}>
            🎉 Registration Confirmed!
          </Text>
          <Text variant="bodyMedium" style={styles.successText}>
            You’re successfully registered for:
          </Text>
          <Text variant="titleMedium" style={styles.eventTitle}>
            {event.title}
          </Text>
          <Text variant="bodySmall" style={styles.eventDetail}>
            📅 {event.date}
          </Text>
          <Text variant="bodySmall" style={styles.eventDetail}>
            📍 {event.location}
          </Text>

          <Button
            mode="contained"
            style={styles.backButton}
            onPress={() => router.replace('/(tabs)/communities')}
          >
            Back to Events
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="headlineSmall" style={styles.eventTitle}>
                {event.title}
              </Text>
              <Text variant="bodySmall" style={styles.eventDetail}>
                📅 {event.date}
              </Text>
              <Text variant="bodySmall" style={styles.eventDetail}>
                📍 {event.location}
              </Text>
              <Text variant="bodySmall" style={styles.eventDescription}>
                {event.description}
              </Text>
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Register to Participate
              </Text>

              <Controller
                control={control}
                name="fullName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Full Name"
                    mode="outlined"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={!!errors.fullName}
                    style={styles.input}
                    outlineColor={colors.border}
                    activeOutlineColor={colors.primary}
                    left={<TextInput.Icon icon="account" color={colors.primary} />}
                  />
                )}
              />
              {errors.fullName && <Text style={styles.errorText}>{errors.fullName.message}</Text>}

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Email"
                    mode="outlined"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    error={!!errors.email}
                    style={styles.input}
                    outlineColor={colors.border}
                    activeOutlineColor={colors.primary}
                    left={<TextInput.Icon icon="email-outline" color={colors.primary} />}
                  />
                )}
              />
              {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Phone Number"
                    mode="outlined"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="phone-pad"
                    error={!!errors.phone}
                    style={styles.input}
                    outlineColor={colors.border}
                    activeOutlineColor={colors.primary}
                    left={<TextInput.Icon icon="phone" color={colors.primary} />}
                  />
                )}
              />
              {errors.phone && <Text style={styles.errorText}>{errors.phone.message}</Text>}

              <Controller
                control={control}
                name="adults"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    label="Number of Adults"
                    mode="outlined"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="numeric"
                    error={!!errors.adults}
                    style={styles.input}
                    outlineColor={colors.border}
                    activeOutlineColor={colors.primary}
                    left={<TextInput.Icon icon="account-group" color={colors.primary} />}
                  />
                )}
              />
              {errors.adults && <Text style={styles.errorText}>{errors.adults.message}</Text>}

              <Controller
                control={control}
                name="children"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    label="Number of Children"
                    mode="outlined"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="numeric"
                    error={!!errors.children}
                    style={styles.input}
                    outlineColor={colors.border}
                    activeOutlineColor={colors.primary}
                    left={<TextInput.Icon icon="baby-face-outline" color={colors.primary} />}
                  />
                )}
              />
              {errors.children && <Text style={styles.errorText}>{errors.children.message}</Text>}

              <Button
                mode="contained"
                onPress={handleSubmit(onSubmit)}
                style={styles.confirmButton}
                buttonColor={colors.primary}
                textColor={colors.textWhite}
              >
                Confirm Participation
              </Button>
            </Card.Content>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={styles.snackbar}
      >
        {error}
      </Snackbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  keyboardView: { flex: 1 },
  scrollContent: { flexGrow: 1, padding: 16 },
  card: { marginBottom: 16 },
  eventTitle: { fontWeight: 'bold', marginBottom: 4, color: colors.primary },
  eventDetail: { color: colors.textSecondary, marginBottom: 2 },
  eventDescription: { marginTop: 8, color: colors.primary },
  sectionTitle: { fontWeight: '600', marginBottom: 12 },
  input: { marginBottom: 8, backgroundColor: colors.background },
  errorText: { color: colors.error, fontSize: 12, marginBottom: 6, marginLeft: 8 },
  confirmButton: { marginTop: 12, borderRadius: 8 },
  snackbar: { backgroundColor: colors.error },
  successContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  successTitle: { color: colors.primary, marginBottom: 8, textAlign: 'center' },
  successText: { color: colors.textSecondary, marginBottom: 12, textAlign: 'center' },
  backButton: { marginTop: 20, borderRadius: 8 },
});
