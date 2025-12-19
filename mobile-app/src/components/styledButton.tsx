import { Pressable, Text, StyleSheet, PressableProps } from 'react-native';
import { BodyText } from './typography';

interface StyledButtonProps extends PressableProps {
  title: string;
  backgroundColor?: string;
  textColor?: string;
}

export function StyledButton({ title, backgroundColor = '#4CAF50', textColor = '#fff', ...props }: StyledButtonProps) {
  return (
    <Pressable {...props} style={[styles.button, { backgroundColor }]}>
      <BodyText style={[styles.buttonText, { color: textColor }]}>{title}</BodyText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignItems: 'center',
    width: 207,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});