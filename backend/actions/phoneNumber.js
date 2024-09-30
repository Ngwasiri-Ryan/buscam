
import { db } from '../Firebase/Firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const fetchPhoneNumber = async (username) => {
    try {
        const userQuery = query(collection(db, 'users'), where('username', '==', username));
        const snapshot = await getDocs(userQuery);

        if (!snapshot.empty) {
            let phoneNumber = '';
            snapshot.forEach(doc => {
                const userData = doc.data();
                phoneNumber = userData.phoneNumber; // Ensure this matches your Firestore field name
            });
            return phoneNumber; // Return the fetched phone number
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        console.error("Error fetching user data: ", error);
        throw new Error('There was an error fetching user data.');
    }
};
