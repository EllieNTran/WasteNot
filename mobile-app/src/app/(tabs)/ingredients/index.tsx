import { StyleSheet, Image, View, Pressable, ActivityIndicator } from 'react-native';
import { Colors } from '@/src/constants/theme';
import { MainView } from '@/src/components/mainView';
import { BodyText, Title } from '@/src/components/typography';
import { SearchBar } from '@/src/components/searchBar';
import { Icon } from '@/src/components/icon';
import { Link } from 'expo-router';
import { Add, Camera, Vegetable } from '@/src/assets/icons';
import IngredientCard from '@/src/components/ingredientCard';
import { useIngredients } from '@/src/hooks/useIngredients';

export default function IngredientsScreen() {
  const { data: ingredients = [], isLoading: loading, error } = useIngredients();

  return (
    <MainView>
      <View style={styles.titleContainer}>
        <Link href="/ingredients/ingredient" asChild>
          <Pressable>
            <Icon source={Add} style={styles.addIcon}/>
          </Pressable>
        </Link> 
        <Title color={Colors.dark.text}>Ingredients</Title>
        <Link href="/ingredients/scan" asChild>
          <Pressable>
            <Icon source={Camera} style={styles.cameraIcon}/>
          </Pressable>
        </Link>
      </View>
      <SearchBar text="Search ingredients..." />
      <View style={styles.ingredientsContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.light.text} />
        ) : error ? (
          <BodyText color={Colors.light.text}>{error.message}</BodyText>
        ) : ingredients.length === 0 ? (
          <BodyText color={Colors.light.text}>No ingredients yet. Add some!</BodyText>
        ) : (
          ingredients.map((ingredient) => (
            <View style={styles.ingredientCard} key={ingredient.id}>
              <IngredientCard 
                id={ingredient.id}
                ingredient={ingredient.name} 
                quantity={ingredient.amount || 'N/A'} 
                expirationDate={ingredient.expiry_date || 'No date'}
                type={ingredient.type}
              />
            </View>
          ))
        )}
      </View>
    </MainView>
  );
}

const styles = StyleSheet.create({
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
  },
  ingredientCard: {
    marginBottom: 12,
  }
});
