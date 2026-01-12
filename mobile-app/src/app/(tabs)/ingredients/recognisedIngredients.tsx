import { StyleSheet, View, Pressable, ActivityIndicator } from 'react-native';
import { Colors } from '@/src/constants/theme';
import { MainView } from '@/src/components/mainView';
import { BodyText, Title } from '@/src/components/typography';
import { Icon } from '@/src/components/icon';
import { Link, useLocalSearchParams } from 'expo-router';
import { BackArrow } from '@/src/assets/icons';
import IngredientCard from '@/src/components/ingredientCard';
import { useEffect, useMemo, useState } from 'react';

export default function RecognisedIngredientsScreen() {
  const params = useLocalSearchParams();

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

  return (
    <MainView>
      <View style={styles.titleContainer}>
        <Link href="/ingredients/scan" asChild>
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
          <BodyText color={Colors.light.text}>No ingredients detected. Try again!</BodyText>
        ) : (
          ingredients.map((item: any, index: number) => (
            <IngredientCard 
              key={index}
              id={item.id || `temp-${index}`}
              ingredient={item.ingredient || 'Unknown'} 
              quantity="N/A"
              expirationDate="No date"
              type="other"
            />
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
  }
});
