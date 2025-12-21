import { Pressable, StyleSheet, PressableProps, View, ImageSourcePropType } from 'react-native';
import { BodyText } from './typography';
import { Icon } from './icon';
import { Colors } from '@/src/constants/theme';

interface StyledButtonProps extends PressableProps {
  title: string;
  backgroundColor?: string;
  textColor?: string;
  iconSource?: ImageSourcePropType;
  iconSize?: number;
  hasBorder?: boolean;
  borderColor?: string;
}

export function StyledButton({ 
  title, 
  backgroundColor = '#4CAF50', 
  textColor = '#fff',
  iconSource,
  iconSize = 20,
  hasBorder = false,
  borderColor = Colors.light.text,
  ...props 
}: StyledButtonProps) {
  return (
    <Pressable 
      {...props} 
      style={[
        styles.button, 
        { backgroundColor },
        hasBorder && { borderWidth: 1, borderColor }
      ]}
    >
      <View style={styles.content}>
        {iconSource && <Icon source={iconSource} size={iconSize} style={styles.icon} />}
        <BodyText color={textColor} style={styles.text}>{title}</BodyText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 15,
  },
});
