import { ThemedView } from '@/components/themedView';
import { Link, useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import { StyledButton } from '@/components/styledButton';
import { BodyText } from '@/components/typography';

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = () => {
    // Mock login logic
    router.replace('/home');
  };

  return (
    <ThemedView style={styles.container}>
      <BodyText>Login</BodyText>
      {/* Add login form here */}
      <StyledButton title="Login (mock)" onPress={handleLogin} backgroundColor="#556B61" />
      <Link href="/signup" style={styles.link}>
        <BodyText>Don't have an account? Sign up</BodyText>
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
