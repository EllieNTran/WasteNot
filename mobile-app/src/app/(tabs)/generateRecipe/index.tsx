import { StyleSheet, View, Pressable, Modal, FlatList, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { Colors } from '@/src/constants/theme';
import { MainView } from '@/src/components/mainView';
import { BodyText, Subtitle, Title } from '@/src/components/typography';
import { StyledButton } from '@/src/components/styledButton';
import { Icon } from '@/src/components/icon';
import { WhiteWand, DownArrow } from '@/src/assets/icons';
import { OptionButton } from '@/src/components/optionButton';
import { useIngredients } from '@/src/hooks/useIngredients';
import { useGenerateRecipe } from '@/src/services/generateRecipe';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import { logger } from '@/src/utils/logger';

export default function GenerateRecipeScreen() {
  const router = useRouter();
  const { data: ingredients = [] } = useIngredients();
  const generateRecipeMutation = useGenerateRecipe();
  const [mealType, setMealType] = useState<'Breakfast' | 'Lunch' | 'Dinner'>('Breakfast');
  const [cookTime, setCookTime] = useState<'Quick' | 'Regular' | 'Long'>('Regular');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const availableIngredients = ingredients
    .filter(ing => ing.status === 'available')
    .map(ing => ing.name);

  const handleGenerateRecipe = async () => {
    const ingredientsToUse = selectedIngredients.length > 0 ? selectedIngredients : availableIngredients;
    
    if (ingredientsToUse.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'No Ingredients',
        text2: 'Please add some ingredients first',
      });
      return;
    }

    generateRecipeMutation.mutate(
      {
        ingredients: ingredientsToUse,
        dietaryPreferences: [],
        allergies: [],
        mealType: mealType,
        cookingTime: cookTime,
      },
      {
        onSuccess: (data) => {
          
          if (!data || !data.recipe) {
            Toast.show({
              type: 'error',
              text1: 'Recipe Generation Failed',
              text2: 'No recipe generated',
            });
            return;
          }
          
          router.push({
            pathname: '/generateRecipe/recipe',
            params: {
              recipeData: JSON.stringify(data.recipe),
            },
          });
        },
        onError: (error) => {
          logger.error('Error generating recipe', error);
          Toast.show({
            type: 'error',
            text1: 'Recipe Generation Failed',
            text2: error.message || 'Failed to generate recipe',
          });
        },
      }
    );
  };

  const isAllIngredientsSelected = !selectedIngredients || selectedIngredients.length === 0;

  const toggleIngredient = (ingredient: string) => {
    if (!selectedIngredients) {
      setSelectedIngredients([ingredient]);
      return;
    }
    
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient));
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const removeIngredient = (ingredient: string) => {
    if (!selectedIngredients) return;
    setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient));
  };

  return (
    <MainView>
      <Title color={Colors.dark.text}>Generate Recipe</Title>
      <BodyText color={Colors.dark.text} style={styles.information}>
        Point your camera at your fridge or cupboard.{'\n'}
        Our model will automatically detect your ingredients.
      </BodyText>

      {generateRecipeMutation.isPending ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.light.icon} style={styles.loadingIndicator} />
          <BodyText color={Colors.light.text} style={styles.loadingText}>
            Generating your recipe...
          </BodyText>
        </View>
      ) : (
        <View style={styles.section}>
        <Subtitle color={Colors.light.text} style={styles.sectionTitle}>Recipe Preferences</Subtitle>
        <View style={styles.card}>
          <BodyText style={styles.cardTitle}>Selected Ingredients</BodyText>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.pillsContainer}
            contentContainerStyle={styles.pillsContent}
          >
            {isAllIngredientsSelected ? (
              <View style={styles.pill}>
                <BodyText style={styles.pillText}>All Ingredients</BodyText>
              </View>
            ) : (
              (selectedIngredients || []).map((ingredient) => (
                <View key={ingredient} style={styles.pill}>
                  <BodyText style={styles.pillText}>{ingredient}</BodyText>
                  <Pressable onPress={() => removeIngredient(ingredient)} style={styles.removeButton}>
                    <BodyText style={styles.removeText}>✕</BodyText>
                  </Pressable>
                </View>
              ))
            )}
          </ScrollView>

          <Pressable 
            style={styles.dropdown}
            onPress={() => setDropdownVisible(true)}
          >
            <BodyText style={styles.dropdownText}>
              {isAllIngredientsSelected ? 'Select Ingredients' : 'Add More'}
            </BodyText>
            <Icon source={DownArrow} />
          </Pressable>
        </View>

        <View style={styles.card}>
          <BodyText style={styles.cardTitle}>Meal Type</BodyText>
          <View style={styles.row}>
            {['Breakfast', 'Lunch', 'Dinner'].map(type => (
              <OptionButton
                key={type}
                label={type}
                selected={mealType === type}
                onPress={() => setMealType(type as any)}
              />
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <BodyText style={styles.cardTitle}>Cooking Time</BodyText>
          <View style={styles.row}>
            <OptionButton
              label="Quick"
              subLabel="Under 30 mins"
              selected={cookTime === 'Quick'}
              onPress={() => setCookTime('Quick')}
            />
            <OptionButton
              label="Regular"
              subLabel="30–60 mins"
              selected={cookTime === 'Regular'}
              onPress={() => setCookTime('Regular')}
            />
            <OptionButton
              label="Long"
              subLabel="Over 1 hour"
              selected={cookTime === 'Long'}
              onPress={() => setCookTime('Long')}
            />
          </View>
        </View>

      <StyledButton
        backgroundColor={Colors.dark.background}
        title={"Generate Recipe"}
        buttonStyle={styles.generateButton}
        textStyle={styles.generateButtonText}
        iconSource={generateRecipeMutation.isPending ? undefined : WhiteWand}
        onPress={handleGenerateRecipe}
        disabled={generateRecipeMutation.isPending}
      />
      </View>
      )}

      <Modal
        visible={dropdownVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setDropdownVisible(false)}
        >
          <View style={styles.dropdownModal}>
            <View style={styles.modalHeader}>
              <BodyText style={styles.modalTitle}>Select Ingredients</BodyText>
              <Pressable onPress={() => setSelectedIngredients([])}>
                <BodyText style={styles.clearButton}>Clear All</BodyText>
              </Pressable>
            </View>
            <FlatList
              data={availableIngredients}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.dropdownItem,
                    selectedIngredients?.includes(item) && styles.dropdownItemSelected
                  ]}
                  onPress={() => toggleIngredient(item)}
                >
                  <BodyText style={[
                    styles.dropdownItemText,
                    selectedIngredients?.includes(item) && styles.dropdownItemTextSelected
                  ]}>
                    {item}
                  </BodyText>
                  {selectedIngredients?.includes(item) && (
                    <BodyText style={styles.checkmark}>✓</BodyText>
                  )}
                </TouchableOpacity>
              )}
            />
            <View style={styles.buttonContainer}>
              <StyledButton
                title="Done"
                backgroundColor={Colors.dark.background}
                onPress={() => setDropdownVisible(false)}
                buttonStyle={styles.doneButton}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </MainView>
  );
}

