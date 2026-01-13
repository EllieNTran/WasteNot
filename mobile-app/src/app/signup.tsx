import { useState } from 'react';
import { ThemedView } from '@/src/components/themedView';
import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { StyledButton } from '@/src/components/styledButton';
import { BodyText, Title } from '@/src/components/typography';
import { Image } from 'expo-image';
import { Colors } from '@/src/constants/theme';
import { TextField } from '../components/textField';
import { signUp } from '@/src/lib/auth';
import Toast from 'react-native-toast-message';
import { Google, Apple } from '@/src/assets/icons';
import { logger } from '@/src/utils/logger';

export default function SignupScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Missing Fields',
        text2: 'Please fill in all fields',
      });
      return;
    }

    if (password.length < 6) {
      Toast.show({
        type: 'error',
        text1: 'Weak Password',
        text2: 'Password must be at least 6 characters',
      });
      return;
    }

    setLoading(true);

    const { data: { session }, error } = await signUp(email.trim().toLowerCase(), password, fullName.trim());

    if (error) {
      logger.error('Signup error', error);
      Toast.show({
        type: 'error',
        text1: 'Signup Failed',
        text2: error.message || 'Could not create account',
      });
    } else if (!session) {
      // Email confirmation required
      Toast.show({
        type: 'info',
        text1: 'Verify Your Email',
        text2: 'Please check your inbox for verification link',
        visibilityTime: 5000,
      });
    } else {
      // Auto signed in
      Toast.show({
        type: 'success',
        text1: 'Welcome!',
        text2: 'Account created successfully',
      });
    }

    setLoading(false);
  }

  return (
    <ThemedView style={styles.container}>
      <Image
        source={require('../assets/images/lightLogo.png')}
        style={styles.logo}
        contentFit="contain"
      />
      <View style={styles.signupContainer}>
        <Title>Sign Up</Title>
        <Link href="/login" style={styles.link}>
          <View style={styles.loginContainer}>
            <BodyText color={Colors.light.grey} style={styles.loginText}>
              Already have an account?
            </BodyText>
            <BodyText color={Colors.light.secondaryGreen} style={styles.optionText}>
              Login
            </BodyText>
          </View>
        </Link>
        <TextField
          label='Full Name'
          value={fullName}
          onChangeText={setFullName}
          placeholder="Enter your full name"
          autoCapitalize="words"
        />
        <TextField
          label='Email'
          value={email}
          onChangeText={setEmail}
          placeholder="email@address.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextField
          label='Password'
          isMasked
          value={password}
          onChangeText={setPassword}
          placeholder="Password (min 6 characters)"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <StyledButton
          title={loading ? "Creating account..." : "Sign up"}
          onPress={handleSignup}
          backgroundColor="#556B61"
          disabled={loading}
          buttonStyle={styles.signupButton}
        />
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <BodyText color={Colors.light.grey} style={styles.dividerText}>
            Or
          </BodyText>
          <View style={styles.dividerLine} />
        </View>
        <View style={styles.buttonsContainer}>
          <StyledButton
            title="Sign up with Google"
            backgroundColor={Colors.dark.text}
            textColor={Colors.light.text}
            iconSource={Google}
            hasBorder
            disabled={loading}
          />
          <StyledButton
            title="Sign up with Apple"
            backgroundColor={Colors.dark.text}
            textColor={Colors.light.text}
            iconSource={Apple}
            hasBorder
            disabled={loading}
          />
        </View>
      </View>
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
    marginTop: 4,
    marginBottom: 14,
  },
  loginContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  logo: {
    width: '40%',
    aspectRatio: 320 / 149,
    alignSelf: 'center',
    marginTop: 12,
  },
  signupContainer: {
    width: '90%',
    backgroundColor: Colors.light.background,
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 24,
  },
  loginText: {
    fontSize: 13,
  },
  optionText: {
    fontSize: 13,
    textAlign: 'right',
  },
  signupButton: {
    marginTop: 6,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.dark.text,
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 13,
  },
  buttonsContainer: {
    width: '100%',
    marginTop: 10,
    gap: 2,
    marginBottom: 12,
  },
});
