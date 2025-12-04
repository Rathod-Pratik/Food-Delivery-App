import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
   KeyboardAvoidingView,
    Platform, 
    ScrollView 
} from "react-native";

const OtpScreen = ({navigation}) => {
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  return (
   <KeyboardAvoidingView
  style={{ flex: 1, padding: 25, backgroundColor: "#fff" }}
  behavior={Platform.OS === "ios" ? "padding" : "height"}
>
  <ScrollView
    contentContainerStyle={{ flexGrow: 1 }}
    showsVerticalScrollIndicator={false}
  >
      <View style={styles.logoBox}>
        <Image source={require("../images/Logo.png")} style={styles.logo} />
      </View>

      <Text style={styles.header}>Enter the 4-digit code</Text>

      <Text style={styles.sub}>
        Please input the verification code sent to your phone number 8263****40
      </Text>

      <Text style={styles.change}>Change number?</Text>

      <View style={styles.otpRow}>
        {otp.map((item, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.otpInput}
            maxLength={1}
            keyboardType="number-pad"
            value={item}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
          />
        ))}
      </View>

      <Text style={styles.resend}>Didn’t get any code yet? Resend code</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.btnText}>Verify</Text>
      </TouchableOpacity>

      <Text style={styles.terms}>
        By signing up, you agree to snap{" "}
        <Text style={styles.link}>Terms of Service</Text> and{" "}
        <Text style={styles.link}>Privacy Policy</Text>.
      </Text>

      <TouchableOpacity
                    style={styles.nextBtn}
                    onPress={() => navigation.navigate("BottomScreen")}
                  >
                    <Text style={styles.nextTxt}>Next</Text>
                  </TouchableOpacity>
    </ScrollView>
</KeyboardAvoidingView>
  );
};

export default OtpScreen;


const styles = StyleSheet.create({
 
  logoBox: { alignItems: "center", marginTop: 40 },
  logo: { width: 150, height: 60 },
  snap: { fontSize: 28, fontWeight: "700", color: "#0C1A30", marginTop: 8 },
  header: { fontSize: 26, fontWeight: "700", marginTop: 40 },
  sub: { marginTop: 10, color: "#555" },
  change: { marginTop: 15, color: "#006970", fontWeight: "700" },
  otpRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 25 },
  otpInput: {
    width: 60,
    height: 60,
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 22,
  },
  resend: { marginTop: 15, color: "#006970" },
  button: {
    backgroundColor: "#006970",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
  },
  btnText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  terms: {
    textAlign: "center",
    color: "#555",
    marginTop: 20,
    paddingHorizontal: 15,
  },
  link: { color: "#006970", fontWeight: "700" },
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
