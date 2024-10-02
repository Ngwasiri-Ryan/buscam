import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image , StyleSheet} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLOR from '../../Constants/Colors';
import images from '../../Constants/Images';
import Footer from '../../components/ServiceComponents/Footer';
import { UserContext } from '../../backend/actions/UserContext';
import { fetchUserBookings } from '../../backend/actions/history';

const ViewHistoryScreen = () => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext); // Get user data from context
  const [travelHistoryData, setTravelHistoryData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const loadUserBookings = async () => {
      if (user && user.username) { // Ensure the user object and username exist
        const bookings = await fetchUserBookings(user.username); // Fetch bookings using the username from context
        setTravelHistoryData(bookings);
        const total = bookings.reduce((acc, booking) => acc + booking.ticketPrice, 0); // Calculate total price
        setTotalPrice(total);
      }
    };

    loadUserBookings();
  }, [user]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color='#000' />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Travel History</Text>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
            <Text style={{ fontSize: 16 }}>You have spent a total of</Text>
            <View style={styles.priceRow}>
              <Image source={images.coin} size={30} color={COLOR.text} style={styles.smallMoney} />
              <Text style={styles.totalPrice}>{totalPrice} FCFA</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {travelHistoryData.map((travel) => (
          <View key={travel.id} style={styles.eventContainer}>
          <View style={styles.iconContainer}>
              <Image source={images.bus_history} size={30} color={COLOR.text} style={styles.busIcon} />
            </View>
            <View style={styles.detailsContainer} >
              <View style={{display:'flex',gap:60, alignItems:"center", flexDirection:'row'}}>
                <Text style={styles.busAgency}>{travel.busAgency}</Text>
                <View style={styles.detailRow}>
                  <Image source={images.calendar} size={30} color={COLOR.text} style={styles.smallMoney} />
                  <Text style={styles.date}>{travel.departureDate}</Text>
                </View>
              </View>
              <View style={{ display: 'flex', flexDirection: 'row', gap: 20,}}>
                
                <View style={styles.detailRow}>
                  <Image source={images.time} size={30} color={COLOR.text} style={styles.smallMoney} />
                  <Text style={styles.capitalize}>{travel.travelTime}</Text>
                </View>
              </View>

              <View style={styles.routeContainer}>
                <View style={styles.detailRow}>
                  <Image source={images.location} size={30} color={COLOR.text} style={styles.smallIcon} />
                  <Text style={styles.departure}>{travel.origin} -</Text>
                </View>
                <View style={styles.detailRow}>
                  <Image source={images.destination} size={30} color={COLOR.text} style={styles.smallIcon} />
                  <Text style={styles.destination}>{travel.destination}</Text>
                </View>
              </View>

              <View style={styles.ticketContainer}>
                <View style={styles.detailRow}>
                  <Image source={images.ticket} size={30} color={COLOR.text} style={styles.smallTicket} />
                  <Text style={styles.tickets}>{travel.numberOfTickets}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Image source={images.money} size={30} color={COLOR.text} style={styles.smallMoney} />
                  <Text style={styles.price}>{travel.ticketPrice} FCFA</Text>
                </View>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={COLOR.secondaryText} />
          </View>
        ))}
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.background,
  },
  header: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'#B3E5FC',
    paddingTop:48,
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 55,
  },
  headerTextContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  priceIcon: {
    marginRight: 5,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
  scrollContainer: {
    padding: 20,
  },
  eventContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  iconContainer: {
    marginRight: 15,
    justifyContent: 'center',
  },
  busIcon: {
    height: 40,
    width: 40,
  },
  smallIcon: {
    height: 15,
    width: 15,
  },
  smallMoney: {
    height: 25,
    width: 25,
    marginRight: 10,
  },
  capitalize:{
    textTransform:'capitalize'
  },
  smallTicket: {
    height: 20,
    width: 30,
    marginRight: 5,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    gap:5,
  },
  date: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLOR.black,
  },
  destination: {
    fontSize: 12,
    color: COLOR.secondaryText,
    marginVertical: 2,
    textTransform:'capitalize'
  },
  departure: {
    fontSize: 12,
    color: COLOR.secondaryText,
    marginVertical: 2,
    textTransform:'capitalize'
  },
  routeContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
    padding: 2,
    borderWidth: 2,
    borderColor: COLOR.tetairy,
    width: 140,
    borderRadius: 50,
    justifyContent: 'center',
  },
  ticketContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  tickets: {
    fontSize: 14,
    color: COLOR.text,
  },
  price: {
    fontSize: 14,
    color: 'green',
    fontWeight: 'bold',
  },
  busAgency: {
    fontSize: 19,
    color: COLOR.tetairy,
    fontWeight: 'bold',
    textTransform:'capitalize'
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
});

export default ViewHistoryScreen;
