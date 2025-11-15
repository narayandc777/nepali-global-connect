import { Stack } from 'expo-router';

export default function CommunitiesLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerShadowVisible: false,
        headerTintColor: '#007AFF',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Group',
          headerLargeTitle: true,
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          title: 'Create Group',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Group',
        }}
      />
    </Stack>
  );
}
