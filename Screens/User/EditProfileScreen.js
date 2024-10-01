import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Footer from '../../components/ServiceComponents/Footer';
import COLOR from '../../Constants/Colors';
import images from '../../Constants/Images';
import { UserContext } from '../../backend/actions/UserContext';
import { db } from '../../backend/Firebase/Firebase';
import { doc, updateDoc } from 'firebase/firestore';

const EditProfileScreen = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);
  
  // Track the original user data
  const [originalUser, setOriginalUser] = useState(user);
  
  // Initialize state with user context data
  const [username, setUsername] = useState(user?.username || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [idCardNumber, setIdCardNumber] = useState(user?.idCardNumber || '');

  // Ref to check if user is editing
  const isEditing = useRef(false);

  // Save changes and update both Firestore and the user context
  const handleSave = async () => {
    if (!user?.id) {
      Alert.alert('Error', 'User ID is missing. Cannot update profile.');
      return;
    }

    const updatedUser = {
      username,
      phoneNumber,
      idCardNumber,
    };

    try {
      // Update the user document in Firestore
      const userDocRef = doc(db, 'users', user.id);
      await updateDoc(userDocRef, updatedUser);

      // Update user data in the context
      setUser(updatedUser);

      // Clear the text input fields after update
      setUsername('');
      setPhoneNumber('');
      setIdCardNumber('');

      // Optionally, show confirmation and navigate back
      Alert.alert('Success', 'Profile updated successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating user profile:', error);
      Alert.alert('Error', 'Failed to update profile.');
    }
  };

  useEffect(() => {
    // Set the original user data only once
    if (user && !isEditing.current) {
      setOriginalUser(user);
      setUsername(user.username);
      setPhoneNumber(user.phoneNumber);
      setIdCardNumber(user.idCardNumber || '');
    }
  }, [user]);

  // Update isEditing ref on any input change
  useEffect(() => {
    isEditing.current = username !== originalUser.username || phoneNumber !== originalUser.phoneNumber || idCardNumber !== originalUser.idCardNumber;
  }, [username, phoneNumber, idCardNumber]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLOR.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>

      <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Image source={images.edit} style={styles.headerImage} />
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Username */}
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color={COLOR.text} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        {/* Phone Number */}
        <View style={styles.inputContainer}>
          <Ionicons name="call-outline" size={20} color={COLOR.text} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
        </View>

        {/* ID Card Number */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="credit-card" size={20} color={COLOR.text} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="ID Card Number"
            value={idCardNumber}
            onChangeText={setIdCardNumber}
            keyboardType="numeric"
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  headerTitle: {
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1,
  },
  headerImage: {
    width: 250,
    height: 250,
    borderRadius: 100,
    marginBottom: 20,
  },
  contentContainer: {
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLOR.text,
  },
  saveButton: {
    backgroundColor: COLOR.primary,
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 30,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;
