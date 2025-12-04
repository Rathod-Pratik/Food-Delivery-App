import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { countries } from "../data/countries";

const RegisterScreen = ({ navigation }) => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [modalVisible, setModalVisible] = useState(false);
  const [phone, setPhone] = useState("");

  const [focusedInput, setFocusedInput] = useState(null); // ⭐ NEW
  const [showPassword, setShowPassword] = useState(false); // for toggling password visibility

  const selectCountry = (item) => {
    setSelectedCountry(item);
    setModalVisible(false);
  };

  const getInputStyle = (name) => [styles.input, focusedInput === name && styles.inputFocused];

  const getHalfInputStyle = (name) => [
    styles.inputHalf,
    focusedInput === name && styles.inputFocused,
  ];

  // Ensure only digits and limit to 10 characters
  const handlePhoneChange = (text) => {
    // remove non-digit chars
    const digitsOnly = text.replace(/\D/g, "");
    // limit to 10
    const limited = digitsOnly.slice(0, 10);
    setPhone(limited);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, padding: 25, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Logo */}
        <View style={styles.logoBox}>
          <Image source={require("../images/Logo.png")} style={styles.logo} />
        </View>

        <Text style={styles.header}>Let's get started</Text>
        <Text style={styles.sub}>Please input your details</Text>

        {/* First/Last Name */}
        <View style={styles.row}>
          <TextInput
            placeholder="First name"
             placeholderTextColor="#000"
            style={getHalfInputStyle("first")}
            onFocus={() => setFocusedInput("first")}
            onBlur={() => setFocusedInput(null)}
          />
          <TextInput
            placeholder="Last name"
             placeholderTextColor="#000"
            style={getHalfInputStyle("last")}
            onFocus={() => setFocusedInput("last")}
            onBlur={() => setFocusedInput(null)}
          />
        </View>

        {/* Phone Field With Country Dropdown */}
        <View style={[styles.phoneContainer, focusedInput === "phone" && styles.inputFocused]}>
          <TouchableOpacity style={styles.countryBox} onPress={() => setModalVisible(true)}>
            <Image source={{ uri: selectedCountry.flag }} style={styles.flag} />
            <Text style={styles.arrow}>▼</Text>
          </TouchableOpacity>

          <TextInput
            placeholder="Your phone number"
             placeholderTextColor="#000"
            keyboardType="number-pad"
            style={styles.phoneInput}
            value={phone}
            onChangeText={handlePhoneChange}
            onFocus={() => setFocusedInput("phone")}
            onBlur={() => setFocusedInput(null)}
            maxLength={10} // enforce 10 chars at TextInput level too
          />
        </View>

        {/* Email */}
        <TextInput
          placeholder="Your email"
           placeholderTextColor="#000"
          style={getInputStyle("email")}
          onFocus={() => setFocusedInput("email")}
          onBlur={() => setFocusedInput(null)}
        />

        {/* Password with show/hide toggle */}
        <View style={[styles.input, styles.passwordWrap, focusedInput === "password" && styles.inputFocused]}>
          <TextInput
            placeholder="Your password"
             placeholderTextColor="#000"
            secureTextEntry={!showPassword}
            style={styles.passwordInput}
            onFocus={() => setFocusedInput("password")}
            onBlur={() => setFocusedInput(null)}
          />
          <TouchableOpacity
            onPress={() => setShowPassword((s) => !s)}
            style={styles.showBtn}
            accessibilityRole="button"
          >
            <Text style={styles.showText}>{showPassword ? "Hide" : "Show"}</Text>
          </TouchableOpacity>
        </View>

        {/* Continue */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.btnText}>Continue</Text>
        </TouchableOpacity>

        {/* Terms */}
        <Text style={styles.terms}>
          By signing up, you agree to snap{" "}
          <Text style={styles.link}>Terms of Service</Text> and{" "}
          <Text style={styles.link}>Privacy Policy</Text>.
        </Text>

        {/* Already account */}
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
        <Text style={styles.footer}>
          Already had an account? <Text style={styles.link}>Sign in</Text>
        </Text>
        </TouchableOpacity>

        {/* Next Button */}
        <TouchableOpacity style={styles.nextBtn} onPress={() => navigation.navigate("OtpScreen")}>
          <Text style={styles.nextTxt}>Next</Text>
        </TouchableOpacity>

        {/* Country Modal */}
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalBg}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Select Country</Text>

              <FlatList
                data={countries}
                keyExtractor={(item) => item.code}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.modalItem} onPress={() => selectCountry(item)}>
                    <Image source={{ uri: item.flag }} style={styles.flagSmall} />
                    <Text style={styles.countryText}>
                      {item.name} ({item.dial_code})
                    </Text>
                  </TouchableOpacity>
                )}
              />

              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalClose}>
                <Text style={{ color: "#000", fontWeight: "600" }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  logoBox: { alignItems: "center", marginTop: 40 },
  logo: { width: 150, height: 60 },

  header: { fontSize: 26, fontWeight: "700", marginTop: 40, color: "#000" },
  sub: { color: "#555", marginBottom: 25 },

  row: { flexDirection: "row", justifyContent: "space-between",color: "#000"  },

  inputHalf: {
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    width: "48%",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "transparent",
  },

  input: {
    height: 50,
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
  },

  /* Focused Border ⭐ */
  inputFocused: {
    borderColor: "#000",
    color: "#000"
  },

  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    height: 50,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "transparent",
  },

  countryBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 7,
    paddingVertical: 7,
    backgroundColor: "#fff",
    marginLeft: 5,
    borderRadius: 5,
    elevation: 2,
  },

  flag: { width: 32, height: 22, borderRadius: 4 },
  arrow: { marginLeft: 5, fontSize: 14, color: "#333" },
  phoneInput: { flex: 1, paddingHorizontal: 15, color: "#000"  },

  button: {
    backgroundColor: "#006970",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  btnText: { color: "#fff", fontSize: 17, fontWeight: "600" },

  terms: {
    textAlign: "center",
    color: "#555",
    marginTop: 20,
    paddingHorizontal: 10,
  },

  footer: { marginTop: 15, textAlign: "center", color: "#555" },
  link: { color: "#1C5A5A", fontWeight: "700" },

  nextBtn: {
    marginTop: 10,
    backgroundColor: "#000",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
    width: 100,
    alignSelf: "center",
  },

  nextTxt: { color: "#fff", fontSize: 16, fontWeight: "600" },

  /* Modal */
  modalBg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    padding: 20,
  },

  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    maxHeight: "70%",
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15,
  },

  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },

  flagSmall: { width: 32, height: 22, borderRadius: 4, marginRight: 10 },
  countryText: { fontSize: 16 },

  modalClose: {
    alignSelf: "center",
    marginTop: 10,
    padding: 10,
  },

  /* password area */
  passwordWrap: {
    justifyContent: "center",
    paddingRight: 12,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: Platform.OS === "ios" ? 12 : 8,
    color: "#000" 
  },
  showBtn: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  showText: { color: "#1C5A5A", fontWeight: "700" },
});
