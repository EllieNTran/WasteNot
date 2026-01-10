import { StyleSheet, View, Pressable, ImageSourcePropType } from 'react-native';
import { Colors } from '@/src/constants/theme';
import { Icon } from './icon';
import { BodyText } from './typography';

interface CardProps {
  iconSource: ImageSourcePropType;
  text: string;
  caption?: string;
  onPress?: () => void;
}

export default function Card({ iconSource, text, caption, onPress }: CardProps) {
  const content = (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon source={iconSource} size={33} />
      </View>
      <View style={styles.textContainer}>
        <BodyText style={styles.text}>{text}</BodyText>
        {caption && <BodyText style={styles.caption}>{caption}</BodyText>}
      </View>
    </View>
  );

  if (onPress) {
    return <Pressable onPress={onPress}>{content}</Pressable>;
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 75,
    padding: 14,
    backgroundColor: Colors.dark.text,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: Colors.light.icon,
  },
  iconContainer: {
    marginLeft: -2,
    marginRight: 12,
    backgroundColor: Colors.light.background,
    padding: 10,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontWeight: '500',
  },
  caption: {
    fontSize: 15,
    fontWeight: '300',
    color: Colors.dark.grey,
  },
});