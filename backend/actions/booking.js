// bookingService.js
import { db } from '../Firebase/Firebase';
import { collection, addDoc } from 'firebase/firestore';

// Function to add a booking to the Firestore collection
export const addBooking = async (bookingData) => {
  try {
    const docRef = await addDoc(collection(db, 'bookings'), bookingData);
    console.log('Booking added with ID:', docRef.id);
    return docRef.id; // Optionally return the document ID if needed
  } catch (error) {
    console.error('Error adding booking:', error);
  }
};
