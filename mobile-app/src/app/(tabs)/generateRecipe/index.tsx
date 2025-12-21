import { StyleSheet, View, Pressable } from 'react-native';
import { useState } from 'react';
import { Colors } from '@/src/constants/theme';
import { MainView } from '@/src/components/mainView';
import { BodyText, Title } from '@/src/components/typography';

export default function GenerateRecipeScreen() {
  const [mealType, setMealType] = useState<'Breakfast' | 'Lunch' | 'Dinner'>('Breakfast');
  const [cookTime, setCookTime] = useState<'Quick' | 'Regular' | 'Long'>('Regular');

  return (
    <MainView style={styles.container}>
      <Title color={Colors.dark.text}>Generate Recipe</Title>

      <View style={styles.section}>
        <BodyText style={styles.sectionTitle}>Recipe Preferences</BodyText>

        {/* Selected Ingredients */}
        <View style={styles.card}>
          <BodyText style={styles.cardTitle}>Selected Ingredients</BodyText>
          <View style={styles.dropdown}>
            <BodyText>All Ingredients</BodyText>
          </View>
        </View>

        {/* Meal Type */}
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

        {/* Cooking Time */}
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

        {/* Generate Button */}
        <Pressable style={styles.generateButton}>
          <BodyText style={styles.generateText}>Generate Recipe</BodyText>
        </Pressable>
      </View>
    </MainView>
  );
}

/* ---------- Reusable Option Button ---------- */

function OptionButton({
  label,
  subLabel,
  selected,
  onPress,
}: {
  label: string;
  subLabel?: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.option,
        selected && styles.optionSelected,
      ]}
    >
      <BodyText style={selected && styles.optionTextSelected}>
        {label}
      </BodyText>
      {subLabel && (
        <BodyText
          size="xs"
          style={[styles.subText, selected && styles.optionTextSelected]}
        >
          {subLabel}
        </BodyText>
      )}
    </Pressable>
  );
}

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  section: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  card: {
    backgroundColor: Colors.dark.text,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    marginBottom: 12,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: Colors.light.text,
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignSelf: 'flex-start',
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
    paddingVertical: 10,
    alignItems: 'center',
  },
  optionSelected: {
    backgroundColor: Colors.dark.primary,
    borderColor: Colors.dark.primary,
  },
  optionTextSelected: {
    color: Colors.light.background,
  },
  subText: {
    opacity: 0.7,
  },
  generateButton: {
    backgroundColor: Colors.dark.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  generateText: {
    color: Colors.light.background,
  },
});
