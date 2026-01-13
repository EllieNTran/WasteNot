import { Pressable, StyleSheet, View, Image } from 'react-native';
import { Colors } from '@/src/constants/theme';
import { MainView } from '@/src/components/mainView';
import { Title } from '@/src/components/typography';
import { Link } from 'expo-router';
import { Icon } from '@/src/components/icon';
import { BackArrow, Logout } from '@/src/assets/icons';

export default function SettingsScreen() {
  return (
    <MainView>
      <View style={styles.titleContainer}>
        <Link href="/home" asChild>
          <Pressable>
            <Icon source={BackArrow} size={30} />
          </Pressable>
        </Link>
        <Title color={Colors.dark.text}>Settings</Title>
        <Icon source={Logout} size={25} />
      </View>
      <Image 
        source={require('@/src/assets/images/toothless.png')} 
        style={styles.avatar} 
      />
    </MainView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 20,
    alignSelf: 'center',
    borderColor: Colors.light.text,
    borderWidth: 1.5,
  },
})