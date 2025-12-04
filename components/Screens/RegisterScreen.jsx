import React, { useState } from 'react';
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
  Alert,
} from 'react-native';
import { countries } from '../data/countries';
import { SaveUserInfo } from '../Utils/Auth';

const RegisterScreen = ({ navigation }) => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [modalVisible, setModalVisible] = useState(false);
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [focusedInput, setFocusedInput] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const selectCountry = item => {
    setSelectedCountry(item);
    setModalVisible(false);
  };

  const handlePhoneChange = text => {
    const digitsOnly = text.replace(/\D/g, '');
    const limited = digitsOnly.slice(0, 10);
    setPhone(limited);
    if (errors.phone) setErrors({ ...errors, phone: null });
  };

  const validate = () => {
    let isValid = true;
    let tempErrors = {};

    if (!firstName.trim()) {
      tempErrors.firstName = 'First name is required';
      isValid = false;
    }
    if (!lastName.trim()) {
      tempErrors.lastName = 'Last name is required';
      isValid = false;
    }
    if (phone.length !== 10) {
      tempErrors.phone = 'Enter a valid 10-digit number';
      isValid = false;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      tempErrors.email = 'Enter a valid email';
      isValid = false;
    }
    if (password.length < 6) {
      tempErrors.password = 'Password must be at least 6 chars';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleRegister =async () => {
    if (validate()) {
      await SaveUserInfo({
        name:firstName+" "+  lastName,
        mobile:phone,
        email:email,
        password:password,
      })
      navigation.navigate('OtpScreen');
    }
  };

  const getBorderColor = name => {
    if (errors[name]) return 'red';
    if (focusedInput === name) return '#000';
    return 'transparent';
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, padding: 25, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoBox}>
          <Image source={require('../images/Logo.png')} style={styles.logo} />
        </View>

        <Text style={styles.header}>Let's get started</Text>
        <Text style={styles.sub}>Please input your details</Text>

        <View style={styles.row}>
          <View style={{ width: '48%' }}>
            <TextInput
              placeholder="First name"
              placeholderTextColor="#000"
              style={[
                styles.inputHalf,
                { borderColor: getBorderColor('firstName') },
              ]}
              onFocus={() => setFocusedInput('firstName')}
              onBlur={() => setFocusedInput(null)}
              value={firstName}
              onChangeText={text => {
                setFirstName(text);
                if (errors.firstName) setErrors({ ...errors, firstName: null });
              }}
            />
            {errors.firstName && (
              <Text style={[styles.errorText, { marginTop: 2 }]}>
                {errors.firstName}
              </Text>
            )}
          </View>

          <View style={{ width: '48%' }}>
            <TextInput
              placeholder="Last name"
              placeholderTextColor="#000"
              style={[
                styles.inputHalf,
                { width: '100%', borderColor: getBorderColor('lastName') },
              ]}
              onFocus={() => setFocusedInput('lastName')}
              onBlur={() => setFocusedInput(null)}
              value={lastName}
              onChangeText={text => {
                setLastName(text);
                if (errors.lastName) setErrors({ ...errors, lastName: null });
              }}
            />
            {errors.lastName && (
              <Text style={[styles.errorText, { marginTop: 2 }]}>
                {errors.lastName}
              </Text>
            )}
          </View>
        </View>

        <View>
          <View
            style={[
              styles.phoneContainer,
              { borderColor: getBorderColor('phone') },
            ]}
          >
            <TouchableOpacity
              style={styles.countryBox}
              onPress={() => setModalVisible(true)}
            >
              <Image
                source={{ uri: selectedCountry.flag }}
                style={styles.flag}
              />
              <Text style={styles.arrow}>▼</Text>
            </TouchableOpacity>

            <TextInput
              placeholder="Your phone number"
              placeholderTextColor="#000"
              keyboardType="number-pad"
              style={styles.phoneInput}
              value={phone}
              onChangeText={handlePhoneChange}
              onFocus={() => setFocusedInput('phone')}
              onBlur={() => setFocusedInput(null)}
              maxLength={10}
            />
          </View>
          {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
        </View>

        <View>
          <TextInput
            placeholder="Your email"
            placeholderTextColor="#000"
            style={[styles.input, { borderColor: getBorderColor('email') }]}
            onFocus={() => setFocusedInput('email')}
            onBlur={() => setFocusedInput(null)}
            value={email}
            onChangeText={text => {
              setEmail(text);
              if (errors.email) setErrors({ ...errors, email: null });
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>

        <View>
          <View
            style={[
              styles.input,
              styles.passwordWrap,
              { borderColor: getBorderColor('password') },
            ]}
          >
            <TextInput
              placeholder="Your password"
              placeholderTextColor="#000"
              secureTextEntry={!showPassword}
              style={styles.passwordInput}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
              value={password}
              onChangeText={text => {
                setPassword(text);
                if (errors.password) setErrors({ ...errors, password: null });
              }}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(s => !s)}
              style={styles.showBtn}
              accessibilityRole="button"
            >
              <Text style={styles.showText}>
                {showPassword ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
          </View>
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.btnText}>Continue</Text>
        </TouchableOpacity>

        <Text style={styles.terms}>
          By signing up, you agree to snap{' '}
          <Text style={styles.link}>Terms of Service</Text> and{' '}
          <Text style={styles.link}>Privacy Policy</Text>.
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.footer}>
            Already had an account? <Text style={styles.link}>Sign in</Text>
          </Text>
        </TouchableOpacity>

        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalBg}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Select Country</Text>
              <FlatList
                data={countries}
                keyExtractor={item => item.code}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => selectCountry(item)}
                  >
                    <Image
                      source={{ uri: item.flag }}
                      style={styles.flagSmall}
                    />
                    <Text style={styles.countryText}>
                      {item.name} ({item.dial_code})
                    </Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.modalClose}
              >
                <Text style={{ color: '#000', fontWeight: '600' }}>Close</Text>
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
  logoBox: { alignItems: 'center', marginTop: 40 },
  logo: { width: 150, height: 60 },
  header: { fontSize: 26, fontWeight: '700', marginTop: 40, color: '#000' },
  sub: { color: '#555', marginBottom: 25 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  inputHalf: {
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    color: '#000',
  },
  input: {
    height: 50,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    color: '#000',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    height: 50,
    marginBottom: 15,
    borderWidth: 1,
  },
  countryBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
    paddingVertical: 7,
    backgroundColor: '#fff',
    marginLeft: 5,
    borderRadius: 5,
    elevation: 2,
  },
  flag: { width: 32, height: 22, borderRadius: 4 },
  arrow: { marginLeft: 5, fontSize: 14, color: '#333' },
  phoneInput: { flex: 1, paddingHorizontal: 15, color: '#000' },
  button: {
    backgroundColor: '#006970',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  btnText: { color: '#fff', fontSize: 17, fontWeight: '600' },
  terms: {
    textAlign: 'center',
    color: '#555',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  footer: { marginTop: 15, textAlign: 'center', color: '#555' },
  link: { color: '#1C5A5A', fontWeight: '700' },
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
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    padding: 20,
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  flagSmall: { width: 32, height: 22, borderRadius: 4, marginRight: 10 },
  countryText: { fontSize: 16 },
  modalClose: {
    alignSelf: 'center',
    marginTop: 10,
    padding: 10,
  },
  passwordWrap: {
    justifyContent: 'center',
    paddingRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    color: '#000',
    height: 50,
  },
  showBtn: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  showText: { color: '#1C5A5A', fontWeight: '700' },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -14,
    marginBottom: 10,
    marginLeft: 5,
  },
});
