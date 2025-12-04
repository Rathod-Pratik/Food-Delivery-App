import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Animated,
  Pressable,
  StatusBar,
  SafeAreaView,
} from "react-native";

const { height, width } = Dimensions.get("window");

// local image - replace with your actual image in ../images/
const MAP_IMAGE = require("../images/Map.png");

const ICON_LOCATION = require("../images/locationRed.png");
const ICON_LOCATION_GREEN = require("../images/Ellipse.png");
const IMG_BIKE = require("../images/Bike.png");
const IMG_CAR = require("../images/Car.png");
const IMG_VAN = require("../images/Van.png");

const SHEET_HEIGHT = height * 0.62; // visible height of sheet

export default function InstantDelivery({ navigation }) {
  const [vehicle, setVehicle] = useState("bike");
  const [isOpen, setIsOpen] = useState(false);

  // start sheet off-screen by SHEET_HEIGHT
  const sheetTranslateY = useRef(new Animated.Value(SHEET_HEIGHT)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  const openSheet = () => {
    setIsOpen(true);
    Animated.parallel([
      Animated.timing(sheetTranslateY, {
        toValue: 0,
        duration: 320,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0.4,
        duration: 320,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeSheet = () => {
    Animated.parallel([
      Animated.timing(sheetTranslateY, {
        toValue: SHEET_HEIGHT,
        duration: 260,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 260,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsOpen(false);
    });
  };

  // Back button: if sheet open -> close it. Else go back via navigation (if available)
  const handleBackPress = () => {
    if (isOpen) {
      closeSheet();
      return;
    }
    if (navigation && typeof navigation.goBack === "function") {
      navigation.goBack();
    } else {
      // fallback - no navigation provided
      console.warn("No navigation.goBack available.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      {/* Fullscreen image */}
      <Image source={MAP_IMAGE} style={styles.fullImage} resizeMode="cover" />

      {/* Top-left circular back button */}
      <SafeAreaView style={styles.topControls}>
        <TouchableOpacity style={styles.backBtn} onPress={handleBackPress}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
      </SafeAreaView>

      {/* Floating open button */}
      <TouchableOpacity style={styles.openFloating} onPress={openSheet}>
        <Text style={styles.openTxt}>Open</Text>
      </TouchableOpacity>

      {/* Overlay - pointerEvents only active when sheet is open */}
      <Animated.View
        pointerEvents={isOpen ? "auto" : "none"}
        style={[styles.overlay, { opacity: overlayOpacity }]}
      >
        <Pressable style={styles.overlayFill} onPress={closeSheet} />
      </Animated.View>

      {/* Animated sheet container - translateY based on SHEET_HEIGHT */}
      <Animated.View
        style={[
          styles.animatedSheetContainer,
          { transform: [{ translateY: sheetTranslateY }] },
        ]}
      >
        <View style={styles.sheet}>
          <ScrollView
            contentContainerStyle={styles.sheetContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.handle} />

            <Text style={styles.title}>Instant Delivery</Text>

            <Text style={styles.label}>Pickup Location</Text>
            <View style={styles.inputBox}>
              <Image source={ICON_LOCATION} style={{height:20, width:15, marginRight:12}} />
              <Text style={styles.inputText}>32 Samwell Sq, Chevron</Text>
            </View>

            <Text style={[styles.label, { marginTop: 14 }]}>Delivery Location</Text>
            <View style={styles.inputBox}>
              <Image source={ICON_LOCATION_GREEN} style={styles.pinSmall} />
              <Text style={styles.inputText}>
                21b, Karimu Kotun Street, Victoria Island
              </Text>
            </View>

            <Text style={[styles.label, { marginTop: 18 }]}>Vehicle Type</Text>

            <View style={styles.vehicleRow}>
              <TouchableOpacity
                style={[styles.vehicleBox, vehicle === "bike" && styles.vehicleBoxActive]}
                onPress={() => setVehicle("bike")}
              >
                <Image source={IMG_BIKE} style={styles.vehicleIcon} resizeMode="contain" />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.vehicleBox, vehicle === "car" && styles.vehicleBoxActive]}
                onPress={() => setVehicle("car")}
              >
                <Image source={IMG_CAR} style={styles.vehicleIcon} resizeMode="contain" />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.vehicleBox, vehicle === "van" && styles.vehicleBoxActive]}
                onPress={() => setVehicle("van")}
              >
                <Image source={IMG_VAN} style={styles.vehicleIcon} resizeMode="contain" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => navigation?.navigate?.("DeliveryInProgressScreen")}
            >
              <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeBtn} onPress={closeSheet}>
              <Text style={styles.closeTxt}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },

  fullImage: {
    width: width,
    height: height,
    position: "absolute",
    top: 0,
    left: 0,
  },

  topControls: {
    position: "absolute",
    top: 12,
    left: 12,
    right: 12,
    zIndex: 40,
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
  backIcon: { fontSize: 26, color: "#222", marginTop: -2 },

  openFloating: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    backgroundColor: "#0B6A66",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 999,
    elevation: 6,
    zIndex: 30,
  },
  openTxt: { color: "#fff", fontWeight: "700" },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 25,
  },
  overlayFill: { flex: 1, backgroundColor: "#000" },

  animatedSheetContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: SHEET_HEIGHT,
    zIndex: 35,
  },

  sheet: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    overflow: "hidden",
    paddingTop: 8,
  },

  sheetContent: {
    paddingTop: 8,
    paddingHorizontal: 20,
    paddingBottom: 32,
  },

  handle: {
    width: 64,
    height: 6,
    backgroundColor: "#E6ECEB",
    borderRadius: 4,
    alignSelf: "center",
    marginBottom: 12,
  },

  title: { fontSize: 20, fontWeight: "700", color: "#111", marginBottom: 14 },

  label: { color: "#9DA9A6", fontSize: 13, marginBottom: 8 },

  inputBox: {
    backgroundColor: "#F1F6F6",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  pinSmall: { width: 16, height: 16, marginRight: 12 },
  inputText: { color: "#233634", fontSize: 15, flex: 1 },

  vehicleRow: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "space-between",
  },
  vehicleBox: {
    width: "30%",
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: "#F1F6F6",
    justifyContent: "center",
    alignItems: "center",
  },
  vehicleBoxActive: {
    backgroundColor: "#CFEFEF",
  },
  vehicleIcon: { width: 44, height: 44 },

  nextButton: {
    marginTop: 22,
    backgroundColor: "#0B6A66",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  nextText: { color: "#fff", fontSize: 16, fontWeight: "600" },

  closeBtn: {
    marginTop: 18,
    alignItems: "center",
  },
  closeTxt: {
    color: "#0B6A66",
    fontWeight: "700",
  },
});
