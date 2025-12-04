import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";

const LoginScreen = ({ navigation }) => {
  const [show, setShow] = useState(false);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, padding: 25, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoBox}>
          <Image source={require("../images/Logo.png")} style={styles.logo} />
          {/* <Text style={styles.snap}>Snap</Text> */}
        </View>

        <Text style={styles.header}>Welcome</Text>
        <Text style={styles.sub}>Please input your details</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#000"
        />

        <View style={styles.passwordBox}>
          <TextInput
            secureTextEntry={!show}
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#000"
          />

          <TouchableOpacity onPress={() => setShow(!show)}>
            <Text style={styles.show}>{show ? "Hide" : "Show"}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.forgot}>Forgot Password?</Text>

        <TouchableOpacity style={styles.button} onPress={() => { }}>
          <Text style={styles.btnText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity

          onPress={() => navigation.navigate("RegisterScreen")}
        >
          <Text style={styles.footer}>
            Need an account?

            <Text style={styles.signUp}>Sign up</Text>

          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => navigation.navigate("RegisterScreen")}
        >
          <Text style={styles.nextTxt}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({

  logoBox: { alignItems: "center", marginTop: 40 },
  logo: { width: 150, height: 60 },
  snap: { fontSize: 28, fontWeight: "700", color: "#0C1A30", marginTop: 8 },
  header: { fontSize: 26, fontWeight: "700", marginTop: 40, color: "#000" },
  sub: { color: "#555", marginBottom: 25 },
  input: {
    height: 50,
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: "#000"

  },
  passwordBox: {
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
    color: "#000"

  },
  passwordInput: { flex: 1, height: 50, color: "#000" },
  show: { color: "#1C5A5A", fontWeight: "600" },
  forgot: {
    marginTop: 10,
    alignSelf: "flex-end",
    color: "#555",
    marginBottom: 25,
  },
  button: {
    backgroundColor: "#006970",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontSize: 17, fontWeight: "600" },
  footer: { marginTop: 20, textAlign: "center", color: "#555" },
  signUp: { color: "#1C5A5A", fontWeight: "700" },
  nextBtn: {
    marginTop: 10,
    backgroundColor: "#000",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
    width: 100,
    alignSelf: "center"
  },
  nextTxt: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
