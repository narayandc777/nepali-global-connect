import { Stack } from 'expo-router';

export default function RoomsLayout() {
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
          title: 'Rooms',
          headerLargeTitle: true,
        }}
      />
      <Stack.Screen
        name="post"
        options={{
          title: 'Post Room',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Room Details',
        }}
      />
    </Stack>
  );
}
