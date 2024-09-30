import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { loginUser } from '../../backend/actions/auth';
import MessageModal from '../../components/Modal/MessageModal'; 
import COLOR from '../../Constants/Colors';
import images from '../../Constants/Images';

const LoginScreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);  // Loader state
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('error');

  // Handle sign-in logic
  const handleSignIn = async () => {
    setLoading(true);
    try {
      const response = await loginUser(username, password);
          navigation.replace('HomeScreen',{ username });
    } catch (error) {
      setModalMessage(error.message);
      setModalType('error');
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    navigation.replace('SignUpScreen');
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
   
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
       <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Image source={images.bus_history} style={styles.logo} />
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subTitle}>Log in to your account</Text>

        
        {/* Input Fields */}
        <View style={styles.inputContainer}>
          {/* Username */}
          <View style={styles.inputWrapper}>
            <FontAwesome name="user" size={24} color={COLOR.icon} />
            <TextInput 
              style={styles.input}
              placeholder="Username"
              autoCapitalize="none"
              keyboardType="default"
              onChangeText={setUsername}
              value={username}
            />
          </View>

          {/* Password */}
          <View style={styles.inputWrapper}>
            <MaterialIcons name="lock" size={24} color={COLOR.icon} />
            <TextInput 
              style={styles.input}
              placeholder="Password"
              secureTextEntry={!passwordVisible}
              onChangeText={setPassword}
              value={password}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Ionicons 
                name={passwordVisible ? "eye-off" : "eye"} 
                size={24} 
                color={COLOR.icon} 
              />
            </TouchableOpacity>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotPassword} onPress={() => navigation.navigate("ResetPasswordScreen")}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Sign In Button */}
        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color={COLOR.buttonText} />
          ) : (
            <Text style={styles.signInText}>Sign In</Text>
          )}
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footerText} onPress={handleSignUp}>New here? Create an account to get started.</Text>
      </ScrollView>

      {/* Message Modal */}
      <MessageModal 
        visible={modalVisible} 
        message={modalMessage} 
        type={modalType}
        onClose={() => setModalVisible(false)} 
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.background,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 40,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLOR.secondary,
  },
  subTitle: {
    fontSize: 16,
    color: COLOR.secondaryText,
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
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
  forgotPassword: {
    alignItems: 'flex-end',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: COLOR.secondary,
  },
  signInButton: {
    backgroundColor: COLOR.secondary,
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  signInText: {
    color: COLOR.buttonText,
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: COLOR.secondary,
    textAlign: 'center',
    fontWeight: 'bold'
  },
});

export default LoginScreen;
