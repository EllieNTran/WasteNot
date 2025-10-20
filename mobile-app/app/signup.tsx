import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link, useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import { StyledButton } from '@/components/StyledButton';

export default function SignupScreen() {
    const router = useRouter();

    const handleSignup = () => {
      // Mock signup logic
      router.replace('/(tabs)');
    };

  return (
    <ThemedView style={styles.container} darkColor="#2D403E" lightColor="#2D403E">
      <ThemedText type="title" lightColor="#fff" darkColor="#fff">Sign Up</ThemedText>
      {/* Add signup form here */}
      <StyledButton title="Sign up (mock)" onPress={handleSignup} backgroundColor="#556B61" />
      <Link href="/login" style={styles.link}>
        <ThemedText type="link">Already have an account? Login</ThemedText>
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
