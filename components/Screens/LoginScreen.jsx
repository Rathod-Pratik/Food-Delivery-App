import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SaveUserInfo } from '../Utils/Auth.js';

const LoginScreen = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const isValidEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const Login = async () => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    if (!cleanEmail) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!isValidEmail(cleanEmail)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    if (!cleanPassword) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (cleanPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      isValid = false;
    }

    if (isValid) {
      try {
        await SaveUserInfo(cleanEmail, cleanPassword);
        navigation.navigate("Home");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, padding: 25, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoBox}>
            <Image source={require('../images/Logo.png')} style={styles.logo} />
          </View>

          <Text style={styles.header}>Welcome</Text>
          <Text style={styles.sub}>Please input your details</Text>

          <TextInput
            style={[
              styles.input, 
              emailError ? styles.inputError : null
            ]}
            placeholder="Email"
            placeholderTextColor="#000"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (emailError) setEmailError("");
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

          <View 
            style={[
              styles.passwordBox, 
              passwordError ? styles.inputError : null
            ]}
          >
            <TextInput
              secureTextEntry={!show}
              style={styles.passwordInput}
              placeholder="Password"
              placeholderTextColor="#000"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (passwordError) setPasswordError("");
              }}
            />

            <TouchableOpacity onPress={() => setShow(!show)}>
              <Text style={styles.show}>{show ? 'Hide' : 'Show'}</Text>
            </TouchableOpacity>
          </View>
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

          <Text style={styles.forgot}>Forgot Password?</Text>

          <TouchableOpacity style={styles.button} onPress={Login}>
            <Text style={styles.btnText}>Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('RegisterScreen')}
          >
            <Text style={styles.footer}>
              Need an account?{' '}
              <Text style={styles.signUp}>Sign up</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  logoBox: { alignItems: 'center', marginTop: 40 },
  logo: { width: 150, height: 60 },
  header: { fontSize: 26, fontWeight: '700', marginTop: 40, color: '#000' },
  sub: { color: '#555', marginBottom: 25 },
  input: {
    height: 50,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 5, // Reduced margin to keep error text closer
    color: '#000',
    borderWidth: 1,
    borderColor: 'transparent', // Default border
  },
  passwordBox: {
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    color: '#000',
    marginTop: 10,
    height: 50,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  passwordInput: { flex: 1, height: 50, color: '#000' },
  show: { color: '#1C5A5A', fontWeight: '600' },
  forgot: {
    marginTop: 10,
    alignSelf: 'flex-end',
    color: '#555',
    marginBottom: 25,
  },
  button: {
    backgroundColor: '#006970',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontSize: 17, fontWeight: '600' },
  footer: { marginTop: 20, textAlign: 'center', color: '#555' },
  signUp: { color: '#1C5A5A', fontWeight: '700' },
  nextBtn: {
    marginTop: 10,
    backgroundColor: '#000',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
    width: 100,
    alignSelf: 'center',
  },
  nextTxt: { color: '#fff', fontSize: 16, fontWeight: '600' },
  
  // Validation Styles
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
    marginLeft: 5,
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
});