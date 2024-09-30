import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import COLOR from '../../Constants/Colors';
import { resetPassword } from '../../backend/actions/auth';
import MessageModal from '../../components/Modal/MessageModal';

const ResetPasswordScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Loader state
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('error');

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      const response = await resetPassword(username, newPassword);
      if (response.success) {
        setModalMessage(response.message);
        setModalType('success');
        setModalVisible(true);
        
        // Redirect to LoginScreen after success
        setTimeout(() => {
          setModalVisible(false);
          navigation.navigate('LoginScreen');
        }, 4000);
      }
    } catch (error) {
      setModalMessage(error.message);
      setModalType('error');
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleGoBackToLogin = () => {
    navigation.navigate('LoginScreen');
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Title */}
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subTitle}>Enter your username and new password to reset</Text>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          {/* Username */}
          <View style={styles.inputWrapper}>
            <FontAwesome name="user" size={24} color={COLOR.icon} />
            <TextInput 
              style={styles.input}
              placeholder="Username"
              autoCapitalize="none"
              value={username}
              onChangeText={setUsername}
            />
          </View>

          {/* New Password */}
          <View style={styles.inputWrapper}>
            <MaterialIcons name="lock" size={24} color={COLOR.icon} />
            <TextInput 
              style={styles.input}
              placeholder="New Password"
              secureTextEntry={!passwordVisible}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Ionicons 
                name={passwordVisible ? "eye-off" : "eye"} 
                size={24} 
                color={COLOR.icon} 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Reset Password Button */}
        <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color={COLOR.buttonText} />
          ) : (
            <Text style={styles.resetText}>Reset Password</Text>
          )}
        </TouchableOpacity>

        {/* Go Back to Login */}
        <TouchableOpacity style={styles.backToLoginButton} onPress={handleGoBackToLogin}>
          <Text style={styles.backToLoginText}>Back to Login</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Message Modal */}
      <MessageModal 
        visible={modalVisible} 
        message={modalMessage} 
        type={modalType}
        onClose={() => setModalVisible(false)} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.background,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLOR.secondary,
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 16,
    color: COLOR.secondaryText,
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 40,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR.light,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.icon,
    marginBottom: 25,
    height: 50,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: COLOR.text,
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: COLOR.secondary,
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  resetText: {
    color: COLOR.buttonText,
    fontSize: 16,
    fontWeight: 'bold',
  },
  backToLoginButton: {
    borderWidth: 1,
    borderColor: COLOR.primary,
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  backToLoginText: {
    color: COLOR.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ResetPasswordScreen;
