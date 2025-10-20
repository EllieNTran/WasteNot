import { Redirect } from 'expo-router';

export default function Index() {
  // This could be a check for a token in AsyncStorage, etc.
  const isSignedIn = false; 

  if (isSignedIn) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/launch" />;
}
