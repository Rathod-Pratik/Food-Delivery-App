import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  
} from "react-native";

const IntroScreen = ({navigation}) => {
  return (
    <ImageBackground
      style={styles.container}
      source={require("../images/Onboarding.png")}
    >
      <View style={styles.logoRow}>
        {/* <Image
          source={require("../images/Logo.png")}
          style={styles.logo}
          resizeMode="contain"
        /> */}
        {/* <Text style={styles.logoText}>Snap</Text> */}
      </View>

      <View style={styles.bottom}>
        {/* <Text style={styles.title}>Request for Delivery{"\n"}in few clicks</Text>

        <Text style={styles.subtitle}>
          On-demand delivery whenever and wherever the need arises.
        </Text>

        <View style={styles.dotsRow}>
          <View style={styles.dotActive} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View> */}

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={styles.btnText}>Get Started</Text>
        </TouchableOpacity>
        

        {/* <Text style={styles.footer}>
          Have an account already? <Text style={styles.signIn}>SIGN IN</Text>
        </Text> */}
   
      </View>
      
            {/* ---- NEXT BUTTON ---- */}
      {/* <TouchableOpacity
        style={styles.nextBtn}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Text style={styles.nextTxt}>Next</Text>
      </TouchableOpacity> */}
    </ImageBackground>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  container: { flex: 1, height:"100%", width:"100%"},
  logoRow: { marginTop: 50, flexDirection: "row", alignSelf:"center"  },
  logo: { width: 150, height: 150},
  logoText: { marginLeft: 8, fontSize: 28, fontWeight: "700", color: "#0C1A30" },
  bottom: { position: "absolute", bottom: 109, paddingHorizontal: 20, width: "100%" },
  title: { fontSize: 28, fontWeight: "700", color: "#fff" },
  subtitle: { marginTop: 10, width: "85%", color: "#fff", fontSize: 15 },
  dotsRow: { flexDirection: "row", marginVertical: 25 },
  dotActive: {
    width: 20,
    height: 8,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginRight: 8,
  },
  dot: { width: 8, height: 8, backgroundColor: "#ddd", borderRadius: 5, marginRight: 8 },
  button: {
    backgroundColor: "#006970",
    paddingVertical: 19,
    borderRadius: 14,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontSize: 17, fontWeight: "600" },
  footer: { marginTop: 20, color: "#fff", textAlign: "center" },
  signIn: { fontWeight: "700", textDecorationLine: "underline" },
  nextBtn: {
    marginTop:10,
    backgroundColor: "#000",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
    width:100,
    alignSelf:"center"
  },
  nextTxt: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
