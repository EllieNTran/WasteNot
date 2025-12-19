import { StyleSheet, View, Pressable, Text } from 'react-native';
import { Colors } from '@/src/constants/theme';
import { MainView } from '@/src/components/mainView';
import { BodyText, Title, Subtitle } from '@/src/components/typography';
import { Link } from 'expo-router';
import BackIcon from '@/src/assets/icons/backArrow.png';
import CameraIcon from '@/src/assets/icons/camera.png';
import GreenCameraIcon from '@/src/assets/icons/greenCamera.png';
import GalleryIcon from '@/src/assets/icons/gallery.png';
import KeyboardIcon from '@/src/assets/icons/keyboard.png';
import { Icon } from '@/src/components/icon';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import Card from '@/src/components/card';

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<string | null>(null);

  if (!permission) {
    return <View />;
  }

  return (
    <MainView style={styles.container}>
      <View style={styles.titleContainer}>
        <Link href="/ingredients" asChild>
          <Pressable style={styles.backButton}>
            <Icon source={BackIcon} size={30} />
          </Pressable>
        </Link>
        <View style={styles.titleWrapper}>
          <Title color={Colors.dark.text}>Scan Ingredients</Title>
        </View>
      </View>

      {!permission.granted ? (
        <Pressable style={styles.permissionButton} onPress={requestPermission}>
          <Icon source={GreenCameraIcon} size={120} />
          <BodyText color={Colors.light.text} style={styles.instruction}>
            Take a Photo
          </BodyText>
          <BodyText color={Colors.light.grey} style={styles.detailText}>
            Point your camera at your fridge or cupboard
          </BodyText>
        </Pressable>
      ) : (
        <View style={styles.cameraOuterBorder}>
          <View style={styles.cameraContainer}>
            <CameraView style={styles.camera} facing="back">
              <View style={styles.cameraOverlay}>
                <Pressable style={styles.captureButton}>
                  <Icon source={CameraIcon} size={40} />
                </Pressable>
              </View>
            </CameraView>
          </View>
        </View>
      )}
      <View style={styles.optionsContainer}>
        <Subtitle color={Colors.light.text} style={styles.chooseFromText}>
          Or choose from:
        </Subtitle>
        <Card iconSource={GalleryIcon} text="Upload From Gallery" caption="Select existing photos" onPress={() => {}} />
        <Card iconSource={KeyboardIcon} text="Enter Manually" caption="Type your ingredients" onPress={() => {}} />
      </View>
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
    width: '100%',
    position: 'relative',
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    zIndex: 1,
  },
  titleWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  instruction: {
    marginTop: 8,
    marginBottom: 4,
    fontSize: 18,
    fontWeight: '500',
  },
  detailText: {
    fontSize: 12,
    fontWeight: '300',
  },
  permissionButton: {
    height: 350,
    width: '100%',
    backgroundColor: Colors.dark.text,
    borderColor: Colors.light.text,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  buttonText: {
    color: Colors.light.background,
    fontFamily: 'Nunito',
    fontSize: 16,
  },
  cameraOuterBorder: {
    width: '100%',
    borderRadius: 11,
    borderWidth: 1,
    borderColor: Colors.light.text,
  },
  cameraContainer: {
    width: '100%',
    height: 350,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: Colors.dark.text,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.dark.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Colors.dark.text,
  },
  chooseFromText: {
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  optionsContainer: {
    width: '100%',
    gap: 14,
  }
});
