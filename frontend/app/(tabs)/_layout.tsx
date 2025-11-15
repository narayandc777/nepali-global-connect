import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../src/theme/colors';
import { TAB_CONFIG } from '../../src/config/tab-config';

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textGray,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 1,
          height: 90,
          borderTopColor: colors.border,
          paddingBottom: 32,
          paddingTop: 8,
        },
        headerShown: false,
      }}
    >
      {TAB_CONFIG.map((tab: any) => (
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
