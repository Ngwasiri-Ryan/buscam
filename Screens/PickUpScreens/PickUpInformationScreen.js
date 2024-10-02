import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from 'react-native';
import COLOR from '../../Constants/Colors';
import Button from '../../components/Buttons/Button';
import BackButton from '../../components/Buttons/BackButton';
import images from '../../Constants/Images';
import { UserContext } from '../../backend/actions/UserContext';

const { width, height } = Dimensions.get('window');

const PickUpInformationScreen = ({ navigation , route }) => {
  const { user } = useContext(UserContext);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [idCardNumber, setIdCardNumber] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const{
    destination,
    location,
    pickupTime,
  } = route.params;

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || ""); 
      setPhoneNumber(user.phoneNumber || ""); // Assuming user has a phoneNumber field
      setIdCardNumber(user.idCardNumber || ""); // Assuming user has an idCardNumber field
    }
  }, [user]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleNext = () => {
    if (fullName && phoneNumber && idCardNumber) {
      navigation.navigate('PickupSummaryScreen',{
        fullName,
        phoneNumber,
        idCardNumber,
        destination,
        location,
        pickupTime,
      }); 
    } else {
      Alert.alert('Incomplete', 'Please fill in all the fields.');
    }
  };

  return (
    <View
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 20}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {/* Wave Image */}
        <View style={styles.imageContainer}>
          <Image width={width} style={styles.wave} source={images.wave2} />
        </View>

        {/* Screen Content */}
        <View style={styles.contentWrapper}>
          <View>
            <Text style={styles.stepText}>Step 2 of 3</Text>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.heading}>Your Information</Text>

            {/* Input for Full Name */}
            <View>
              <Text>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                value={fullName}
                onChangeText={setFullName}
                cursorColor={COLOR.primary}
              />
            </View>

            {/* Input for Phone Number */}
            <Text>Phone Number</Text>
            <Text style={styles.text}>
                Note: Please enter a valid number(Whatsapp) so we can contact you for your
                ticket
              </Text>
            <View style={styles.phoneNumber}>
              <View style={styles.countryCode}>
                <Text style={styles.countryCodeText}>+237</Text>
              </View>
              <TextInput
                style={styles.phoneInput}
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                cursorColor={COLOR.primary}
              />
            </View>

            {/* Input for ID Card Number */}
            <View>
              <Text>ID Card Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your ID card number"
                value={idCardNumber}
                onChangeText={setIdCardNumber}
                cursorColor={COLOR.primary}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Hide the Button Container when the keyboard is visible */}
      {!isKeyboardVisible && (
        <View style={styles.buttonContainer}>
          <BackButton onPress={() => navigation.replace('ServiceScreen')} />
          <Button text="Next" onPress={handleNext} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.background,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    width: width,
    zIndex: 1,
  },
  contentWrapper: {
    flex: 1,
    padding: 20,
    zIndex: 2,
    marginTop: 60,
  },
  contentContainer: {
    justifyContent: 'flex-start',
  },
  stepText: {
    color: 'white',
    fontSize: 14,
  },
  wave: {
    height: height * 0.4,
    width: width,
    tintColor: COLOR.secondary,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
    alignSelf: 'flex-start',
  },
  phoneInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 10,
    marginBottom: 20,
    width:'80%',
    fontWeight: 'bold',
    fontSize:15,
    cursorColor: COLOR.primary,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize:15,
    cursorColor: COLOR.primary,
  },
  phoneNumber:{
    display:'flex',
    flexDirection:'row',
    gap:5,
  },
  countryCode:{
     padding:10,
     fontSize:13,
     borderWidth:2,
     height:50,
     borderRadius: 8,
     borderColor: '#ccc',
     backgroundColor:'#F0F0F5',
  },
  countryCodeText:{
     color:'#ccc'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLOR.background,
  },
  text: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default PickUpInformationScreen;
