// backend/actions/logout.js
import { deleteDoc, doc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../Firebase/Firebase'; // Adjust the import path as necessary

export const handleLogout = async (username, navigation) => {
    try {
        const q = query(collection(db, 'users'), where('username', '==', username));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // Get the document ID from the first matched document
            const docId = querySnapshot.docs[0].id;
            const userDocRef = doc(db, 'users', docId);
            await deleteDoc(userDocRef); // Delete the user's document from Firestore
            console.log('User document deleted successfully');

            // Navigate back to IntroScreen after successful deletion
            navigation.replace('IntroScreen');
            return { success: true, message: 'You have successfully logged out.' };
        } else {
            throw new Error('User document does not exist.');
        }
    } catch (error) {
        throw new Error(`Failed to delete user: ${error.message}`);
    }
};

