import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './navigation/Navigation';
import WhatsAppFloatingButton from './components/Actions/WhatsAppFloatingButton';
import { UserContext } from './backend/actions/UserContext';

export default function App() {
  return (
  <>
  <UserContext.Provider>
  <Navigation/>
  </UserContext.Provider>
  </>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
