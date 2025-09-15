import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthSessionProvier } from '@/providers/authctx';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }


// HVIS MAN SKAL NAVIGERE til noe som ikke er i tabBar legges Stack.Screen her!

  return (
    <AuthSessionProvier> 
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{
          headerShown: false
          }}/>
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="post-details" />
        <Stack.Screen name="declarations" />
        <Stack.Screen name="post-details/[id]" />

      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
    </AuthSessionProvier>
  );
}

//Appen er inne i en session med Autentication fra providers-mappe
