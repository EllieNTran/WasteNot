import { Text, StyleSheet, TextProps } from 'react-native';
import { Colors } from '@/constants/theme';

interface TypographyProps extends TextProps {
  color?: string;
}

export function Title({ color = Colors.light.text, style, ...props }: TypographyProps) {
  return (
    <Text
      {...props}
      style={[{ fontFamily: 'DMSerifDisplay', fontSize: 32, color }, style]}
    />
  );
}

export function BodyText({ color = Colors.light.text, style, ...props }: TypographyProps) {
  return (
    <Text
      {...props}
      style={[
        { fontFamily: 'Nunito', fontSize: 16, color },
        style,
      ]}
    />
  );
}
