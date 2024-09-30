import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Image } from 'react-native';
import images from '../../Constants/Images';

const MessageModal = ({ visible, onClose, title, message, studentName }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
         

          {/* Image */}
          <Image source={images.bus_history} style={styles.modalImage} />

          {/* Title */}
           <Text style={styles.modalTitle}>{title}</Text>
          {/* Modal Content */}
          <View style={styles.modalContent}>
            {/* Student Name */}
            <Text style={styles.modalTextBold}>{studentName}</Text>
            {/* Attendance Message */}
            <Text style={styles.modalText}>{message}</Text>
          </View>

          {/* OK Button */}
          <TouchableOpacity style={styles.modalButton} onPress={onClose}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1E90FF',
  },
  modalImage: {
    width: 80,
    height: 80,
    marginBottom: 15,
  },
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTextBold: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    top:-30,
  },
  modalButton: {
    backgroundColor: '#1E90FF',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginTop: 15,
    justifyContent:'center',
    alignItems:'center',
    width:100,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
   
  },
});

export default MessageModal;
