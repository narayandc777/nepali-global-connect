import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, Chip, Switch, Snackbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'expo-router';
import { colors, theme } from '../../../src/theme/colors';
import UIScreen from '@/src/components/container/UIScreen';
import { MBTextInput } from '@/src/components/ui/MBTextInput';

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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CommunityFormData>({
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
    <UIScreen>
      <View style={styles.section}>
        <MBTextInput
          control={control}
          name="name"
          label="Community Name *"
          placeholder="e.g. Tech Enthusiasts NYC"
          error={errors.name?.message}
        />

        <MBTextInput
          control={control}
          name="description"
          label="Description *"
          placeholder="Describe your community..."
          error={errors.description?.message}
        />

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

        <MBTextInput
          control={control}
          name="location"
          label="Location"
          placeholder="e.g. New York, NY"
          error={errors.location?.message}
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

        <MBTextInput
          control={control}
          name="rules"
          label="Community Rules"
          placeholder="List any rules or guidelines..."
          error={errors.rules?.message}
        />

        <MBTextInput
          control={control}
          name="country"
          label="country"
          placeholder="List any rules or guidelines..."
          error={errors.rules?.message}
        />

        <MBTextInput
          control={control}
          name="rules"
          label="Community Rules"
          placeholder="List any rules or guidelines..."
          error={errors.rules?.message}
        />

        <MBTextInput
          control={control}
          name="country"
          label="country"
          placeholder="List any rules or guidelines..."
          error={errors.rules?.message}
        />

        <MBTextInput
          control={control}
          name="rules"
          label="Community Rules"
          placeholder="List any rules or guidelines..."
          error={errors.rules?.message}
        />

        <Button mode="contained" onPress={handleSubmit(onSubmit)} style={styles.submitButton}>
          Create Community
        </Button>

        <View style={styles.bottomPadding} />

        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={2000}
        >
          Community created successfully!
        </Snackbar>
      </View>
    </UIScreen>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 8,
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
    backgroundColor: theme.colors.surface,
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
