import { Image, ImageProps, ImageSourcePropType } from 'react-native';

interface IconProps {
  source: ImageSourcePropType;
  size?: number;
  style?: ImageProps['style'];
}

export function Icon({ source, size = 20, style }: IconProps) {
  return (
    <Image
      source={source}
      style={[
        {
          width: size,
          height: size,
          resizeMode: 'contain',
        },
        style,
      ]}
    />
  );
}
