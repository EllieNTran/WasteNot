import { ThemedView } from '@/components/themedView';
import { Link, useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import { StyledButton } from '@/components/StyledButton';
import { BodyText } from '@/components/typography';

export default function SignupScreen() {
    const router = useRouter();

    const handleSignup = () => {
      // Mock signup logic
      router.replace('/(tabs)');
    };

  return (
    <ThemedView style={styles.container}>
      <BodyText>Sign Up</BodyText>
      {/* Add signup form here */}
      <StyledButton title="Sign Up (mock)" onPress={handleSignup} backgroundColor="#556B61" />
      <Link href="/signup" style={styles.link}>
        <BodyText>Already have an account? Login</BodyText>
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
