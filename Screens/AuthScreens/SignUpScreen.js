import React, { useState } from "react";
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
  Alert,
} from "react-native";
import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons";
import COLOR from "../../Constants/Colors";
import images from "../../Constants/Images";
import { addUser } from "../../backend/actions/auth";
import MessageModal from "../../components/Modal/MessageModal";
import LoadingIndicator from "../../components/Actions/LoadingIndicator";

const SignUpScreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    message: "",
    image: null,
  });
  const [loading, setLoading] = useState(false); // Loading state

  const handleSignUp = async () => {
    setLoading(true);
    try {
      // Adding user data to Firestore
      await addUser(username, phoneNumber, password);
      // Show success modal
      setModalData({
        title: "Account Created",
        message: "Your account has been created successfully!",
        image: images.bus_history,
      });
      setModalVisible(true);
    } catch (error) {
      if (error.message == "Username already exists") {
        // Show error modal
        setModalData({
          title: "Sign Up Problem",
          message: "Username already exists. Please try again.",
          image: images.bus_history,
        });
        setModalVisible(true);
      } else {
        // Show error modal
        setModalData({
          title: "Sign Up Failed",
          message:
            "Something went wrong while creating your account. Please try again.",
          image: images.bus_history,
        });
        setModalVisible(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const closeModal = () => {
    setModalVisible(false);
    // Navigate to LoginScreen only on success
    if (modalData.title === "Account Created") {
      navigation.navigate("LoginScreen");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Image source={images.bus_history} style={styles.logo} />

        <Text style={styles.title}>Create Your Account</Text>
        <Text style={styles.subTitle}>Sign up to get started</Text>

        <View style={styles.inputContainer}>
          {/* Username */}
          <View style={styles.inputWrapper}>
            <FontAwesome name="user" size={24} color={COLOR.icon} />
            <TextInput
              style={styles.input}
              placeholder="Username"
              autoCapitalize="none"
              keyboardType="default"
              value={username}
              onChangeText={setUsername}
            />
          </View>

          {/* Phone Number */}
          <View style={styles.inputWrapper}>
            <MaterialIcons name="phone" size={24} color={COLOR.icon} />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              autoCapitalize="none"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>

          {/* Password */}
          <View style={styles.inputWrapper}>
            <MaterialIcons name="lock" size={24} color={COLOR.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
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

        {/* Sign Up Button */}
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <LoadingIndicator />
          ) : (
            <Text style={styles.signUpText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        {/* OR Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.divider} />
        </View>

        {/* Sign In Button */}
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Text style={styles.signInText}>
            Already have an account? Sign In
          </Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footerText}>
          Join us today to start enjoying our services.
        </Text>

        {/* Reusable Modal */}
        <MessageModal
          visible={modalVisible}
          onClose={closeModal}
          title={modalData.title}
          message={modalData.message}
          image={modalData.image}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.background,
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 40,
    top: 30,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLOR.secondary,
    textAlign: "center",
  },
  subTitle: {
    fontSize: 16,
    color: COLOR.secondaryText,
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
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
  signUpButton: {
    backgroundColor: COLOR.secondary,
    paddingVertical: 15,
    borderRadius: 30,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
  },
  signUpText: {
    color: COLOR.buttonText,
    fontSize: 16,
    fontWeight: "bold",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  divider: {
    height: 1,
    flex: 1,
    backgroundColor: COLOR.divider,
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: COLOR.secondaryText,
  },
  signInButton: {
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
  },
  signInText: {
    color: COLOR.secondary,
    fontSize: 16,
  },
  footerText: {
    fontSize: 14,
    color: COLOR.secondaryText,
    textAlign: "center",
    marginBottom: 40,
  },
});

export default SignUpScreen;
