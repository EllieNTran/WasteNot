import { StyleSheet, Image, View, Pressable } from 'react-native';
import { Colors } from '@/src/constants/theme';
import { MainView } from '@/src/components/mainView';
import { BodyText, Title } from '@/src/components/typography';
import { SearchBar } from '@/src/components/searchBar';
import { Icon } from '@/src/components/icon';
import { Link } from 'expo-router';
import AddIcon from '@/src/assets/icons/add.png';
import CameraIcon from '@/src/assets/icons/camera.png';
import VegetableIcon from '@/src/assets/icons/vegetable.png';
import IngredientCard from '@/src/components/ingredientCard';

export default function IngredientsScreen() {
  return (
    <MainView style={styles.container}>
      <View style={styles.titleContainer}>
        <Link href="/ingredients/scan" asChild>
          <Pressable>
            <Icon source={AddIcon} style={styles.addIcon}/>
          </Pressable>
        </Link> 
        <Title color={Colors.dark.text}>Ingredients</Title>
        <Link href="/ingredients/scan" asChild>
          <Pressable>
            <Icon source={CameraIcon} style={styles.cameraIcon}/>
          </Pressable>
        </Link>
      </View>
      <SearchBar text="Search ingredients..." />
      <View style={styles.ingredientsContainer}>
        <IngredientCard ingredient="Tomatoes" iconSource={VegetableIcon} quantity='8 pieces' expirationDate="2024-07-01" />
      </View>
    </MainView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.light.background,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '98%',
  },
  addIcon: {
    width: 27,
    height: 27,
    resizeMode: 'contain',
    marginTop: 4,
  },
  cameraIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  ingredientsContainer: {
    marginTop: 18,
    width: '100%',
  }
});
