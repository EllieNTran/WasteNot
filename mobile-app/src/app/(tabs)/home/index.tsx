import { Pressable, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/src/constants/theme';
import { MainView } from '@/src/components/mainView';
import { BodyText, Subtitle, Title } from '@/src/components/typography';
import Card from '@/src/components/card';
import { Icon } from '@/src/components/icon';
import { Settings, Clock, Ingredients, Recipe } from '@/src/assets/icons';
import { getProfile } from '@/src/lib/profiles';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/src/contexts/authContext';
import { useExpiringSoon } from '@/src/hooks/useIngredients';
import { calculateDaysLeft, getIconForIngredientType } from '@/src/utils/ingredients';

const Statistic = ({
  value,
  label,
}: {
  value: string;
  label: string;
}) => (
  <View style={styles.statisticsContainer}>
    <BodyText color={Colors.dark.text} style={styles.statisticsText}>
      {value}
    </BodyText>
    <BodyText color={Colors.dark.text} style={styles.statisticsLabel}>
      {label}
    </BodyText>
  </View>
)

const ShortcutButton = ({
  title,
  iconSource,
  onPress,
}: {
  title: string;
  iconSource: any;
  onPress: () => void;
}) => (
  <Pressable onPress={onPress} style={styles.shortcutButton}>
    <Icon source={iconSource} size={80} />
    <BodyText color={Colors.light.text} style={styles.shortcutButtonText}>
      {title}
    </BodyText>
  </Pressable>
);

export default function HomeScreen() {
  const [fullName, setFullName] = useState<string>('User');
  const [loading, setLoading] = useState(true);
  const { data: expiringSoonIngredients = [] } = useExpiringSoon();
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;
      if (user) {
        const { data: profile, error } = await getProfile(user.id);

        if (profile && !error) {
          setFullName(profile.full_name || 'User');
        }
      }
      setLoading(false);
    }

    loadProfile();
  }, [user]);

  return (
    <MainView style={styles.container}>
      <View style={styles.header}>
        <View>
          <View style={styles.greetingRow}>
            <Icon source={Clock} size={15} />
            <BodyText color={Colors.dark.icon} style={styles.lightText}>Good Afternoon</BodyText>
          </View>
          <Title color={Colors.dark.text}>{loading ? 'Loading...' : fullName}</Title>
        </View>
        <Pressable onPress={() => router.push('/(tabs)/settings')}>
          <Icon source={Settings} size={24} style={styles.settingsIcon} />
        </Pressable>
      </View>

      <LinearGradient
        colors={[Colors.dark.background, Colors.light.secondaryGreen]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.impactContainer}
      >
        <Subtitle color={Colors.dark.text}>{"This Month's Impact"}</Subtitle>
        <View style={styles.allStatisticsContainer}>
          <Statistic value="1.2kg" label="Food Saved" />
          <Statistic value="5.8kg" label="CO₂ Reduced" />
          <Statistic value="£22.10" label="Money Saved" />
        </View>
      </LinearGradient>

      <View style={styles.shortcutButtonsContainer}>
        <ShortcutButton
          title="Scan Ingredients"
          iconSource={Ingredients}
          onPress={() => router.push('/ingredients/scan')}
        />
        <ShortcutButton
          title="Generate Recipe"
          iconSource={Recipe}
          onPress={() => router.push('/generateRecipe')}
        />
      </View>

      <View style={styles.expiringSoonContainer}>
        <Subtitle color={Colors.light.text} style={styles.sectionTitle}>Expiring Soon</Subtitle>
        <View>
          {expiringSoonIngredients.length !== 0 && (
            expiringSoonIngredients.map((ingredient) => {
              const daysLeft = calculateDaysLeft(ingredient.expiry_date || 'No date');
              return (
                <View key={ingredient.id} style={styles.ingredientCard}>
                  <Card
                    iconSource={getIconForIngredientType(ingredient.type)}
                    text={ingredient.name}
                    caption={`Expires in ${daysLeft} ${daysLeft === 1 ? 'day' : 'days'} left`}
                    onNavigatePress={() => router.navigate('/(tabs)/ingredients')}
                  />
                </View>
              );
            })
          )}
        </View>
      </View>
    </MainView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: -5,
  },
  lightText: {
    fontWeight: '300',
    fontSize: 15,
  },
  settingsIcon: {
    marginTop: -28,
  },
  impactContainer: {
    width: '100%',
    padding: 22,
    borderRadius: 10,
    marginTop: 20,
    borderColor: Colors.light.text,
    borderWidth: 1,
  },
  statisticsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  statisticsText: {
    fontSize: 28,
    fontWeight: '600',
  },
  statisticsLabel: {
    fontSize: 14,
  },
  allStatisticsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  shortcutButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  shortcutButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark.text,
    paddingVertical: 24,
    borderRadius: 10,
    width: '47%',
    borderColor: Colors.light.text,
    borderWidth: 1,
  },
  shortcutButtonText: {
    marginTop: 6,
    fontWeight: '300',
    textAlign: 'center',
  },
  sectionTitle: {
    marginTop: 18,
    marginBottom: 12,
  },
  expiringSoonContainer: {
    width: '100%',
  },
  ingredientCard: {
    marginBottom: 12,
  }
});
