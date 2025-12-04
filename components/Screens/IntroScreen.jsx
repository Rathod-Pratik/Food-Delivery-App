import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const IntroScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../images/Welcome.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.overlay}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <View style={styles.logoRow}>
          <Image
            source={require('../images/WhiteLogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.bottom}>
          <Text style={styles.title}>
            Request for Delivery{'\n'}in few clicks
          </Text>

          <Text style={styles.subtitle}>
            On-demand delivery whenever and wherever the need arises.
          </Text>

          <View style={styles.dotsRow}>
            <View style={styles.dotActive} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('LoginScreen')}
          >
            <Text style={styles.btnText}>Get Started</Text>
          </TouchableOpacity>

          <Text style={styles.footer}>
            Have an account already? <Text style={styles.signIn}>SIGN IN</Text>
          </Text>
        </View>

      </SafeAreaView>
    </ImageBackground>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)', 
  },
  logoRow: {
    marginTop: 80,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 108,
    height: 60,
  },
  logoText: {
    marginLeft: 8,
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  bottom: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 10
  },
  subtitle: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 20,
    lineHeight: 22,
  },
  dotsRow: {
    flexDirection: 'row',
    marginBottom: 30,
    justifyContent:"center"
  },
  dotActive: {
    width: 20,
    height: 8,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginRight: 8,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 5,
    marginRight: 8,
  },
  button: {
    backgroundColor: '#006970',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    width: '100%',
  },
  btnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  footer: {
    marginTop: 20,
    color: '#fff',
    textAlign: 'center',
  },
  signIn: {
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});