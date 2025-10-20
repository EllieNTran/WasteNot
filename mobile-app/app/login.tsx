import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link, useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import { StyledButton } from '@/components/StyledButton';

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = () => {
    // Mock login logic
    router.replace('/(tabs)');
  };

  return (
    <ThemedView style={styles.container} darkColor="#2D403E" lightColor="#2D403E">
      <ThemedText type="title" lightColor="#fff" darkColor="#fff">Login</ThemedText>
      {/* Add login form here */}
      <StyledButton title="Login (mock)" onPress={handleLogin} backgroundColor="#556B61" />
      <Link href="/signup" style={styles.link}>
        <ThemedText type="link">Don't have an account? Sign up</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    link: {
      marginTop: 15,
      paddingVertical: 15,
    },
  });
