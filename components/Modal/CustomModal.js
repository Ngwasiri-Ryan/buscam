// CustomModal.js
import React, { useState } from 'react';
import { Modal, View, StyleSheet, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import COLOR from '../../Constants/Colors';

const { width, height } = Dimensions.get('window');

const CustomModal = ({ visible, onClose, items, onSelect, placeholder }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelect = (value) => {
    setSelectedItem(value);
    onSelect(value);
    onClose();
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      animationType="slide"
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{placeholder}</Text>
          <ScrollView style={styles.scrollView}>
            {items.map((item) => (
              <TouchableOpacity
                key={item.value}
                style={[
                  styles.item,
                  selectedItem === item.value && styles.selectedItem
                ]}
                onPress={() => handleSelect(item.value)}
              >
                <Text style={[
                  styles.itemText,
                  selectedItem === item.value && styles.selectedItemText
                ]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    width: '95%',
    height: '50%',
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  item: {
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: COLOR.text,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  selectedItem: {
    backgroundColor: COLOR.primary,
    borderColor: 'transparent',
  },
  itemText: {
    fontSize: 16,
    color: 'black',
  },
  selectedItemText: {
    color: 'white',
  },
  closeButton: {
   display:'flex'
  },
  closeButtonText: {
    color: COLOR.black,
    fontWeight: 'bold',
    textAlign:'right',
  },
});

export default CustomModal;
