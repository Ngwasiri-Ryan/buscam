import React, { createContext, useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

// Create a Context
export const UserContext = createContext();

// Create a Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: '',
    phoneNumber: '',
    idCardNumber: '',
  });

  const db = getFirestore();

  // Function to fetch user data from Firestore and update the context
  const fetchUserData = async (userId) => {
    const userDocRef = doc(db, 'users', userId); // Assuming `userId` is the document ID
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      setUser(docSnap.data());
    } else {
      console.log('No such document!');
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
};
