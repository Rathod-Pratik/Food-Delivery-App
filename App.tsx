// import 'react-native-gesture-handler';

import { StyleSheet} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from 'react';
import AppNavigator from './components/Navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';


const App = () => {
 
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>

     
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: { flex: 1 },
});


