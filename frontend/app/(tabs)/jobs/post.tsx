import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, Chip, Snackbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'expo-router';
import { colors } from '../../../src/theme/colors';

const jobSchema = z.object({
  jobTitle: z.string().min(3, 'Job title must be at least 3 characters'),
  company: z.string().min(2, 'Company name is required'),
  country: z.string().min(2, 'Country is required'),
  city: z.string().min(2, 'City is required'),
  area: z.string().optional(),
  salary: z.string().optional(),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  requirements: z.string().optional(),
  contactEmail: z.string().email('Invalid email').optional().or(z.literal('')),
  contactPhone: z.string().optional(),
});

type JobFormData = z.infer<typeof jobSchema>;

export default function PostJobScreen() {
  const router = useRouter();
  const [jobType, setJobType] = useState('Full-time');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      jobTitle: '',
      company: '',
      country: '',
      city: '',
      area: '',
      salary: '',
      description: '',
      requirements: '',
      contactEmail: '',
      contactPhone: '',
    },
  });

  const onSubmit = (data: JobFormData) => {
    console.log('Job data:', { ...data, jobType });
    setSnackbarMessage('Job posted successfully!');
    setSnackbarVisible(true);
    setTimeout(() => router.back(), 1500);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Text variant="headlineMedium" style={styles.title}>
              Post a Job
            </Text>

            {/* Job Title */}
            <Controller
              control={control}
              name="jobTitle"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Job Title *"
                  mode="outlined"
                  placeholder="e.g. Senior Software Engineer"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.jobTitle}
                  style={styles.input}
                />
              )}
            />
            {errors.jobTitle && (
              <Text variant="bodySmall" style={styles.errorText}>
                {errors.jobTitle.message}
              </Text>
            )}

            {/* Company */}
            <Controller
              control={control}
              name="company"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Company *"
                  mode="outlined"
                  placeholder="Company name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.company}
                  style={styles.input}
                />
              )}
            />
            {errors.company && (
              <Text variant="bodySmall" style={styles.errorText}>
                {errors.company.message}
              </Text>
            )}

            <Text variant="titleMedium" style={styles.sectionTitle}>
              Location
            </Text>

            {/* Country */}
            <Controller
              control={control}
              name="country"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Country *"
                  mode="outlined"
                  placeholder="e.g. United States"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.country}
                  style={styles.input}
                />
              )}
            />
            {errors.country && (
              <Text variant="bodySmall" style={styles.errorText}>
                {errors.country.message}
              </Text>
            )}

            {/* City */}
            <Controller
              control={control}
              name="city"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="City *"
                  mode="outlined"
                  placeholder="e.g. New York"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.city}
                  style={styles.input}
                />
              )}
            />
            {errors.city && (
              <Text variant="bodySmall" style={styles.errorText}>
                {errors.city.message}
              </Text>
            )}

            {/* Area */}
            <Controller
              control={control}
              name="area"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Area/Neighborhood"
                  mode="outlined"
                  placeholder="e.g. Manhattan"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.input}
                />
              )}
            />

            {/* Job Type */}
            <Text variant="titleMedium" style={styles.label}>
              Job Type
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {jobTypes.map((type) => (
                <Chip
                  key={type}
                  selected={jobType === type}
                  onPress={() => setJobType(type)}
                  style={styles.chip}
                >
                  {type}
                </Chip>
              ))}
            </ScrollView>

            {/* Salary */}
            <Controller
              control={control}
              name="salary"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Salary Range"
                  mode="outlined"
                  placeholder="e.g. $80k - $100k"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.input}
                />
              )}
            />

            {/* Description */}
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Job Description *"
                  mode="outlined"
                  placeholder="Describe the job role, responsibilities..."
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  multiline
                  numberOfLines={6}
                  error={!!errors.description}
                  style={styles.input}
                />
              )}
            />
            {errors.description && (
              <Text variant="bodySmall" style={styles.errorText}>
                {errors.description.message}
              </Text>
            )}

            {/* Requirements */}
            <Controller
              control={control}
              name="requirements"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Requirements"
                  mode="outlined"
                  placeholder="List qualifications and skills required..."
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  multiline
                  numberOfLines={4}
                  style={styles.input}
                />
              )}
            />

            <Text variant="titleMedium" style={styles.sectionTitle}>
              Contact Information
            </Text>

            {/* Email */}
            <Controller
              control={control}
              name="contactEmail"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Email"
                  mode="outlined"
                  placeholder="contact@company.com"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={!!errors.contactEmail}
                  style={styles.input}
                />
              )}
            />
            {errors.contactEmail && (
              <Text variant="bodySmall" style={styles.errorText}>
                {errors.contactEmail.message}
              </Text>
            )}

            {/* Phone */}
            <Controller
              control={control}
              name="contactPhone"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Phone"
                  mode="outlined"
                  placeholder="+1 (555) 123-4567"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="phone-pad"
                  style={styles.input}
                />
              )}
            />

            {/* Submit Button */}
            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              style={styles.submitButton}
            >
              Post Job
            </Button>

            <View style={styles.bottomPadding} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
      >
        {snackbarMessage}
      </Snackbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 24,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 16,
  },
  label: {
    marginTop: 16,
    marginBottom: 12,
  },
  input: {
    marginBottom: 12,
  },
  chip: {
    marginRight: 8,
    marginBottom: 12,
  },
  errorText: {
    color: colors.error,
    marginBottom: 12,
    marginTop: -8,
  },
  submitButton: {
    marginTop: 24,
    paddingVertical: 6,
  },
  bottomPadding: {
    height: 32,
  },
});
