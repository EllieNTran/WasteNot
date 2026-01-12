import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { SplashScreen, Stack, usePathname, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@/src/components/toast';
import { AuthProvider, useAuth } from '@/src/contexts/authContext';

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const pathname = usePathname();
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(DefaultTheme);
  const segments = useSegments();
  const router = useRouter();
  const { session, loading } = useAuth();

  const [fontsLoaded, fontError] = useFonts({
    Nunito: require('@/src/assets/fonts/Nunito-VariableFont_wght.ttf'),
    DMSerifDisplay: require('@/src/assets/fonts/DMSerifDisplay-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    const isAuthFlow = ['/launch', '/login', '/signup'].includes(pathname);
    setTheme(isAuthFlow ? DarkTheme : colorScheme === 'dark' ? DarkTheme : DefaultTheme);
  }, [pathname, colorScheme]);

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === 'login' || segments[0] === 'signup' || segments[0] === 'launch';

    if (!session && !inAuthGroup) {
      router.replace('/login');
    } else if (session && inAuthGroup) {
      router.replace('/home');
    }
  }, [session, segments, loading, router]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <ThemeProvider value={theme}>
      <View style={{ flex: 1, overflow: 'hidden' }}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="launch" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
        <Toast
          config={toastConfig}
          position="bottom"
          bottomOffset={24}
        />
      </View>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
    </QueryClientProvider>
  );
}
