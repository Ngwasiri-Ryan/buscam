import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//main screens
import IntroScreen from "../Screens/IntroScreen";
import HomeScreen from "../Screens/HomeScreen";
import ServiceScreen from "../Screens/ServiceScreen";
import ContactScreen from "../Screens/ContactScreen";
//ticket booking screens
import TravelRouteScreen from "../Screens/BookingScreens/TravelRouteScreen";
import TicketBookingScreen from "../Screens/BookingScreens/TicketBookingScreen";
import InformationScreen from "../Screens/BookingScreens/InformationScreen";
import TicketSummaryScreen from "../Screens/BookingScreens/TicketSummaryScreen";
import BookingSuccessScreen from "../Screens/BookingScreens/BookingSuccessScreen";
//pickupscreens
import PickupScreen from "../Screens/PickUpScreens/PickupScreen";
import PickUpInformationScreen from "../Screens/PickUpScreens/PickUpInformationScreen";
import PickupSummaryScreen from "../Screens/PickUpScreens/PickupSummaryScreen";


const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="IntroScreen" component={IntroScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ContactScreen" component={ContactScreen} />
        <Stack.Screen name="ServiceScreen" component={ServiceScreen} />
        <Stack.Screen name="TravelRouteScreen" component={TravelRouteScreen} />
        <Stack.Screen name="TicketBookingScreen" component={TicketBookingScreen} />
        <Stack.Screen name="InformationScreen" component={InformationScreen} />
        <Stack.Screen name="TicketSummaryScreen" component={TicketSummaryScreen} />
        <Stack.Screen name="BookingSuccessScreen" component={BookingSuccessScreen} />
        <Stack.Screen name="PickupScreen" component={PickupScreen} />
        <Stack.Screen name="PickUpInformationScreen" component={PickUpInformationScreen} />
        <Stack.Screen name="PickupSummaryScreen" component={PickupSummaryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
