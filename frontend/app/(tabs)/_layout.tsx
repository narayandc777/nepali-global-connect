import { router, Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../src/theme/colors';
import { TAB_CONFIG } from '../../src/config/tab-config';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { TabConfigItem } from '../../src/utils/types/tabs';
import MBHeaderSearch from '../../src/components/ui/MBHeaderSearch';
import { useDebounce } from '../../src/utils/types/useDebounce';

const TabLayout = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const debouncedQuery = useDebounce(searchQuery);

  console.log(debouncedQuery);
  const handleProfilePress = () => {
    console.log('Profile icon pressed!');
  };

  const CustomHeader = () => (
    <MBHeaderSearch
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      onProfilePress={handleProfilePress}
    />
  );

  useEffect(() => {
    if (debouncedQuery === '') {
      router.setParams({ q: '' });
      return;
    }
    router.setParams({ q: debouncedQuery });
  }, [debouncedQuery]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textGray,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 1,
          height: 100,
          borderTopColor: colors.border,
          paddingBottom: 32,
          paddingTop: 8,
        },
        headerShown: true,
      }}
    >
      {TAB_CONFIG.map((tab: TabConfigItem) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={tab.icon as any} size={size} color={color} />
            ),
            header: CustomHeader,
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabLayout;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.background,
    paddingTop: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchBar: {
    marginHorizontal: 16,
  },
});
