import React, { useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLOR from '../../Constants/Colors';
import Footer from '../../components/ServiceComponents/Footer';
import { handleLogout } from '../../backend/actions/logout';
import { UserContext } from "../../backend/actions/UserContext";

const ProfileScreen = () => {
    const navigation = useNavigation();
    const { user, fetchUser } = useContext(UserContext);

   
    const username = user?.username || ''; 
    const firstTwoLetters = username?.slice(0, 2).toUpperCase();
    const phoneNumber = user?.phoneNumber || ''; 

    useEffect(() => {
        if (username) {
            fetchUser(username); 
        }
    }, [username, fetchUser]);

    const onLogout = async () => {
        Alert.alert(
            'Logout Confirmation',
            'Are you sure you want to logout?',
            [
                {
                    text: 'No',
                    onPress: () => console.log('Logout Cancelled'),
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: async () => {
                        try {
                            const result = await handleLogout(username, navigation);
                            Alert.alert('Success', result.message);
                        } catch (error) {
                            Alert.alert('Error', error.message);
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={COLOR.black} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Profile Information */}
                <Text style={styles.title}>Profile</Text>
                <View style={styles.profileSection}>
                    <View style={styles.initialsContainer}>
                        <Text style={styles.initialsText}>{firstTwoLetters}</Text>
                    </View>
                    <Text style={styles.name}>{username}</Text>
                    <Text style={styles.phone}>+237 {phoneNumber}</Text>
                </View>

                {/* Action Items */}
                <View style={styles.optionsContainer}>
                    <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('EditProfileScreen', { phoneNumber, username })}>
                        <MaterialIcons name="edit" size={24} color={COLOR.primary} />
                        <Text style={styles.optionText}>Edit Profile</Text>
                        <Ionicons name="chevron-forward" size={24} color={COLOR.secondaryText} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ViewHistoryScreen', { phoneNumber, username })}>
                        <FontAwesome name="history" size={24} color="#228B22" />
                        <Text style={styles.optionText}>View History</Text>
                        <Ionicons name="chevron-forward" size={24} color={COLOR.secondaryText} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.option}  onPress={onLogout}>
                        <MaterialIcons name="logout" size={24} color={COLOR.error} />
                        <Text style={styles.optionText}>Logout</Text>
                        <Ionicons name="chevron-forward" size={24} color={COLOR.secondaryText} />
                    </TouchableOpacity>
                </View>
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
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    initialsContainer: {
        backgroundColor: COLOR.tetairy,
        width: 80,
        height: 80,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    initialsText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
    },
    scrollContainer: {
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        top: -20,
        color: COLOR.text,
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 30,
        top: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLOR.black,
        marginBottom: 5,
    },
    phone: {
        fontSize: 16,
        color: COLOR.secondaryText,
        marginBottom: 20,
    },
    optionsContainer: {
        marginTop: 10,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 2,
    },
    optionText: {
        fontSize: 18,
        color: COLOR.text,
        marginLeft: 15,
        flex: 1,
    },
});

export default ProfileScreen;
