import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="signIn" options={{ headerShown: false }} />
      <Stack.Screen name="Map" options={{ headerShown: false }} />
    </Stack>
  );
}
