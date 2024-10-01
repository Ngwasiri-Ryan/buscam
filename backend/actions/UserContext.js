import React, { createContext, useState } from 'react';
import { db } from '../Firebase/Firebase'; // Firebase config
import { collection, query, where, getDocs } from 'firebase/firestore';


// Create UserContext
export const UserContext = createContext();

// UserProvider component to wrap your app and provide user data
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state to store current user data

  // Fetch user data from Firestore by username using a query
  const fetchUser = async (username) => {
    try {
      const q = query(collection(db, 'users'), where('username', '==', username)); // Query for the username
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0]; // Get the first matched document
        const userData = doc.data(); // Get the document's data
        const userId = doc.id; // Get the document ID

        // Store the user's ID and data in the context
        setUser({ ...userData, id: userId });
      } else {
        console.warn('No user data found');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Update user data in context
  const updateUser = (newUserData) => {
    setUser((prevState) => ({
      ...prevState,
      ...newUserData, // Merge new data with existing user data
    }));
  };

  // Clear user data (e.g., on logout)
  const clearUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser: updateUser, fetchUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};
