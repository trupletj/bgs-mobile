import { useAuth } from '@/hooks/use-auth';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Colors } from '@/constants/theme';
import '@/global.css';

// import { Platform } from 'react-native';
// if (Platform.OS === 'web') {
//   require('../global.css');  // _layout.tsx нь app/ дотор тул "../"
// }
export const unstable_settings = {
  anchor: '(tabs)',
};

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: Colors.dark.background,
    card: Colors.dark.card,
    border: Colors.dark.border,
    primary: Colors.dark.primary,
    text: Colors.dark.text,
  },
};

export default function RootLayout() {
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.replace('/auth/login');
      }
    }
  }, [isAuthenticated, loading]);

  return (
    <GluestackUIProvider mode="dark">
      <ThemeProvider value={navigationTheme}>
        <Stack
          screenOptions={{
            contentStyle: { backgroundColor: Colors.dark.background },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="notifications" options={{ title: 'Notifications' }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          <Stack.Screen name="auth/login" options={{ headerShown: false }} />
          <Stack.Screen name="auth/verify" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="light" backgroundColor={Colors.dark.background} />
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
