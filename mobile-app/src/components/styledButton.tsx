import { Pressable, StyleSheet, PressableProps, View, ImageSourcePropType, ViewStyle, TextStyle, StyleProp, PressableStateCallbackType } from 'react-native';
import { BodyText } from './typography';
import { Icon } from './icon';
import { Colors } from '@/src/constants/theme';

interface StyledButtonProps extends Omit<PressableProps, 'style'> {
  title: string;
  backgroundColor?: string;
  textColor?: string;
  iconSource?: ImageSourcePropType;
  iconSize?: number;
  hasBorder?: boolean;
  borderColor?: string;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  style?: StyleProp<ViewStyle>;
}

export function StyledButton({ 
  title, 
  backgroundColor = '#4CAF50', 
  textColor = '#fff',
  iconSource,
  iconSize = 20,
  hasBorder = false,
  borderColor = Colors.light.text,
  buttonStyle,
  textStyle,
  style,
  ...props 
}: StyledButtonProps) {
  return (
    <Pressable 
      {...props} 
      style={(state: PressableStateCallbackType) => [
        styles.button,
        { backgroundColor },
        hasBorder ? { borderWidth: 1, borderColor } : {},
        buttonStyle,
        typeof style === 'function' ? style(state) : style,
      ]}
    >
      <View style={styles.content}>
        {iconSource && <Icon source={iconSource} size={iconSize} style={styles.icon} />}
        <BodyText color={textColor} style={[styles.text, textStyle]}>
          {title}
        </BodyText>
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
