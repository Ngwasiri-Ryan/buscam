import React, { useContext , useState , useEffect} from "react"; // Import useContext
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { BlurView } from "expo-blur";
import COLOR from "../../Constants/Colors";
import Button from "../../components/Buttons/Button";
import BackButton from "../../components/Buttons/BackButton";
import images from "../../Constants/Images";
import { getTicketPrice } from "../../backend/actions/pricing";
import { UserContext } from "../../backend/actions/UserContext";
import { addBooking } from "../../backend/actions/booking";

const { width, height } = Dimensions.get("window");
const bookingFee = 500;
let pair = 'fcfa';
const currency = pair.toUpperCase();

const TicketSummaryScreen = ({ navigation, route }) => {
  const { user } = useContext(UserContext); // Get user context
  const {
    fullName,
    phoneNumber,
    idCardNumber,
    origin,
    destination,
    busAgency,
    busCategory,
    numberOfTickets,
    travelTime,
    departureDate,
  } = route.params;

  const [ticketPrice, setTicketPrice] = useState(0);

  useEffect(() => {
    // Fetch the ticket price when the component mounts
    const fetchTicketPrice = async () => {
      const price = await getTicketPrice(origin, destination, busCategory, travelTime, busAgency);
      if (price !== null) {
        setTicketPrice(price); // Update the ticket price state
      }
    };
    fetchTicketPrice();
  }, [origin, destination, busCategory, travelTime, busAgency]);

  const handleNext = async () => {
    // Prepare booking data
    const bookingData = {
      username: user?.username, // Get username from context
      fullName,
      phoneNumber,
      idCardNumber,
      origin,
      destination,
      busAgency,
      busCategory,
      numberOfTickets,
      travelTime,
      departureDate,
      ticketPrice: ticketPrice * numberOfTickets + bookingFee, 
      createdAt: new Date(), // Optional: Store the booking time
    };

    // Add booking to Firestore
    await addBooking(bookingData);

    navigation.navigate("BookingSuccessScreen");
  };

  return (
    <View style={styles.container}>
      {/* Wave Image */}
      <View style={styles.imageContainer}>
        <Image width={width} style={styles.wave} source={images.wave} />
      </View>

      {/* Screen Content */}
      <View style={styles.contentWrapper}>
        <View>
          <Text style={styles.stepText}>Step 4 of 4</Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.heading}>Ticket Summary</Text>

          {/* Blur Effect */}
          <BlurView intensity={100} style={styles.infoContainer}>
            {/* Travel Agency */}
            <View style={styles.input}>
              <Text style={styles.small}>Travel Agency</Text>
              <Text style={styles.large}>{busAgency}</Text>
            </View>

            {/* Bus Category */}
            <View style={styles.input}>
              <Text style={styles.small}>Bus Category</Text>
              <Text style={styles.large}>{busCategory}</Text>
            </View>

            {/* Travel Destination */}
            <View style={styles.input}>
              <Text style={styles.small}>Travel Destination</Text>
              <Text style={styles.large}>{`${origin} - ${destination}`}</Text>
            </View>

            {/* Travel Date and Time */}
            <View style={styles.flex}>
              <View style={styles.inputFlex}>
                <Text style={styles.small}>Travel Date</Text>
                <Text style={styles.large}>{departureDate}</Text>
              </View>
              <View style={styles.inputFlex}>
                <Text style={styles.small}>Travel Time</Text>
                <Text style={styles.large}>{travelTime}</Text>
              </View>
            </View>

            {/* Full Name */}
            <View style={styles.input}>
              <Text style={styles.small}>Full Name</Text>
              <Text style={styles.large}>{fullName}</Text>
            </View>

            {/* Phone Number */}
            <View style={styles.input}>
              <Text style={styles.small}>Phone Number</Text>
              <Text style={styles.large}>{phoneNumber}</Text>
            </View>

            {/* ID Card Number */}
            <View style={styles.input}>
              <Text style={styles.small}>ID Card Number</Text>
              <Text style={styles.large}>{idCardNumber}</Text>
            </View>

            {/* Booking Fee */}
            <View style={styles.input}>
              <Text style={styles.small}>Booking Fee</Text>
              <Text style={styles.price}>500 {currency}</Text>
            </View>

            {/* Ticket Price and Number of Tickets */}
            <View style={styles.flex}>
              <View style={styles.inputFlex}>
                <Text style={styles.small}>Total Price</Text>
                <Text style={styles.price}>{ticketPrice} {currency}</Text>
              </View>
              <View style={styles.inputFlex}>
                <Text style={styles.small}>Number of Tickets</Text>
                <Text style={styles.large}>{numberOfTickets}</Text>
              </View>
            </View>

            {/* Total Cost */}
            <View style={styles.input}>
              <Text style={styles.small}>Total Cost</Text>
              <Text style={styles.price}>{ticketPrice * numberOfTickets + bookingFee} {currency}</Text>
            </View>
          </BlurView>
        </View>
      </View>

      {/* Button Container */}
      <View style={styles.buttonContainer}>
        <BackButton onPress={() => navigation.replace("ServiceScreen")} />
        <Button text="Next" onPress={handleNext} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.background,
  },
  imageContainer: {
    position: "absolute",
    top: 0,
    width: width,
    zIndex: 1,
  },
  contentWrapper: {
    flex: 1,
    padding: 20,
    zIndex: 2,
    height: height / 2,
    marginTop: 10,
  },
  contentContainer: {
    justifyContent: "flex-start",
  },
  infoContainer: {
    padding: 10,
    borderRadius: 20,
    borderColor: COLOR.text,
    borderWidth: 1,
    overflow: "hidden",
  },
  stepText: {
    color: "white",
    fontSize: 14,
  },
  wave: {
    height: height * 0.4,
    width: width,
    tintColor: COLOR.secondary,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  input: {
    borderColor: COLOR.secondary,
    borderWidth: 1,
    borderRadius: 8,
    height: 43,
    paddingHorizontal: 10,
    marginBottom: 7,
    fontWeight: "bold",
    fontSize: 15,
    cursorColor: COLOR.primary,
    backgroundColor: "rgba(135, 206, 235, 0.2)",
  },
  inputFlex: {
    borderColor: COLOR.secondary,
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 10,
    marginBottom: 7,
    fontWeight: "bold",
    fontSize: 15,
    width: "50%",
    backgroundColor: "rgba(135, 206, 235, 0.2)",
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
    width: "100%",
  },
  small: {
    fontSize: 13,
    marginBottom: 2,
    color: COLOR.text,
  },
  large: {
    fontSize: 15,
    color: COLOR.text,
    fontWeight: "bold",
    textTransform: 'capitalize',
  },
  price: {
    fontSize: 15,
    color: COLOR.text,
    fontWeight: "bold",
    textTransform: 'capitalize',
  },
  buttonContainer: {
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default TicketSummaryScreen;
