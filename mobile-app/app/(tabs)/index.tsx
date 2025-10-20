import { StyleSheet, Image } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container} lightColor="#E2DED2" darkColor="#E2DED2">
      <Image 
        source={require('../../assets/images/dark-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <ThemedText type="title">Home</ThemedText>
      <ThemedText>Welcome to WasteNot!</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 178,
    width: 290,
  }
});
