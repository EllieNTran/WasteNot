import { StyleSheet, View, Pressable, ActivityIndicator } from 'react-native';
import { Colors } from '@/src/constants/theme';
import { MainView } from '@/src/components/mainView';
import { BodyText, Title } from '@/src/components/typography';
import { Icon } from '@/src/components/icon';
import { Link, useLocalSearchParams } from 'expo-router';
import { Vegetable, BackArrow } from '@/src/assets/icons';
import IngredientCard from '@/src/components/ingredientCard';
import { useEffect, useState } from 'react';

export default function RecognisedIngredientsScreen() {
  const params = useLocalSearchParams();
  const { uploadData, isLoading: isLoadingParam, error: errorParam } = params;
  const [recognisedIngredients, setRecognisedIngredients] = useState<any[]>([]);
  const [loading, setLoading] = useState(isLoadingParam === 'true');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoadingParam === 'true') {
      setLoading(true);
      setError(null);
    } else if (isLoadingParam === 'false') {
      setLoading(false);
    }
  }, [isLoadingParam]);

  useEffect(() => {
    if (errorParam) {
      setError(errorParam as string);
      setLoading(false);
    }
  }, [errorParam]);

  useEffect(() => {
    if (uploadData) {
      try {
        const data = JSON.parse(uploadData as string);
        console.log('Received upload data:', data);
        setRecognisedIngredients(data.ingredients || []);
        setLoading(false);
      } catch (err) {
        console.error('Error parsing upload data:', err);
        setError('Failed to load recognized ingredients');
        setLoading(false);
      }
    }
  }, [uploadData]);

  return (
    <MainView style={styles.container}>
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
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.light.background} />
            <BodyText color={Colors.light.text} style={styles.loadingText}>
              Detecting ingredients...
            </BodyText>
          </View>
        ) : error ? (
          <BodyText color={Colors.light.text}>{error}</BodyText>
        ) : recognisedIngredients.length === 0 ? (
          <BodyText color={Colors.light.text}>No ingredients detected. Try again!</BodyText>
        ) : (
          recognisedIngredients.map((ingredient, index) => (
            <IngredientCard 
              key={index}
              ingredient={ingredient.name || 'Unknown'} 
              iconSource={Vegetable} 
              quantity={ingredient.amount || 'N/A'} 
              expirationDate={ingredient.expiry_date || 'No date'} 
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