const styles = StyleSheet.create({
  information: {
    marginTop: 8,
    fontWeight: '300',
    fontSize: 13,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  section: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 56,
    alignItems: 'center',
  },
  sectionTitle: {
    marginTop: 4,
    marginBottom: 12,
  },
  card: {
    backgroundColor: Colors.dark.text,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.light.text,
    alignItems: 'center',
  },
  cardTitle: {
    marginBottom: 8,
    fontWeight: '500',
    fontSize: 15,
  },
  pillsContainer: {
    width: '100%',
    marginBottom: 12,
  },
  pillsContent: {
    gap: 8,
    paddingVertical: 4,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.secondaryGreen,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: Colors.light.text,
  },
  pillText: {
    fontSize: 13,
    color: Colors.dark.text,
  },
  removeButton: {
    marginLeft: 6,
  },
  removeText: {
    fontSize: 14,
    color: Colors.dark.text,
    fontWeight: 'bold',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.light.text,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 14,
    width: '100%',
  },
  dropdownText: {
    fontSize: 13,
  },
  dropdownArrow: {
    fontSize: 10,
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownModal: {
    backgroundColor: Colors.light.background,
    borderRadius: 10,
    width: '80%',
    maxHeight: '70%',
    borderWidth: 1,
    borderColor: Colors.light.text,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.grey,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  clearButton: {
    fontSize: 13,
    color: Colors.light.secondaryGreen,
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.grey,
  },
  dropdownItemSelected: {
    backgroundColor: Colors.light.secondaryGreen,
  },
  dropdownItemText: {
    fontSize: 14,
  },
  dropdownItemTextSelected: {
    color: Colors.dark.text,
    fontWeight: '600',
  },
  checkmark: {
    fontSize: 16,
    color: Colors.dark.text,
    fontWeight: 'bold',
  },
  doneButton: {
    margin: 12,
    marginTop: 8,
    width: '90%',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  option: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.light.text,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  optionSelected: {
    backgroundColor: Colors.light.secondaryGreen,
    borderColor: Colors.light.text,
  },
  optionText: {
    fontSize: 13,
  },
  optionTextSelected: {
    color: Colors.dark.text,
  },
  subText: {
    fontSize: 11,
    opacity: 0.7,
  },
  generateButton: {
    borderRadius: 14,
    paddingVertical: 16,
    marginTop: 8,
  },
  generateButtonText: {
    fontSize: 18,
  },
  loadingContainer: {
    flex: 1,
    marginTop: 220,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 30,
  },
  loadingIndicator: {
    transform: [{ scale: 3 }],
  },
});
