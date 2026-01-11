import { Pressable, StyleSheet, PressableProps, ViewStyle } from 'react-native';
import { BodyText } from './typography';
import { Colors } from '@/src/constants/theme';

interface OptionButtonProps extends PressableProps {
  label: string;
  subLabel?: string;
  selected: boolean;
  fullWidth?: boolean;
}

export const OptionButton = ({
  label,
  subLabel,
  selected,
  fullWidth = false,
  ...props
}: OptionButtonProps) => {
  const buttonStyle: ViewStyle[] = [
    styles.option,
    selected && styles.optionSelected,
    fullWidth && styles.optionFullWidth,
  ].filter(Boolean) as ViewStyle[];

  return (
    <Pressable
      {...props}
      style={buttonStyle}
    >
      <BodyText style={[styles.optionText, selected && styles.optionTextSelected]} numberOfLines={1}>
        {label}
      </BodyText>
      {subLabel && (
        <BodyText
          style={[styles.subText, selected && styles.optionTextSelected]}
          numberOfLines={1}
        >
          {subLabel}
        </BodyText>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  option: {
    borderWidth: 1,
    borderColor: Colors.light.text,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 8,
    alignItems: 'center',
    backgroundColor: Colors.dark.text,
    minWidth: 60,
  },
  optionFullWidth: {
    flex: 1,
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
});
