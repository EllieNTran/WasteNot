import { StyleSheet, Image, View, Pressable } from 'react-native';
import { Colors } from '@/constants/theme';
import { MainView } from '@/components/mainView';
import { BodyText, Title } from '@/components/typography';
import { SearchBar } from '@/components/searchBar';
import { Link } from 'expo-router';
import AddIcon from '@/assets/icons/add.png';
import CameraIcon from '@/assets/icons/camera.png';

export default function IngredientsScreen() {
  return (
    <MainView style={styles.container}>
      <View style={styles.titleContainer}>
        <Link href="/ingredients/scan" asChild>
          <Pressable>
            <Image source={AddIcon} style={styles.addIcon}/>
          </Pressable>
        </Link> 
        <Title color={Colors.dark.text}>Ingredients</Title>
        <Image source={CameraIcon} style={styles.cameraIcon}/>
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
    justifyContent: 'space-between',
    width: '98%',
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
