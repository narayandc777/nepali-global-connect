import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, Chip, Switch, Snackbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'expo-router';
import { colors } from '../../../src/theme/colors';

const communitySchema = z.object({
  name: z.string().min(3, 'Community name must be at least 3 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  location: z.string().optional(),
  rules: z.string().optional(),
});

type CommunityFormData = z.infer<typeof communitySchema>;

export default function CreateCommunityScreen() {
  const router = useRouter();
  const [category, setCategory] = useState('General');
  const [isPrivate, setIsPrivate] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const categories = ['General', 'Technology', 'Sports', 'Lifestyle', 'Education', 'Business'];

  const { control, handleSubmit, formState: { errors } } = useForm<CommunityFormData>({
    resolver: zodResolver(communitySchema),
    defaultValues: {
      name: '',
      description: '',
      location: '',
      rules: '',
    },
  });

  const onSubmit = (data: CommunityFormData) => {
    console.log('Community data:', { ...data, category, isPrivate });
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
              Create Community
            </Text>

            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Community Name *"
                  mode="outlined"
                  placeholder="e.g. Tech Enthusiasts NYC"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.name}
                  style={styles.input}
                />
              )}
            />
            {errors.name && <Text variant="bodySmall" style={styles.errorText}>{errors.name.message}</Text>}

            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Description *"
                  mode="outlined"
                  placeholder="Describe your community..."
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  multiline
                  numberOfLines={4}
                  error={!!errors.description}
                  style={styles.input}
                />
              )}
            />
            {errors.description && <Text variant="bodySmall" style={styles.errorText}>{errors.description.message}</Text>}

            <Text variant="titleMedium" style={styles.label}>Category</Text>
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
              name="location"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Location"
                  mode="outlined"
                  placeholder="e.g. New York, NY"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.input}
                />
              )}
            />

            <View style={styles.switchContainer}>
              <View style={styles.switchInfo}>
                <Text variant="titleMedium">Private Community</Text>
                <Text variant="bodySmall" style={styles.switchDescription}>
                  Require approval for new members
                </Text>
              </View>
              <Switch value={isPrivate} onValueChange={setIsPrivate} />
            </View>

            <Controller
              control={control}
              name="rules"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Community Rules"
                  mode="outlined"
                  placeholder="List any rules or guidelines..."
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  multiline
                  numberOfLines={4}
                  style={styles.input}
                />
              )}
            />

            <Button mode="contained" onPress={handleSubmit(onSubmit)} style={styles.submitButton}>
              Create Community
            </Button>

            <View style={styles.bottomPadding} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Snackbar visible={snackbarVisible} onDismiss={() => setSnackbarVisible(false)} duration={2000}>
        Community created successfully!
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
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    marginVertical: 16,
  },
  switchInfo: {
    flex: 1,
    marginRight: 16,
  },
  switchDescription: {
    color: colors.textSecondary,
    marginTop: 4,
  },
  submitButton: {
    marginTop: 24,
    paddingVertical: 6,
  },
  bottomPadding: {
    height: 32,
  },
});
