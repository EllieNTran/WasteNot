import { Pressable, Image, StyleSheet, PressableProps } from 'react-native';
import { BodyText } from './typography';
import { Colors } from '@/src/constants/theme';
import SearchIcon from '@/src/assets/icons/search.png';

interface SearchBarProps extends PressableProps {
  text: string;
  backgroundColor?: string;
  textColor?: string;
}

export function SearchBar({ text, backgroundColor = Colors.dark.text, textColor = Colors.light.grey, ...props }: SearchBarProps) {
  return (
    <Pressable {...props} style={[styles.searchBar, { backgroundColor }]}>
      <BodyText style={[styles.searchBarText, { color: textColor }]}>{text}</BodyText>
      <Image source={SearchIcon} style={styles.icon}/>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    marginTop: 15,
    paddingVertical: 10,
    paddingLeft: 12,
    borderRadius: 10,
    width: 332,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 12,
  },
  searchBarText: {
    fontSize: 13,
    fontWeight: '200',
  },
  icon: {
    width: 17,
    height: 17,
    resizeMode: 'contain',
  },
});
