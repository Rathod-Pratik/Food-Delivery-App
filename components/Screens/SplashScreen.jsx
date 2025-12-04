import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GetUserInfo } from "../Utils/Auth";

export default function SplashScreen({ navigation }) {

  useEffect(() => {
    const checkUser = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const userInfo = await GetUserInfo();

      if (userInfo && userInfo.name) {
        navigation.replace('BottomScreen'); 
      } else {
        navigation.replace('IntroScreen');
      }
    };

    checkUser();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../images/Logo.png")} style={styles.logo} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  nextBtn: {
    position: "absolute",
    bottom: 30,
    backgroundColor: "#000",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
  },
  nextTxt: { color: "#fff", fontSize: 16, fontWeight: "600" },
  logo: { width: 200, height: 200, resizeMode: "contain" },
});



