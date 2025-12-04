import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from "../Screens/SplashScreen";
import IntroScreen from "../Screens/IntroScreen";
import LoginScreen from "../Screens/LoginScreen";
import RegisterScreen from "../Screens/RegisterScreen";
import OtpScreen from "../Screens/OtpScreen";
import BottomScreen from './BottomScreen';
import DeliveryDetails from "../Screens/DeliveryDetails";
import InstantDelivery from "../Screens/InstantDelivery";
import ScheduleDelivery from "../Screens/ScheduleDelivery";
import DetailsScreen from "../Screens/DetailsScreen";
import ConfirmDetailsScreen from "../Screens/ConfirmDetailsScreen";
import CourierOnWayScreen from "../Screens/CourierOnWayScreen";
import DeliveryInProgressScreen from "../Screens/DeliveryInProgressScreen";


const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
      />
      <Stack.Screen
        name="IntroScreen"
        component={IntroScreen}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
      />
      <Stack.Screen
        name="OtpScreen"
        component={OtpScreen}
      />
       <Stack.Screen
        name="BottomScreen"
        component={BottomScreen}
      />
      <Stack.Screen
        name="DeliveryDetails"
        component={DeliveryDetails}
      />
      <Stack.Screen
        name="InstantDelivery"
        component={InstantDelivery}
      />
 
 <Stack.Screen
        name="ScheduleDelivery"
        component={ScheduleDelivery}
      />
       <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
      />
       <Stack.Screen
        name="ConfirmDetailsScreen"
        component={ConfirmDetailsScreen}
      />
       <Stack.Screen
        name="CourierOnWayScreen"
        component={CourierOnWayScreen}
      />
       <Stack.Screen
        name="DeliveryInProgressScreen"
        component={DeliveryInProgressScreen}
      />
 
 
 
    </Stack.Navigator>
  );
}
