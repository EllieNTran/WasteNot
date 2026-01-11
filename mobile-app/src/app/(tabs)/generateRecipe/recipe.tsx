import { StyleSheet, Image, View, Pressable, ScrollView } from 'react-native';
import { Colors } from '@/src/constants/theme';
import { MainView } from '@/src/components/mainView';
import { BodyText, Subtitle } from '@/src/components/typography';
import { AddMissing, BackArrow, Checked, GreyClock, Save } from '@/src/assets/icons';
import { Icon } from '@/src/components/icon';
import { Link } from 'expo-router';
import { StyledButton } from '@/src/components/styledButton';

export default function PastRecipesScreen() {
  const createdDate = new Date('2024-06-15T10:30:00Z');
  const ingredients = [
    '2 cups cooked rice',
    '1 cup cooked chicken, diced',
    '1/2 cup frozen peas and carrots',
    '2 eggs, beaten',
    '3 tablespoons soy sauce',
    '2 tablespoons vegetable oil',
    '2 cloves garlic, minced',
    '1/2 teaspoon ground ginger',
  ];
  const instructions = [
    'Heat 1 tablespoon of vegetable oil in a large skillet or wok over medium-high heat.',
    'Add the minced garlic and ground ginger, sauté for about 30 seconds until fragrant.',
    'Push the garlic and ginger to one side of the skillet. Pour the beaten eggs into the other side and scramble until fully cooked.',
    'Add the cooked rice, diced chicken, frozen peas and carrots to the skillet. Stir everything together.',
    'Pour in the soy sauce and sesame oil. Mix well to ensure all ingredients are evenly coated.',
    'Cook for an additional 5-7 minutes, stirring occasionally, until everything is heated through and slightly crispy on the bottom.',
    'Season with salt and pepper to taste. Serve hot and enjoy your chicken fried rice!',
  ];

  return (
    <MainView>
      <View style={styles.contentWrapper}>
        <View style={styles.buttonsContainer}>
        <Link href="/ingredients" asChild>
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
        <Subtitle color={Colors.light.text} style={styles.title}>Chicken Fried Rice</Subtitle>
        <View style={styles.cookingTimeContainer}>
          <Icon source={GreyClock} size={16} />
          <BodyText color={Colors.light.grey} style={styles.cookingTimeText}>20 mins</BodyText>
        </View>
      </View>

      <BodyText color={Colors.light.darkGrey} style={styles.createdText}>
        Created: {createdDate.toLocaleDateString()}
      </BodyText>
      <BodyText color={Colors.light.icon} style={styles.description}>
        A flavorful and easy-to-make meal with crispy air-fried (or skillet-fried) chicken tossed in spicy-sweet homemade bang bang sauce.
      </BodyText>

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
      {ingredients.map((item, index) => (
        <View style={styles.ingredientRow} key={index}>
          <BodyText color={Colors.light.icon} style={styles.item}>
            {item}
          </BodyText>
          <Icon source={Checked} size={22} />
        </View>
      ))}

      <View style={styles.instructionsContainer}>
        <Subtitle color={Colors.light.text} style={styles.subtitle}>Instructions</Subtitle>
        {instructions.map((step, index) => (
          <BodyText color={Colors.light.icon} style={styles.item} key={index}>
            {index + 1}. {step}
          </BodyText>
        ))}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 12,
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
  },
  cookingTimeText: {
    fontSize: 14,
  },
  instructionsContainer: {
    marginTop: 18,
  }
});
