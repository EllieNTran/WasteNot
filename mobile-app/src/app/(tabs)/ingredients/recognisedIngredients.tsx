import { StyleSheet, View, Pressable } from 'react-native';
import { useState, useMemo, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { Colors } from '@/src/constants/theme';
import { MainView } from '@/src/components/mainView';
import { BodyText, Title } from '@/src/components/typography';
import { Icon } from '@/src/components/icon';
import { Link, useLocalSearchParams } from 'expo-router';
import { BackArrow } from '@/src/assets/icons';
import IngredientCard from '@/src/components/ingredientCard';
import { addIngredient, Ingredient } from '@/src/lib/ingredients';
import { useAuth } from '@/src/contexts/authContext';

export default function RecognisedIngredientsScreen() {
  const params = useLocalSearchParams();
  const { user } = useAuth();
  const [savedIngredients, setSavedIngredients] = useState<Ingredient[]>([]);

  const ingredients = useMemo(() => {
    if (params.ingredientsData && typeof params.ingredientsData === 'string') {
      try {
        return JSON.parse(params.ingredientsData);
      } catch (e) {
        console.error('Failed to parse ingredients data:', e);
        return null;
      }
    }
    return null;
  }, [params.ingredientsData]);

  const cleanIngredientName = (name: string): string => {
    if (!name) return 'Unknown';
    const cleaned = name.replace(/_/g, ' ');
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  };

  useEffect(() => {
    const saveIngredients = async () => {
      if (!ingredients || ingredients.length === 0 || !user?.id) {
        return;
      }

      try {
        let successCount = 0;
        const saved: Ingredient[] = [];

        for (const ingredient of ingredients) {
          try {
            const { data, error } = await addIngredient({
              user_id: user.id,
              name: cleanIngredientName(ingredient.ingredient),
              amount: 'N/A',
              type: 'Other',
              expiry_date: null,
              status: 'available',
            });
            
            if (data && !error) {
              saved.push(data);
              successCount++;
            }
          } catch (error) {
            console.error(`Failed to add ingredient ${ingredient.ingredient}:`, error);
          }
        }

        if (successCount > 0) {
          setSavedIngredients(saved);
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: `${successCount} ingredient${successCount > 1 ? 's' : ''} added to inventory!`,
          });
          
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Failed to add ingredients.',
          });
        }
      } catch (error) {
        console.error('Error saving ingredients:', error);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'An unexpected error occurred.',
        });
      }
    };

    saveIngredients();
  }, [ingredients, user]);

  return (
    <MainView style={styles.container}>
      <View style={styles.titleContainer}>
        <Link href="/ingredients" asChild>
          <Pressable style={styles.backButton}>
            <Icon source={BackArrow} size={30} />
          </Pressable>
        </Link>
        <View style={styles.titleWrapper}>
          <Title color={Colors.dark.text} style={styles.title}>
            Recognised{'\n'}Ingredients
          </Title>
        </View>
      </View>
      <View style={styles.ingredientsContainer}>
        {!ingredients || ingredients.length === 0 ? (
          <View style={styles.noIngredientsContainer}>
            <BodyText color={Colors.light.text}>No ingredients detected.</BodyText>
          </View>
        ) : savedIngredients.length > 0 ? (
          savedIngredients.map((item) => (
            <IngredientCard 
              key={item.id}
              id={item.id}
              ingredient={item.name} 
              quantity={item.amount || 'N/A'}
              expirationDate={item.expiry_date || 'No date'}
              type={item.type?.toLowerCase() || 'other'}
            />
          ))
        ) : (
          ingredients.map((item: any, index: number) => (
            <IngredientCard 
              key={index}
              id={`temp-${index}`}
              ingredient={cleanIngredientName(item.ingredient)} 
              quantity="N/A"
              expirationDate="No date"
              type="other"
              readOnly
            />
          ))
        )}
      </View>
    </MainView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 70,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
  },
  titleWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    zIndex: 1,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    gap: 16,
  },
  loadingText: {
    fontSize: 15,
    fontWeight: '300',
  },
  ingredientsContainer: {
    marginTop: 18,
    width: '100%',
    gap: 12,
  },
  noIngredientsContainer: {
    alignItems: 'center',
    paddingTop: 80,
  },
  saveButton: {
    marginTop: 0,
  },
  saveButtonText: {
    fontSize: 18,
  },
});
