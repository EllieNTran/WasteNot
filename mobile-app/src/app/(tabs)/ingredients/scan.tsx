import { StyleSheet, View, Pressable, Modal, Image, ActivityIndicator } from 'react-native';
import { Colors } from '@/src/constants/theme';
import { MainView } from '@/src/components/mainView';
import { BodyText, Title, Subtitle } from '@/src/components/typography';
import { Link, useRouter } from 'expo-router';
import { BackArrow, Camera, GreenCamera, Gallery, Keyboard } from '@/src/assets/icons';
import { Icon } from '@/src/components/icon';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import Card from '@/src/components/card';
import * as ImagePicker from 'expo-image-picker';
import { useDetectIngredients } from '../../../services/detectIngredients';
import Toast from 'react-native-toast-message';
import { logger } from '@/src/utils/logger';

export default function ScanIngredientsScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const detectIngredientsMutation = useDetectIngredients();
  const cameraRef = useRef<CameraView>(null);
  const router = useRouter();

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Toast.show({
          type: 'error',
          text1: 'Permission needed',
          text2: 'Please grant permission to access your photo library',
        });
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
      logger.error('Error picking image', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to pick image',
      });
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

    setShowPreview(false);
    setPhoto(null);

    detectIngredientsMutation.mutate(file, {
        onSuccess: (data) => {
          if (!data || !data.detectedIngredients) {
            Toast.show({
              type: 'error',
              text1: 'Ingredient Detection Failed',
              text2: 'No ingredients detected',
            });
            return;
          }
          
          router.push({
            pathname: '/ingredients/recognisedIngredients',
            params: {
              ingredientsData: JSON.stringify(data.detectedIngredients),
            },
          });
        },
        onError: (error) => {
          logger.error('Error detecting ingredients', error);
          Toast.show({
            type: 'error',
            text1: 'Ingredient Detection Failed',
            text2: error.message || 'Failed to generate recipe',
          });
        },
    });
  };

  const handleCancelPhoto = () => {
    setShowPreview(false);
    setPhoto(null);
  };

  if (!permission) {
    return <View />;
  }

  return (
    <MainView>
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

      {detectIngredientsMutation.isPending ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.light.icon} style={styles.loadingIndicator} />
          <BodyText color={Colors.light.text} style={styles.loadingText}>
            Detecting ingredients...
          </BodyText>
        </View>
      ) : (
        <>
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
        </>
      )}

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
                  Confirm
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
    borderWidth: 1,
    borderColor: Colors.light.text,
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
  },
  loadingContainer: {
    flex: 1,
    marginTop: 220,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 30,
  },
  loadingIndicator: {
    transform: [{ scale: 3 }],
  },
});
