import { useState } from 'react';
import { ThemedView } from '@/src/components/themedView';
import { Link, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { StyledButton } from '@/src/components/styledButton';
import { BodyText, Title } from '@/src/components/typography';
import { Image } from 'expo-image';
import { Colors } from '@/src/constants/theme';
import { TextField } from '../components/textField';
import { Checkbox } from 'expo-checkbox';
import GoogleIcon from '@/src/assets/icons/google.png';
import AppleIcon from '@/src/assets/icons/apple.png';

export default function LoginScreen() {
  const router = useRouter();
  const [isChecked, setChecked] = useState(false);

  const handleLogin = () => {
    // Mock login logic
    router.replace('/home');
  };

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
              Don't have an account?
            </BodyText>
            <BodyText color={Colors.light.secondaryGreen} style={styles.optionText}>
              Sign up
            </BodyText>
          </View>
        </Link>
        <TextField label='Email' />
        <TextField label='Password' isMasked />
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
        <StyledButton title="Login" onPress={handleLogin} backgroundColor="#556B61" />
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
            iconSource={GoogleIcon}
            hasBorder
          />
          <StyledButton
            title="Continue with Apple"
            backgroundColor={Colors.dark.text}
            textColor={Colors.light.text}
            iconSource={AppleIcon}
            hasBorder
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
