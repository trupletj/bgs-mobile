import { useAuth } from '@/hooks/use-auth';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

// import { Platform } from 'react-native';
// if (Platform.OS === 'web') {
//   require('../global.css');  // _layout.tsx нь app/ дотор тул "../"
// }
export const unstable_settings = {
  anchor: '(tabs)',
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
      <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="notifications" options={{ title: 'Notifications' }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name="auth/login" options={{ headerShown: false }} />
        <Stack.Screen name="auth/verify" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="dark" />
    </ThemeProvider>
    </GluestackUIProvider>
  
  );
}
