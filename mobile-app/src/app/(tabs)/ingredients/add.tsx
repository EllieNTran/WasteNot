import { StyleSheet, View, Pressable, Platform, Modal, Alert } from 'react-native';
import { useState } from 'react';
import { Colors } from '@/src/constants/theme';
import { MainView } from '@/src/components/mainView';
import { BodyText, Title } from '@/src/components/typography';
import { Icon } from '@/src/components/icon';
import { Link, useRouter } from 'expo-router';
import { BackArrow, GreyCalendar } from '@/src/assets/icons'; 
import { TextField } from '@/src/components/textField';
import { StyledButton } from '@/src/components/styledButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import { OptionButton } from '@/src/components/optionButton';
import { addIngredient } from '@/src/lib/ingredients';
import { getCurrentUser } from '@/src/lib/auth';
import { IngredientType } from '@/src/types/database.types';

export default function AddIngredientScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());
  const [selectedType, setSelectedType] = useState<IngredientType | null>(null);
  const [loading, setLoading] = useState(false);

  const onDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
      if (event.type === 'set' && selectedDate) {
        setExpiryDate(selectedDate);

      }
    } else {
      if (selectedDate) {
        setTempDate(selectedDate);
      }
    }
  };

  const confirmDateIOS = () => {
    setExpiryDate(tempDate);
    setShowDatePicker(false);
  };

  const cancelDateIOS = () => {
    setTempDate(expiryDate);
    setShowDatePicker(false);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatDateForDB = (date: Date) => {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD format
  };

  const handleSave = async () => {
    // Validation
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter ingredient name');
      return;
    }

    if (!selectedType) {
      Alert.alert('Error', 'Please select ingredient type');
      return;
    }

    setLoading(true);

    try {
      // Get current user
      const { user, error: userError } = await getCurrentUser();
      
      if (userError || !user) {
        Alert.alert('Error', 'You must be logged in to add ingredients');
        setLoading(false);
        return;
      }

      // Add ingredient to database
      const { data, error } = await addIngredient({
        user_id: user.id,
        name: name.trim(),
        amount: amount.trim() || null,
        type: selectedType,
        expiry_date: formatDateForDB(expiryDate),
        status: 'available',
      });

      if (error) {
        console.error('Error adding ingredient:', error);
        Alert.alert('Error', 'Failed to add ingredient. Please try again.');
      } else {
        console.log('Ingredient added successfully:', data);
        Alert.alert('Success', 'Ingredient added successfully!', [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

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
            <Title color={Colors.dark.text}>Add Ingredient</Title>
          </View>
        </View>
      </View>

      <View style={styles.typeContainer}>
        <BodyText style={styles.inputLabel}>Type</BodyText>
        <View style={styles.row}>
          {(['Vegetables', 'Meat', 'Dairy', 'Fruits', 'Other'] as const).map(type => (
            <OptionButton
              key={type}
              label={type}
              selected={selectedType === type}
              onPress={() => setSelectedType(type)}
            />
          ))}
        </View>
      </View>

      <View style={styles.inputContainer}>
        <TextField
          label="Name"
          placeholder="e.g., Tomatoes"
          labelStyle={styles.inputLabel}
          value={name}
          onChangeText={setName}
        />
        <TextField
          label="Amount"
          placeholder="e.g., 500g"
          labelStyle={styles.inputLabel}
          value={amount}
          onChangeText={setAmount}
        />
        
        <View style={styles.dateFieldContainer}>
          <BodyText color={Colors.light.text} style={styles.dateLabel}>
            Expiry Date
          </BodyText>
          <Pressable 
            style={styles.dateInput}
            onPress={() => setShowDatePicker(true)}
          >
            <View style={styles.dateContent}>
              <Icon source={GreyCalendar} size={18} style={styles.calendarIcon} />
              <BodyText color={Colors.light.text} style={styles.dateText}>
                {formatDate(expiryDate)}
              </BodyText>
            </View>
          </Pressable>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <StyledButton 
          title={loading ? "Saving..." : "Save"}
          onPress={handleSave}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          disabled={loading}
        />
        <StyledButton
          title="Cancel"
          backgroundColor={Colors.dark.text}
          textColor={Colors.light.text}
          onPress={handleCancel}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          hasBorder
          disabled={loading}
        />
      </View>

      {Platform.OS === 'ios' && showDatePicker && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={showDatePicker}
          onRequestClose={cancelDateIOS}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.datePickerModal}>
              <View style={styles.modalHeader}>
                <Pressable onPress={cancelDateIOS}>
                  <BodyText color={Colors.dark.background} style={styles.modalButton}>
                    Cancel
                  </BodyText>
                </Pressable>
                <BodyText style={styles.modalTitle}>Select Date</BodyText>
                <Pressable onPress={confirmDateIOS}>
                  <BodyText color={Colors.dark.background} style={styles.modalButton}>
                    Done
                  </BodyText>
                </Pressable>
              </View>
              <DateTimePicker
                value={tempDate}
                mode="date"
                display="compact"
                onChange={onDateChange}
                minimumDate={new Date()}
                textColor={Colors.light.text}
              />
            </View>
          </View>
        </Modal>
      )}

      {Platform.OS === 'android' && showDatePicker && (
        <DateTimePicker
          value={expiryDate}
          mode="date"
          display="calendar"
          onChange={onDateChange}
          minimumDate={new Date()}
        />
      )}
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
  row: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    marginTop: 5,
  },
  inputContainer: {
    width: '100%',
  },
  inputLabel: {
    color: Colors.light.text,
    fontSize: 16,
  },
  dateFieldContainer: {
    width: '100%',
    marginBottom: 16,
  },
  dateLabel: {
    marginBottom: 5,
    fontSize: 16,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: Colors.light.text,
    borderRadius: 10,
    backgroundColor: Colors.dark.text,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dateContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarIcon: {
    marginRight: 8,
  },
  dateText: {
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
  },
  button: {
    flex: 1,
    marginTop: 0,
  },
  buttonText: {
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  datePickerModal: {
    backgroundColor: Colors.light.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.grey,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalButton: {
    fontSize: 16,
    fontWeight: '600',
  },
  typeContainer: {
    width: '100%',
    marginBottom: 16,
    marginTop: 10,
  }
});
