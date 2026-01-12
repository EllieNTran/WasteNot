import { Text, TextProps } from 'react-native';
import { Colors } from '@/src/constants/theme';

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

export function Subtitle({ color = Colors.light.text, style, ...props }: TypographyProps) {
  return (
    <Text
      {...props}
      style={[{ fontFamily: 'DMSerifDisplay', fontSize: 22, color }, style]}
    />
  );
}

export function BodyText({ color = Colors.light.text, style, ...props }: TypographyProps) {
  return (
    <Text
      {...props}
      style={[
        { fontFamily: 'Nunito', fontSize: 18, color },
        style,
      ]}
    />
  );
}
