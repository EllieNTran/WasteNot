import { StyleSheet, View, Pressable } from 'react-native';
import { useState, useMemo } from 'react';
import Toast from 'react-native-toast-message';
import { Colors } from '@/src/constants/theme';
import { MainView } from '@/src/components/mainView';
import { BodyText, Title } from '@/src/components/typography';
import { Icon } from '@/src/components/icon';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import { BackArrow } from '@/src/assets/icons';
import IngredientCard from '@/src/components/ingredientCard';
import { addIngredient } from '@/src/lib/ingredients';
import { useAuth } from '@/src/contexts/authContext';
import { StyledButton } from '@/src/components/styledButton';

export default function RecognisedIngredientsScreen() {
  const params = useLocalSearchParams();
  const { user } = useAuth();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);

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

  const handleSaveToInventory = async () => {
    if (!ingredients || !Array.isArray(ingredients) || !user?.id || hasSaved) {
      return;
    }

    setIsSaving(true);

    try {
      let successCount = 0;
      let failCount = 0;

      for (const item of ingredients) {
        try {
          await addIngredient({
            user_id: user.id,
            name: cleanIngredientName(item.ingredient),
            amount: 'N/A',
            type: 'Other',
            expiry_date: null,
            status: 'available',
          });
          successCount++;
        } catch (error) {
          console.error(`Failed to add ingredient ${item.ingredient}:`, error);
          failCount++;
        }
      }

      setHasSaved(true);

      if (successCount > 0) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: `${successCount} ingredient${successCount > 1 ? 's' : ''} added to inventory!`,
        });
        
        setTimeout(() => {
          router.push('/ingredients');
        }, 1000);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to add ingredients. Please try again.',
        });
        setHasSaved(false);
      }
    } catch (error) {
      console.error('Error saving ingredients:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An unexpected error occurred.',
      });
      setHasSaved(false);
    } finally {
      setIsSaving(false);
    }
  };

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
        ) : (
          ingredients.map((item: any, index: number) => (
            <IngredientCard 
              key={index}
              id={item.id || `temp-${index}`}
              ingredient={cleanIngredientName(item.ingredient)} 
              quantity="N/A"
              expirationDate="No date"
              type="other"
            />
          ))
        )}
      </View>
      {ingredients && ingredients.length > 0 && (
        <View style={styles.buttonContainer}>
          <StyledButton
            title={hasSaved ? "Saved!" : isSaving ? "Saving..." : "Save to Inventory"}
            onPress={handleSaveToInventory}
            disabled={isSaving || hasSaved}
            buttonStyle={styles.saveButton}
            textStyle={styles.saveButtonText}
          />
        </View>
      )}
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
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
  saveButton: {
    marginTop: 0,
  },
  saveButtonText: {
    fontSize: 18,
  },
});
