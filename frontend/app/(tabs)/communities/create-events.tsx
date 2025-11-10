import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Text, TextInput, Button, Chip, Snackbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { colors } from '../../../src/theme/colors';

const eventSchema = z.object({
  title: z.string().min(3, 'Event title must be at least 3 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  startDate: z.date(),
  endDate: z.date(),
  location: z.string().min(3, 'Location is required'),
  address: z.string().optional(),
});

type EventFormData = z.infer<typeof eventSchema>;

export default function CreateEventScreen() {
  const router = useRouter();

  // UI state
  const [category, setCategory] = useState('General');
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const categories = ['General', 'Tech', 'Sports', 'Networking', 'Education', 'Social'];

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      description: '',
      startDate: new Date(),
      endDate: new Date(),
      location: '',
      address: '',
    },
  });

  const onSubmit = (data: EventFormData) => {
    console.log('Event created:', { ...data, category });
    setSnackbarVisible(true);
    setTimeout(() => router.back(), 1500);
  };

  const startDate = watch('startDate');
  const endDate = watch('endDate');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Text variant="headlineMedium" style={styles.title}>
              Create Event
            </Text>

            {/* Event Title */}
            <Controller
              control={control}
              name="title"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Event Title *"
                  mode="outlined"
                  placeholder="e.g. Hackathon 2025"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.title}
                  style={styles.input}
                />
              )}
            />
            {errors.title && (
              <Text variant="bodySmall" style={styles.errorText}>
                {errors.title.message}
              </Text>
            )}

            {/* Description */}
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Description *"
                  mode="outlined"
                  multiline
                  numberOfLines={4}
                  placeholder="Describe your event..."
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
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

            {/* Category Chips */}
            <Text variant="titleMedium" style={styles.label}>
              Category
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categories.map((cat) => (
                <Chip
                  key={cat}
                  selected={category === cat}
                  onPress={() => setCategory(cat)}
                  style={styles.chip}
                >
                  {cat}
                </Chip>
              ))}
            </ScrollView>

            <Controller
              control={control}
              name="startDate"
              render={({ field: { value } }) => (
                <>
                  <TextInput
                    label="Start Date & Time"
                    mode="outlined"
                    value={value.toLocaleString()}
                    editable={false}
                    right={
                      <TextInput.Icon icon="calendar" onPress={() => setShowStartPicker(true)} />
                    }
                    style={styles.input}
                  />

                  {showStartPicker && (
                    <DateTimePicker
                      value={value}
                      mode="datetime"
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      onChange={(event, selectedDate) => {
                        if (Platform.OS === 'android') setShowStartPicker(false); // Close Android modal
                        if (selectedDate) setValue('startDate', selectedDate); // Update form value
                      }}
                    />
                  )}
                </>
              )}
            />

            {/* End Date Picker */}
            <Controller
              control={control}
              name="endDate"
              render={({ field: { value } }) => (
                <>
                  <TouchableOpacity onPress={() => setShowEndPicker(true)}>
                    <TextInput
                      label="End Date & Time"
                      mode="outlined"
                      value={value.toLocaleString()}
                      editable={false}
                      right={<TextInput.Icon icon="calendar" />}
                      style={styles.input}
                    />
                  </TouchableOpacity>
                  {showEndPicker && (
                    <DateTimePicker
                      value={value}
                      mode="datetime"
                      display={Platform.OS === 'ios' ? 'inline' : 'default'}
                      onChange={(event, selected) => {
                        setShowEndPicker(Platform.OS === 'ios');
                        if (selected) setValue('endDate', selected);
                      }}
                    />
                  )}
                </>
              )}
            />

            {/* Location */}
            <Controller
              control={control}
              name="location"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Location *"
                  mode="outlined"
                  placeholder="e.g. Kathmandu, Nepal"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.location}
                  style={styles.input}
                />
              )}
            />
            {errors.location && (
              <Text variant="bodySmall" style={styles.errorText}>
                {errors.location.message}
              </Text>
            )}

            {/* Address (Optional) */}
            <Controller
              control={control}
              name="address"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Detailed Address"
                  mode="outlined"
                  placeholder="Street, Building, etc."
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.input}
                />
              )}
            />

            {/* Submit Button */}
            <Button mode="contained" onPress={handleSubmit(onSubmit)} style={styles.submitButton}>
              Create Event
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
        Event created successfully!
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
  label: {
    marginTop: 16,
    marginBottom: 8,
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
    marginBottom: 8,
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
