import { ThemedView } from '@/src/components/themedView';
import { BodyText } from '@/src/components/typography';
import { Colors } from '@/src/constants/theme';
import { Link } from 'expo-router';
import { StyleSheet, Pressable, View } from 'react-native';
import { Image } from 'expo-image';

export default function LaunchScreen() {
  return (
    <ThemedView style={styles.container}>
      <Image
        source={require('../assets/images/lightLogo.png')}
        style={styles.logo}
        contentFit="contain"
      />
      <BodyText color={Colors.dark.text} style={styles.message}>
        What’s in your fridge? Snap it, and WasteNot will whip up delicious recipes from what you already have!
      </BodyText>
      <View style={styles.buttonContainer}>
        <Link href="/login" asChild>
          <Pressable style={StyleSheet.flatten([styles.button, styles.loginButton])}>
            <BodyText style={styles.loginButtonText}>Login</BodyText>
          </Pressable>
        </Link>
        <Link href="/signup" asChild>
          <Pressable style={StyleSheet.flatten([styles.button, styles.signupButton])}>
            <BodyText style={styles.signupButtonText}>Sign Up</BodyText>
          </Pressable>
        </Link>
      </View>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
      gap: 22,
    },
    logo: {
      width: '90%',
      aspectRatio: 320 / 149,
      alignSelf: 'center',
    },
    message: {
      textAlign: 'center',
      fontSize: 12,
      paddingHorizontal: 20,
    },
    buttonContainer: {
      gap: 12,
    },
    button: {
      paddingVertical: 8,
      paddingHorizontal: 40,
      borderRadius: 24,
      alignItems: 'center',
      width: 207,
      height: 45,
    },
    loginButton: {
      backgroundColor: Colors.dark.accent,
    },
    signupButton: {
      backgroundColor: Colors.dark.icon,
    },
    loginButtonText: {
      color: Colors.dark.icon,
      fontSize: 20,
    },
    signupButtonText: {
      color: Colors.dark.background,
      fontSize: 20,
    },
  });
