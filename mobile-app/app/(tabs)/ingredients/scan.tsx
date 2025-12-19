import { StyleSheet, Image, View, Pressable } from 'react-native';
import { Colors } from '@/constants/theme';
import { MainView } from '@/components/mainView';
import { BodyText, Title } from '@/components/typography';
import { SearchBar } from '@/components/searchBar';
import { Link } from 'expo-router';
import AddIcon from '@/assets/icons/add.png';

export default function IngredientsScreen() {
  return (
    <MainView style={styles.container}>
      <View style={styles.titleContainer}>
        <Link href="/login" asChild>
          <Pressable>
            <Image source={AddIcon} style={styles.addIcon}/>
          </Pressable>
        </Link> 
        <Title color={Colors.dark.text}>Scan Ingredients</Title>
      </View>
      <SearchBar text="Search ingredients..." />
    </MainView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.light.background,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    width: 27,
    height: 27,
    resizeMode: 'contain',
    marginTop: 4,
  },
  cameraIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
