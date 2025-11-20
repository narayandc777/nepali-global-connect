import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../src/theme/colors';
import { TAB_CONFIG } from '../../src/config/tab-config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TabConfigItem } from '../../src/utils/types/tabs';
import { StyleSheet } from 'react-native';

const TabLayout = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textGray,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: 60 + insets.bottom, // include bottom safe area
          paddingBottom: insets.bottom,
        },
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
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
