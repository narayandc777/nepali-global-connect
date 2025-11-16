import React, { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from '../src/contexts/AuthContext';

const queryClient = new QueryClient();

function RootLayoutNav() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const publicRoutes = ['login', 'register', 'forgot-password', 'reset-password'];

  useEffect(() => {
    if (loading) return;

    // If user NOT logged in
    if (!user) {
      if (!publicRoutes.includes(segments[0])) router.replace('/login');
      return;
    }

    // If user IS logged in
    if (publicRoutes.includes(segments[0])) router.replace('/(tabs)/home');
  }, [user, loading, segments, publicRoutes]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="splash" />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="reset-password" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <AuthProvider>
          <RootLayoutNav />
        </AuthProvider>
      </PaperProvider>
    </QueryClientProvider>
  );
}
