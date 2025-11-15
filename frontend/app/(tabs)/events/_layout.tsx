import { Stack } from 'expo-router';

export default function NewsLayout() {
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
          title: 'News',
          headerLargeTitle: true,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'News Detail',
        }}
      />
    </Stack>
  );
}
