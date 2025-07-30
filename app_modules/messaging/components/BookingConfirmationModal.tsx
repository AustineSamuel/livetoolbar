import BottomNavHeading from '@/utils/bottomNavHeading';
import BR from '@/utils/BR';
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';


type Props = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  propertyName: string;
  price: string;
};

const BookingConfirmationModal = ({ visible, onClose, onConfirm, propertyName, price }: Props) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.modalContainer}>

{<BottomNavHeading text="Confirm Booking" onClose={onClose}/>}
<BR height={20}/>
          <Text style={styles.message}>
            You are about to book <Text style={styles.bold}>{propertyName}</Text> that costs <Text style={styles.bold}>{price}</Text>.
          </Text>
          <Text style={styles.note}>
            Once booking is submitted, you can only cancel before your check-in time.
          </Text>

          <View style={styles.buttonGroup}>
       
            <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={onConfirm}>
              <Text style={styles.confirmText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    minHeight: height * 0.3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0D1317',
  },
  message: {
    fontSize: 15,
    textAlign: 'center',
    borderRadius:10,
    padding:15,
    backgroundColor:"#e9f0f1",
    color: '#0D1317',
    marginBottom: 10,
  },
  bold: {
    fontWeight: '600',
  },
  note: {
    fontSize: 13,
    color: '#555',
    marginBottom: 20,
    padding:5
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: '#f2f2f2',
  },
  confirmButton: {
    backgroundColor: '#1e88e5',
    width:"100%"
  },
  cancelText: {
    color: '#333',
  },
  confirmText: {
    color: 'white',
    fontWeight: '600',
    textAlign:"center"
  },
});

export default BookingConfirmationModal;
