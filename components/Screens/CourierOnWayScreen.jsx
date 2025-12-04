import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  StatusBar,
  SafeAreaView,
  Pressable,
} from "react-native";

const { height, width } = Dimensions.get("window");

// replace with your local map / icons / avatar
const MAP_IMAGE = require("../images/Map.png");
const AVATAR = require("../imageswebp/profile.webp"); 
const PHONE_ICON = require("../images/phone.png");

const SHEET_HEIGHT = height * 0.28; // visible sheet height

export default function CourierOnWayScreen({ navigation }) {
  const [isOpen, setIsOpen] = useState(false);

  const sheetTranslateY = useRef(new Animated.Value(SHEET_HEIGHT)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const bannerOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    openSheet();
  }, []);

  const openSheet = () => {
    setIsOpen(true);
    Animated.parallel([
      Animated.timing(bannerOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(sheetTranslateY, { toValue: 0, duration: 320, useNativeDriver: true }),
      Animated.timing(overlayOpacity, { toValue: 0.2, duration: 320, useNativeDriver: true }),
    ]).start();
  };

  const closeSheet = (afterNavigate = null) => {
    Animated.parallel([
      Animated.timing(sheetTranslateY, { toValue: SHEET_HEIGHT, duration: 280, useNativeDriver: true }),
      Animated.timing(overlayOpacity, { toValue: 0, duration: 260, useNativeDriver: true }),
      Animated.timing(bannerOpacity, { toValue: 0, duration: 260, useNativeDriver: true }),
    ]).start(() => {
      setIsOpen(false);

      if (afterNavigate) {
        navigation?.navigate?.(afterNavigate);
      }
    });
  };

  const handleBackPress = () => {
    if (isOpen) {
      closeSheet();
    } else {
      navigation?.goBack?.();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <Image source={MAP_IMAGE} style={styles.fullImage} resizeMode="cover" />

      {/* Back Button + Banner */}
      <SafeAreaView style={styles.topRow}>
        <TouchableOpacity style={styles.backBtn} onPress={handleBackPress}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>

        <Animated.View style={[styles.topBanner, { opacity: bannerOpacity }]}>
          <Text style={styles.bannerText}>Your courier is on the way!</Text>
        </Animated.View>
      </SafeAreaView>

      {/* Overlay */}
      <Animated.View
        pointerEvents={isOpen ? "auto" : "none"}
        style={[styles.overlay, { opacity: overlayOpacity }]}
      >
        <Pressable style={styles.overlayFill} onPress={() => closeSheet()} />
      </Animated.View>

      {/* Floating OPEN button (only when sheet closed) */}
      {!isOpen && (
        <TouchableOpacity style={styles.openFloating} onPress={openSheet}>
          <Text style={styles.openTxt}>Open</Text>
        </TouchableOpacity>
      )}

      {/* Bottom Sheet */}
      <Animated.View style={[styles.animatedSheet, { transform: [{ translateY: sheetTranslateY }] }]}>
        <View style={styles.sheetCard}>
          <View style={styles.sheetHeader}>
            <Text style={styles.smallGreen}>Your courier is on his way!</Text>
            <Text style={styles.eta}>2 mins away</Text>
          </View>

          <View style={styles.driverRow}>
            <Image source={AVATAR} style={styles.avatar} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.driverName}>Allan Smith</Text>
              <Text style={styles.driverSub}>124 Deliveries</Text>

              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 6 }}>
                <Text style={{ fontSize: 14 }}>⭐️⭐️⭐️⭐️☆</Text>
                <Text style={{ marginLeft: 8, color: "#6B6B6B" }}>4.1</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.callBtn}>
              <Image source={PHONE_ICON} style={{ width: 22, height: 22, tintColor: "green" }} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => closeSheet("")}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  fullImage: { width: width, height: height, position: "absolute", top: 0, left: 0 },

  topRow: {
    position: "absolute",
    top: 12,
    left: 12,
    right: 12,
    zIndex: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  backIcon: { fontSize: 26, color: "#17484A", marginTop: -2 },

  topBanner: {
    position: "absolute",
    left: width * 0.12,
    right: width * 0.12,
    top: 6,
    backgroundColor: "#2F8C4E",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  bannerText: { color: "#fff", fontWeight: "700" },

  overlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 30 },
  overlayFill: { flex: 1, backgroundColor: "#000" },

  // Floating Open Button
  openFloating: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    backgroundColor: "#0B6A66",
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 999,
    elevation: 6,
    zIndex: 50,
  },
  openTxt: { color: "#fff", fontWeight: "700" },

  // Bottom Sheet
  animatedSheet: { position: "absolute", left: 0, right: 0, bottom: 0, height: SHEET_HEIGHT, zIndex: 35 },

  sheetCard: {
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    elevation: 8,
  },

  sheetHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  smallGreen: { color: "#2F8C4E", fontWeight: "600" },
  eta: { color: "#6B6B6B" },

  driverRow: { flexDirection: "row", alignItems: "center", marginTop: 12 },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: "#eee" },
  driverName: { fontSize: 16, fontWeight: "700" },
  driverSub: { color: "#8A8A8A", marginTop: 4 },

  callBtn: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#ecefefff",
    justifyContent: "center",
    alignItems: "center",
  },

  cancelBtn: { marginTop: 12, alignItems: "center" },
  cancelText: { color: "#C23B3B", fontWeight: "700" },
});
