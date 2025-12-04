import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SplashScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* ---- YOUR OLD UI ---- */}
      <Image source={require("../images/Logo.png")} style={styles.logo} />

      {/* ---- NEXT BUTTON ---- */}
      <TouchableOpacity
        style={styles.nextBtn}
        onPress={() => navigation.navigate("IntroScreen")}
      >
        <Text style={styles.nextTxt}>Next</Text>
      </TouchableOpacity>
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



