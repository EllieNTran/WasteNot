import { StyleSheet, Image, View, Pressable, ActivityIndicator } from 'react-native';
import { Colors } from '@/src/constants/theme';
import { MainView } from '@/src/components/mainView';
import { BodyText, Title } from '@/src/components/typography';
import { SearchBar } from '@/src/components/searchBar';
import { Icon } from '@/src/components/icon';
import { Link } from 'expo-router';
import { Add, Camera, Vegetable } from '@/src/assets/icons';
import IngredientCard from '@/src/components/ingredientCard';
import { useAuth } from '@/src/contexts/authContext';
import { getIngredients, Ingredient } from '@/src/lib/ingredients';
import { useEffect, useState } from 'react';

export default function IngredientsScreen() {
  const { userId } = useAuth();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchIngredients = async () => {
      setLoading(true);
      const { data, error } = await getIngredients(userId);
      
      if (error) {
        console.error('Error fetching ingredients:', error);
        setError(error.message);
      } else {
        setIngredients(data || []);
      }
      setLoading(false);
    };

    fetchIngredients();
  }, [userId]);

  console.log('Ingredients:', ingredients);

  return (
    <MainView style={styles.container}>
      <View style={styles.titleContainer}>
        <Link href="/ingredients/add" asChild>
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
          <BodyText color={Colors.light.text}>{error}</BodyText>
        ) : ingredients.length === 0 ? (
          <BodyText color={Colors.light.text}>No ingredients yet. Add some!</BodyText>
        ) : (
          ingredients.map((ingredient) => (
            <IngredientCard 
              key={ingredient.id}
              ingredient={ingredient.name} 
              quantity={ingredient.amount || 'N/A'} 
              expirationDate={ingredient.expiry_date || 'No date'}
              type={ingredient.type}
            />
          ))
        )}
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
