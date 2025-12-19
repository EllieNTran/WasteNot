import { StyleSheet, Image, View } from 'react-native';
import { Colors } from '@/constants/theme';
import { MainView } from '@/components/mainView';
import { BodyText, Title } from '@/components/typography';

export default function HomeScreen() {
  return (
    <MainView style={styles.container}>
      <BodyText color={Colors.dark.icon}>Good Afternoon</BodyText>
      <Title color={Colors.dark.text}>Jane Doe</Title>
    </MainView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  logo: {
    height: 178,
    width: 290,
  }
});
