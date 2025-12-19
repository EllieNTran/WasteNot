import { StyleSheet, View } from 'react-native';
import { Colors } from '@/src/constants/theme';
import { MainView } from '@/src/components/mainView';
import { BodyText, Title } from '@/src/components/typography';
import { Icon } from '@/src/components/icon';
import SettingsIcon from '@/src/assets/icons/settings.png';
import ClockIcon from '@/src/assets/icons/clock.png';

export default function HomeScreen() {
  return (
    <MainView style={styles.container}>
      <View style={styles.header}>
        <View>
          <View style={styles.greetingRow}>
            <Icon source={ClockIcon} size={15} />
            <BodyText color={Colors.dark.icon} style={styles.lightText}>Good Afternoon</BodyText>
          </View>
          <Title color={Colors.dark.text}>Jane Doe</Title>
        </View>
        <Icon source={SettingsIcon} size={24} style={styles.settingsIcon} />
      </View>
    </MainView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: -5,
  },
  lightText: {
    fontWeight: '300',
    fontSize: 15,
  },
  settingsIcon: {
    marginTop: -28,
  },
  logo: {
    height: 178,
    width: 290,
  }
});
