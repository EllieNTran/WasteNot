import { StyleSheet, Image, View } from 'react-native';
import { Colors } from '@/constants/theme';
import { MainView } from '@/components/mainView';
import { BodyText, Title } from '@/components/typography';

export default function PastRecipesScreen() {
  return (
    <MainView style={styles.container}>
      <Title color={Colors.dark.text}>Past Recipes</Title>
    </MainView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.light.background,
  },
  logo: {
    height: 178,
    width: 290,
  }
});
