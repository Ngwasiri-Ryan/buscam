import { db } from '../Firebase/Firebase'; // Firebase config
import { collection, query, where, getDocs } from 'firebase/firestore';

// Function to fetch user bookings by username
export const fetchUserBookings = async (username) => {
  try {
    const q = query(collection(db, 'bookings'), where('username', '==', username)); // Query for the username
    const querySnapshot = await getDocs(q);
    const bookings = [];

    querySnapshot.forEach((doc) => {
      const bookingData = doc.data();
      bookings.push({ ...bookingData, id: doc.id }); // Add document ID to each booking
    });

    return bookings;
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    return [];
  }
};
