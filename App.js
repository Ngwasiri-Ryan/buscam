import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './navigation/Navigation';
import WhatsAppFloatingButton from './components/Actions/WhatsAppFloatingButton';

export default function App() {
  return (
  <>
  <Navigation/>
  <WhatsAppFloatingButton/>

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
