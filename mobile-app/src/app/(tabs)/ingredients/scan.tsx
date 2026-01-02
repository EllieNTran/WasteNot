import { StyleSheet, View, Pressable, Text, Alert, Modal, Image } from 'react-native';
import { Colors } from '@/src/constants/theme';
import { MainView } from '@/src/components/mainView';
import { BodyText, Title, Subtitle } from '@/src/components/typography';
import { Link } from 'expo-router';
import { BackArrow, Camera, GreenCamera, Gallery, Keyboard } from '@/src/assets/icons';
import { Icon } from '@/src/components/icon';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import Card from '@/src/components/card';
import * as ImagePicker from 'expo-image-picker';
import { useUploadImage } from '../../../services/ingredientsConnectors';

export default function ScanIngredientsScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const uploadImageMutation = useUploadImage();
  const cameraRef = useRef<CameraView>(null);

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant permission to access your photo library');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        const uri = result.assets[0].uri;
        setPhoto(uri);
        setShowPreview(true);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const handleCapture = async () => {
    if (cameraRef.current) {
      const capturedPhoto = await cameraRef.current.takePictureAsync({ quality: 1 });
      setPhoto(capturedPhoto.uri);
      setShowPreview(true);
    }
  };

  const handleConfirmPhoto = async () => {
    if (!photo) return;

    const fileName = photo.split('/').pop() || 'photo.jpg';
    const extension = fileName.split('.').pop()?.toLowerCase();
    let fileType = 'image/jpeg';
    if (extension === 'png') fileType = 'image/png';
    if (extension === 'jpg' || extension === 'jpeg') fileType = 'image/jpeg';

    const file = {
      uri: photo,
      name: fileName,
      type: fileType,
    };

    console.log('Uploading file:', file);
    uploadImageMutation.mutate(file, {
      onSuccess: (data) => {
        console.log('Upload success:', data);
        Alert.alert('Success', 'Image uploaded successfully!');
      },
      onError: (error) => {
        console.error('Upload error:', error);
        Alert.alert('Error', error.message);
      },
    });
    setShowPreview(false);
    setPhoto(null);
  };

  const handleCancelPhoto = () => {
    setShowPreview(false);
    setPhoto(null);
  };

  if (!permission) {
    return <View />;
  }

  return (
    <MainView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Link href="/ingredients" asChild>
            <Pressable style={styles.backButton}>
              <Icon source={BackArrow} size={30} />
            </Pressable>
          </Link>
          <View style={styles.titleWrapper}>
            <Title color={Colors.dark.text}>Scan Ingredients</Title>
          </View>
        </View>
        <BodyText color={Colors.dark.text} style={styles.information}>
          Point your camera at your fridge or cupboard.{'\n'}
          Our model will automatically detect your ingredients.
        </BodyText>
      </View>

      {!permission.granted ? (
        <Pressable style={styles.permissionButton} onPress={requestPermission}>
          <Icon source={GreenCamera} size={120} />
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
            <CameraView style={styles.camera} facing="back" ref={cameraRef}>
              <View style={styles.cameraOverlay}>
                <Pressable style={styles.captureButton} onPress={handleCapture}>
                  <Icon source={Camera} size={40} />
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
        <Card 
          iconSource={Gallery} 
          text="Upload From Gallery" 
          caption="Select existing photos" 
          onPress={pickImage} 
        />
        <Card 
          iconSource={Keyboard} 
          text="Enter Manually" 
          caption="Type your ingredients" 
          onPress={() => {}} 
        />
      </View>

      <Modal
        visible={showPreview}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancelPhoto}
      >
        <View style={styles.modalContainer}>
          <View style={styles.previewCard}>
            <Title color={Colors.dark.text}>
              Use this photo?
            </Title>
            {photo && (
              <Image source={{ uri: photo }} style={styles.previewImage} resizeMode="cover" />
            )}
            <BodyText color={Colors.dark.text} style={styles.previewText}>
              Do you want to use this photo to scan ingredients?
            </BodyText>
            <View style={styles.buttonContainer}>
              <Pressable style={styles.cancelButton} onPress={handleCancelPhoto}>
                <BodyText color={Colors.dark.text}>
                  Cancel
                </BodyText>
              </Pressable>
              <Pressable style={styles.confirmButton} onPress={handleConfirmPhoto}>
                <BodyText color={Colors.light.text}>
                  Yes, Scan
                </BodyText>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  },
  header: {
    marginBottom: 20,
    width: '100%',
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
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  previewCard: {
    backgroundColor: Colors.dark.background,
    borderRadius: 10,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    gap: 14,
  },
  previewImage: {
    width: 288,
    height: 360,
    borderRadius: 10,
    borderColor: Colors.dark.text,
    borderWidth: 1,
  },
  previewText: {
    textAlign: 'center',
    fontSize: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 40,
    backgroundColor: Colors.light.secondaryGreen,
    alignItems: 'center',
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 40,
    backgroundColor: Colors.light.background,
    alignItems: 'center',
  },
  information: {
    marginTop: 8,
    fontWeight: '300',
    fontSize: 13,
    textAlign: 'center',
    paddingHorizontal: 20,
  }
});
