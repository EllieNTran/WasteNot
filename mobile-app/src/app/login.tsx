import { useState } from 'react';
import { ThemedView } from '@/src/components/themedView';
import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { StyledButton } from '@/src/components/styledButton';
import { BodyText, Title } from '@/src/components/typography';
import { Image } from 'expo-image';
import { Colors } from '@/src/constants/theme';
import { TextField } from '../components/textField';
import { Checkbox } from 'expo-checkbox';
import { Google, Apple } from '@/src/assets/icons';
import { signIn } from '@/src/lib/auth';
import Toast from 'react-native-toast-message';
import { logger } from '@/src/utils/logger';

export default function LoginScreen() {
  const [isChecked, setChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    // Validation
    if (!email.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Email Required',
        text2: 'Please enter your email',
      });
      return;
    }

    if (!password.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Password Required',
        text2: 'Please enter your password',
      });
      return;
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Email',
        text2: 'Please enter a valid email address',
      });
      return;
    }

    logger.debug('Attempting login');
    setLoading(true);

    try {
      const { data, error } = await signIn(email.trim().toLowerCase(), password);

      if (error) {
        logger.error('Login error', error);
        
        // Handle specific error messages
        if (error.message.includes('Invalid login credentials')) {
          Toast.show({
            type: 'error',
            text1: 'Login Failed',
            text2: 'Invalid email or password',
          });
        } else if (error.message.includes('Email not confirmed')) {
          Toast.show({
            type: 'error',
            text1: 'Email Not Verified',
            text2: 'Please check your email and verify your account',
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Login Failed',
            text2: error.message || 'Unable to login',
          });
        }
      } else if (data.user) {
        logger.info('Login successful', { email: data.user.email });
        Toast.show({
          type: 'success',
          text1: 'Welcome back!',
          text2: `Logged in as ${data.user.email}`,
        });
      }
    } catch (err) {
      logger.error('Unexpected error', err);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An unexpected error occurred',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <ThemedView style={styles.container}>
      <Image
        source={require('../assets/images/lightLogo.png')}
        style={styles.logo}
        contentFit="contain"
      />
      <View style={styles.loginContainer}>
        <Title>Login</Title>
        <Link href="/signup" style={styles.link}>
          <View style={styles.signUpContainer}>
            <BodyText color={Colors.light.grey} style={styles.signUpText}>
              {"Don't have an account?"}
            </BodyText>
            <BodyText color={Colors.light.secondaryGreen} style={styles.optionText}>
              Sign up
            </BodyText>
          </View>
        </Link>
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
          placeholder="Password"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <View style={styles.optionsContainer}>
          <View style={styles.rememberMeContainer}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? Colors.light.secondaryGreen : Colors.light.grey}
            />
            <BodyText color={Colors.light.darkGrey} style={styles.rememberMeText}>
              Remember me
            </BodyText>
          </View>
          <BodyText color={Colors.light.secondaryGreen} style={styles.optionText}>
            Forgot Password?
          </BodyText>
        </View>
        <StyledButton 
          title={loading ? "Signing in..." : "Sign in"}
          onPress={handleLogin} 
          backgroundColor="#556B61"
          disabled={loading}
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
            title="Continue with Google"
            backgroundColor={Colors.dark.text}
            textColor={Colors.light.text}
            iconSource={Google}
            hasBorder
            disabled={loading}
          />
          <StyledButton
            title="Continue with Apple"
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
  signUpContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  logo: {
    width: '40%',
    aspectRatio: 320 / 149,
    alignSelf: 'center',
    marginTop: 12,
  },
  loginContainer: {
    width: '90%',
    backgroundColor: Colors.light.background,
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 24,
  },
  signUpText: {
    fontSize: 13,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 18,
  },
  rememberMeText: {
    fontSize: 13,
  },
  checkbox: {
    marginRight: 4,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 13,
    textAlign: 'right',
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
