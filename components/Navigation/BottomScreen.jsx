import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

import Home from '../BottomScreens/Home';
import History from '../BottomScreens/History';
import Profile from '../BottomScreens/Profile';

const Tab = createBottomTabNavigator();

const BottomScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ focused }) => {
          let icon;

          if (route.name === 'Home') {
            icon = require('../images/Home.png');
          } else if (route.name === 'History') {
            icon = require('../images/History.png');
          } else if (route.name === 'Profile') {
            icon = require('../images/Profile.png');
          }

          return (
            <Image
              source={icon}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#006970' : 'grey',
              }}
            />
          );
        },

        tabBarActiveTintColor: '#006970',
        tabBarInactiveTintColor: 'grey',

        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          position: 'absolute',
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomScreen;
