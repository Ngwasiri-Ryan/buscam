import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../Firebase/Firebase";

// Function to add a new user (used in signup)
export const addUser = async (username, password, phoneNumber) => {
  try {
    const usersRef = collection(db, "users");
    // Check if a user with the same username already exists
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // If the query is not empty, it means a user with this username exists
      throw new Error("Username already exists");
    }
    // If username does not exist, add a new user
    await addDoc(usersRef, {
      username,
      password,
      phoneNumber,
    });
    
    return { success: true, message: "User added successfully" };

  } catch (error) {
    throw new Error(error.message);
  }
};

export const loginUser = async (username, password) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(
      usersRef,
      where("username", "==", username),
      where("password", "==", password)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return { success: true, message: "Login successful!" };
    } else {
      throw new Error("Invalid username or password. Try again");
    }
  } catch (error) {
    throw new Error(error.message);
    
  }
};

export const resetPassword = async (username, newPassword) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userRef = doc(db, "users", userDoc.id);

      await updateDoc(userRef, { password: newPassword });

      return { success: true, message: "Password updated successfully" };
    } else {
      throw new Error("The username is invalid, try again.");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
