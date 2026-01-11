import { StyleSheet, Image, View, Pressable, ScrollView } from 'react-native';
import { Colors } from '@/src/constants/theme';
import { MainView } from '@/src/components/mainView';
import { BodyText, Subtitle } from '@/src/components/typography';
import { AddMissing, BackArrow, Checked, GreyClock, Save } from '@/src/assets/icons';
import { Icon } from '@/src/components/icon';
import { Link, useLocalSearchParams } from 'expo-router';
import { StyledButton } from '@/src/components/styledButton';
import { useIngredients } from '@/src/hooks/useIngredients';
import { useMemo } from 'react';

export default function RecipeScreen() {
  const params = useLocalSearchParams();
  const { data: userIngredients = [] } = useIngredients();
  
  const recipe = useMemo(() => {
    if (params.recipeData && typeof params.recipeData === 'string') {
      try {
        return JSON.parse(params.recipeData);
      } catch (e) {
        console.error('Failed to parse recipe data:', e);
        return null;
      }
    }
    return null;
  }, [params.recipeData]);

  const recipeName = recipe?.title || 'Recipe';
  const recipeDescription = recipe?.description || '';
  const cookingTime = recipe?.cooking_time || 'N/A';
  const ingredients = recipe?.ingredients || [];
  const instructions = recipe?.instructions || [];

  const createdDate = new Date();

  const userIngredientNames = useMemo(() => {
    return new Set(
      userIngredients
        .filter(ing => ing.status === 'available')
        .map(ing => ing.name.toLowerCase())
    );
  }, [userIngredients]);

  const hasIngredient = (ingredient: any): boolean => {
    const ingredientName = typeof ingredient === 'string' 
      ? ingredient.toLowerCase() 
      : ingredient.name?.toLowerCase() || '';
    
    return Array.from(userIngredientNames).some(userIng => 
      ingredientName.includes(userIng) || userIng.includes(ingredientName)
    );
  };

  return (
    <MainView>
      <View style={styles.contentWrapper}>
        <View style={styles.buttonsContainer}>
        <Link href="/generateRecipe" asChild>
          <Pressable>
            <Icon source={BackArrow} size={30} />
          </Pressable>
        </Link>
        <Pressable>
          <Icon source={Save} size={23} />
        </Pressable>
      </View>
      <Image
        source={require('@/src/assets/images/chicken-rice.jpg')}
        style={styles.image}
      />

      <View style={styles.header}>
        <Subtitle color={Colors.light.text} style={styles.title}>{recipeName}</Subtitle>
        <View style={styles.cookingTimeContainer}>
          <Icon source={GreyClock} size={16} />
          <BodyText color={Colors.light.grey} style={styles.cookingTimeText}>{cookingTime}</BodyText>
        </View>
      </View>

      <BodyText color={Colors.light.darkGrey} style={styles.createdText}>
        Created: {createdDate.toLocaleDateString()}
      </BodyText>
      {recipeDescription ? (
        <BodyText color={Colors.light.icon} style={styles.description}>
          {recipeDescription}
        </BodyText>
      ) : null}

      <View style={styles.sectionHeader}>
        <Subtitle color={Colors.light.text} style={styles.subtitle}>Ingredients</Subtitle>
        <StyledButton 
          title="Mark All as Used"
          backgroundColor={Colors.light.icon}
          textColor={Colors.dark.text}
          buttonStyle={styles.markAllButton}
          textStyle={styles.markAllText}
        />
      </View>
      {ingredients.map((item: any, index: number) => {
        const ingredientText = typeof item === 'string' ? item : `${item.amount} ${item.name}`;
        const hasIt = hasIngredient(item);
        return (
          <View style={styles.ingredientRow} key={index}>
            <BodyText color={Colors.light.icon} style={styles.item}>
              {ingredientText}
            </BodyText>
            <Icon source={hasIt ? Checked : AddMissing} size={22} />
          </View>
        );
      })}

      <View style={styles.instructionsContainer}>
        <Subtitle color={Colors.light.text} style={styles.subtitle}>Instructions</Subtitle>
        {instructions.map((step: string, index: number) => (
            <BodyText color={Colors.light.icon} style={styles.item} key={index}>
              {index + 1}. {step}
            </BodyText>
          )
        )}
      </View>
      </View>
    </MainView>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    width: '100%',
    alignItems: 'flex-start',
    marginTop: -18,
    marginBottom: 58,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    borderColor: Colors.light.text,
    borderWidth: 1,
  },
  title: {
    fontSize: 26,
    paddingRight: 90,
  },
  createdText: {
    fontSize: 11,
    marginTop: 2,
  },
  description: {
    fontSize: 14,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 22,
    marginBottom: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 14,
  },
  markAllButton: {
    marginTop: 0,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    width: 'auto',
  },
  markAllText: {
    fontSize: 13,
    fontWeight: '500',
  },
  item: {
    fontSize: 14,
    marginTop: 10,
  },
  ingredientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  header: {
    width: '100%',
    marginTop: 12,
    position: 'relative',
  },
  cookingTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: Colors.dark.text,
    borderRadius: 50,
    paddingVertical: 3,
    paddingHorizontal: 6,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  cookingTimeText: {
    fontSize: 14,
  },
  instructionsContainer: {
    marginTop: 18,
  }
});
