import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { SplashScreen, Stack, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const pathname = usePathname();
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(DefaultTheme);

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
      </View>
    </ThemeProvider>
  );
}
