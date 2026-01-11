import { StyleSheet } from 'react-native';
import { Colors } from '@/src/constants/theme';
import { MainView } from '@/src/components/mainView';
import { Title } from '@/src/components/typography';

export default function PastRecipesScreen() {
  return (
    <MainView>
      <Title color={Colors.dark.text}>Past Recipes</Title>
    </MainView>
  );
}
