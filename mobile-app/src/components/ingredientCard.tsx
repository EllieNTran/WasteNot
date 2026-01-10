import { useEffect, useState } from 'react';
import { StyleSheet, View, Pressable, ImageSourcePropType } from 'react-native';
import { Colors } from '../constants/theme';
import { Icon } from './icon';
import { BodyText } from './typography';
import { BlackClock, GreenCalendar, Edit, Bin, Ingredients } from '@/src/assets/icons';
import { calculateDaysLeft, getIconForIngredientType } from '../utils/ingredients';

interface IngredientCardProps {
  ingredient: string;
  quantity: string;
  expirationDate: string;
  type: string;
}

export default function IngredientCard({ ingredient, quantity, expirationDate, type }: IngredientCardProps) {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  const [iconSource, setIconSource] = useState<ImageSourcePropType>(Ingredients);

  useEffect(() => {
    const days = calculateDaysLeft(expirationDate);
    setDaysLeft(days);
  }, [expirationDate]);

  useEffect(() => {
    setIconSource(getIconForIngredientType(type));
  }, [type]);

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.iconContainer}>
          <Icon source={iconSource} size={40} />
        </View>
        <View style={styles.textContainer}>
          <BodyText style={styles.text}>{ingredient}</BodyText>
          <BodyText style={styles.quantityText}>Quantity: {quantity}</BodyText>
        </View>
        <View style={styles.actionsContainer}>
          <Icon source={Edit} size={20} />
          <Icon source={Bin} size={20} />
        </View>
      </View>
      <View style={styles.expirationContainer}>
        <View style={styles.expirationInfo}>
          <Icon source={GreenCalendar} size={15} />
          <BodyText style={styles.expirationText}>Expires: {expirationDate}</BodyText>
        </View>
        <View style={styles.remainingDaysContainer}>
          <Icon source={BlackClock} size={13} />
          <BodyText style={styles.remainingDaysText}>
            {daysLeft !== null ? `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left` : ''}
          </BodyText>
        </View>
      </View>
      <Pressable style={styles.markAsUsedButton}>
        <BodyText style={styles.markAsUsedText}>Mark as Used</BodyText>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    height: 178,
    padding: 14,
    backgroundColor: Colors.dark.text,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: Colors.light.icon,
    gap: 10,
  },
  topSection: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    marginLeft: -2,
    marginRight: 12,
    backgroundColor: Colors.light.background,
    padding: 12,
    borderRadius: 8,
  },
  actionsContainer:{
    flexDirection: 'row',
    gap: 10,
    marginTop: -35,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontWeight: '500',
  },
  expirationText: {
    fontSize: 13,
    color: Colors.light.secondaryGreen,
  },
  expirationInfo: {
    flexDirection: 'row',
    gap: 7,
    alignItems: 'center',
    marginLeft: 5,
  },
  expirationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.light.lightBeige,
    padding: 6,
    borderRadius: 10,
    width: '100%',
  },
  quantityText: {
    fontSize: 15,
    fontWeight: '300',
    color: Colors.light.grey,
  },
  remainingDaysContainer: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    backgroundColor: Colors.dark.text,
    padding: 3,
    paddingHorizontal: 8,
    borderRadius: 15,
    borderWidth: 0.4,
    borderColor: Colors.light.text,
  },
  remainingDaysText: {
    fontSize: 12,
    color: Colors.light.text,
    fontWeight: '300',
  },
  markAsUsedText: {
    fontSize: 15,
  },
  markAsUsedButton: {
    width: '100%',
    borderColor: Colors.light.grey,
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 6,
    alignItems: 'center',
  }
});
