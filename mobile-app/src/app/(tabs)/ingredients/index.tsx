import { StyleSheet, View, Pressable, ActivityIndicator, ScrollView } from 'react-native';
import { useState } from 'react';
import { Colors } from '@/src/constants/theme';
import { MainView } from '@/src/components/mainView';
import { BodyText, Title } from '@/src/components/typography';
import { SearchBar } from '@/src/components/searchBar';
import { Icon } from '@/src/components/icon';
import { Link } from 'expo-router';
import { Add, Camera } from '@/src/assets/icons';
import IngredientCard from '@/src/components/ingredientCard';
import { useIngredients } from '@/src/hooks/useIngredients';
import { OptionButton } from '@/src/components/optionButton';
import { IngredientType } from '@/src/types/database.types';

export default function IngredientsScreen() {
  const { data: ingredients = [], isLoading: loading, error } = useIngredients();
  const [selectedFilter, setSelectedFilter] = useState<IngredientType | 'All'>('All');

  const filteredIngredients = selectedFilter === 'All'
    ? ingredients
    : ingredients.filter(ing => ing.type === selectedFilter);

  return (
    <MainView style={styles.container}>
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
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {(['All', 'Vegetables', 'Meat', 'Dairy', 'Fruits', 'Other'] as const).map(type => (
          <OptionButton
            key={type}
            label={type}
            selected={selectedFilter === type}
            onPress={() => setSelectedFilter(type)}
          />
        ))}
      </ScrollView>
      <View style={styles.ingredientsContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.light.text} />
        ) : error ? (
          <BodyText color={Colors.light.text}>{error.message}</BodyText>
        ) : filteredIngredients.length === 0 ? (
          <BodyText color={Colors.light.text}>
            {selectedFilter === 'All' ? 'No ingredients yet.' : `No ${selectedFilter.toLowerCase()} found.`}
          </BodyText>
        ) : (
          filteredIngredients.map((ingredient) => (
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
  container: {
    paddingBottom: 60,
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
  filterContainer: {
    marginTop: 16,
    width: '100%',
  },
  filterContent: {
    gap: 8,
    paddingHorizontal: 2,
  },
  ingredientsContainer: {
    marginTop: 18,
    width: '100%',
  },
  ingredientCard: {
    marginBottom: 12,
  }
});
