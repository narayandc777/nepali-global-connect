import { Stack } from 'expo-router';
import MBHeaderSearch from '../../../src/components/ui/MBHeaderSearch';
import { useDebounce } from '../../../src/utils/types/useDebounce';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { Platform, StyleSheet } from 'react-native';
import { colors } from '@/src/theme/colors';

export default function GroupsLayout() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery);

  useEffect(() => {
    if (debouncedQuery) {
      router.setParams({ q: debouncedQuery });
    }
  }, [debouncedQuery]);

  const CustomHeader = () => (
    <MBHeaderSearch
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      onProfilePress={() => console.log('Profile pressed')}
    />
  );

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#fff' },
        headerShadowVisible: false,
        headerTintColor: '#007AFF',
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          header: CustomHeader,
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          title: 'Create Group',
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Group', // normal header with back button
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: Platform.OS === 'ios' ? 56 + 20 : 56,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    paddingHorizontal: 16,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});
