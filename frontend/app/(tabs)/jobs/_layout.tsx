import { Stack } from 'expo-router';

export default function JobsLayout() {
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
          title: 'Jobs',
          headerLargeTitle: true,
        }}
      />
      <Stack.Screen
        name="post"
        options={{
          title: 'Post Job',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Job Details',
        }}
      />
    </Stack>
  );
}
