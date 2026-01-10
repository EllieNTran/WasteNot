import { StyleSheet, Image, View } from 'react-native';
import { Colors } from '@/src/constants/theme';
import { MainView } from '@/src/components/mainView';
import { BodyText, Title } from '@/src/components/typography';

export default function ShoppingListScreen() {
  return (
    <MainView style={styles.container}>
      <Title color={Colors.dark.text}>Shopping List</Title>
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
