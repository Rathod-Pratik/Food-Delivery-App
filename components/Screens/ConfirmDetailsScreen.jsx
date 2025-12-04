// ConfirmDetailsScreen.js
import React, { useRef, useEffect, useState } from "react";
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

// IMAGES (same as your reference component)
const MAP_IMAGE = require("../images/Map.png");
const IMG_RED_DOT = require("../images/locationRed.png");
const IMG_GREEN_DOT = require("../images/greenDot.png");
const IMG_ELLIPSE = require("../images/Ellipse.png");
const IMG_BIKE_SMALL = require("../images/Bike.png");

const SHEET_HEIGHT = height * 0.64;

export default function ConfirmDetailsScreen({ navigation }) {
  const [isOpen, setIsOpen] = useState(true);

  const sheetTranslateY = useRef(new Animated.Value(SHEET_HEIGHT)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    openSheet();
  }, []);

  const openSheet = () => {
    setIsOpen(true);
    Animated.parallel([
      Animated.timing(sheetTranslateY, { toValue: 0, duration: 320, useNativeDriver: true }),
      Animated.timing(overlayOpacity, { toValue: 0.2, duration: 320, useNativeDriver: true }),
    ]).start();
  };

  const closeSheet = () => {
    Animated.parallel([
      Animated.timing(sheetTranslateY, { toValue: SHEET_HEIGHT, duration: 260, useNativeDriver: true }),
      Animated.timing(overlayOpacity, { toValue: 0, duration: 240, useNativeDriver: true }),
    ]).start(() => setIsOpen(false));
  };

  const handleBack = () => {
    if (isOpen) return closeSheet();
    navigation?.goBack?.();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <Image source={MAP_IMAGE} style={styles.fullImage} />

      <SafeAreaView style={styles.topControls}>
        <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
      </SafeAreaView>

      {/* Overlay */}
      <Animated.View
        pointerEvents={isOpen ? "auto" : "none"}
        style={[styles.overlay, { opacity: overlayOpacity }]}
      >
        <Pressable style={{ flex: 1 }} onPress={closeSheet} />
      </Animated.View>

      {/* Open Button when closed */}
      {!isOpen && (
        <TouchableOpacity style={styles.openFloating} onPress={openSheet}>
          <Text style={styles.openTxt}>Open</Text>
        </TouchableOpacity>
      )}

      {/* Bottom Sheet */}
      <Animated.View
        style={[styles.animatedSheetContainer, { transform: [{ translateY: sheetTranslateY }] }]}
      >
        <View style={styles.sheet}>
          <ScrollView contentContainerStyle={styles.sheetContent} showsVerticalScrollIndicator={false}>
            <View style={styles.handle} />

            <Text style={styles.heading}>Confirm Details</Text>

            {/* ⭐ EXACT DOT SECTION (same as DeliveryDetails.js) */}
            <View style={styles.rowMain}>
              {/* LEFT DOT COLUMN EXACTLY COPIED */}
              <View style={styles.dotCol}>
                <Image source={IMG_RED_DOT} style={{ height: 20, width: 16 }}  />

                <View style={{ marginVertical: 4 }}>
                  <Image source={IMG_GREEN_DOT} style={styles.dotSmall} />
                  <Image source={IMG_GREEN_DOT} style={[styles.dotSmall, { marginTop: 6 }]} />
                  <Image source={IMG_GREEN_DOT} style={[styles.dotSmall, { marginTop: 6 }]} />
                </View>

                <Image source={IMG_ELLIPSE} style={styles.dotBig} />
              </View>

              {/* RIGHT TEXT COLUMN */}
              <View style={{ flex: 1 }}>
                <Text style={styles.smallLabel}>Pickup Location</Text>
                <Text style={styles.locationText}>32 Samwell Sq, Chevron</Text>

                <View style={{ height: 18 }} />

                <Text style={styles.smallLabel}>Delivery Location</Text>
                <Text style={styles.locationText}>
                  21b, Karimu Kotun Street, Victoria Island
                </Text>
              </View>

              {/* BIKE ICON */}
              <View style={styles.iconBox}>
                <Image source={IMG_BIKE_SMALL} style={{ width: 28, height: 28 }} />
              </View>
            </View>

            {/* ------------- REMAINDER UNCHANGED ------------- */}

            <View style={{ height: 20 }} />

            <View style={styles.twoCol}>
              <View style={{ flex: 1 }}>
                <Text style={styles.muted}>What you are sending</Text>
                <Text style={styles.value}>Electronics/Gadgets</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.muted}>Recipient</Text>
                <Text style={styles.value}>Donald Duck</Text>
              </View>
            </View>

            <View style={{ height: 12 }} />

            <View style={styles.twoCol}>
              <View style={{ flex: 1 }}>
                <Text style={styles.muted}>Recipient contact number</Text>
                <Text style={styles.value}>08123456789</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.muted}>Estimated fee:</Text>
                <Text style={[styles.value, { color: "#17484A", fontWeight: "700", fontSize: 18 }]}>
                  $150
                </Text>
              </View>
            </View>

            <TouchableOpacity style={styles.editLink} onPress={() => navigation?.navigate?.("ScheduleDelivery")}>
              <Text style={styles.editText}>Edit Details</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => navigation?.navigate?.("CourierOnWayScreen")}
            >
              <Text style={styles.primaryBtnText}>Look for courier</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeBtn} onPress={closeSheet}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>

            <View style={{ height: 20 }} />
          </ScrollView>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  fullImage: { width, height, position: "absolute" },

  topControls: { position: "absolute", top: 12, left: 12, zIndex: 40 },
  backBtn: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: "#fff",
    justifyContent: "center", alignItems: "center", elevation: 4,
  },
  backIcon: { fontSize: 26, color: "#17484A" },

  overlay: { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 },

  animatedSheetContainer: {
    position: "absolute", left: 0, right: 0, bottom: 0,
    height: SHEET_HEIGHT, zIndex: 35,
  },

  sheet: {
    flex: 1, backgroundColor: "#fff",
    borderTopLeftRadius: 22, borderTopRightRadius: 22,
  },
  sheetContent: { paddingHorizontal: 20, paddingBottom: 30 },

  handle: {
    width: 64, height: 6, backgroundColor: "#E6ECEB",
    borderRadius: 4, alignSelf: "center", marginTop: 10, marginBottom: 12,
  },

  heading: { fontSize: 22, fontWeight: "700", marginBottom: 10 },

  /* NEW DOT COLUMN EXACTLY LIKE DeliveryDetails.js */
  rowMain: { flexDirection: "row", alignItems: "flex-start", marginTop: 10 },

  dotCol: {
    width: 36,
    alignItems: "center",
    marginRight: 12,
  },
  dotBig: { width: 16, height: 16, marginVertical: 4 },
  dotSmall: { width: 8, height: 8, alignSelf: "center" },

  smallLabel: { color: "#9DA9A6", fontSize: 13 },
  locationText: { color: "#233634", fontSize: 15, fontWeight: "600", marginTop: 4 },

  iconBox: {
    width: 44, height: 44, borderRadius: 10,
    borderWidth: 1, borderColor: "#EEF7F6",
    justifyContent: "center", alignItems: "center",
    backgroundColor: "#fff", marginLeft: 10,
  },

  twoCol: { flexDirection: "row", justifyContent: "space-between" },
  muted: { color: "#9DA9A6" },
  value: { marginTop: 6, color: "#233634" },

  editLink: { marginTop: 10 },
  editText: { color: "#17484A", fontWeight: "700" },

  primaryBtn: {
    marginTop: 20, backgroundColor: "#0B6A66",
    paddingVertical: 16, borderRadius: 12, alignItems: "center",
  },
  primaryBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },

  closeBtn: { marginTop: 14, alignItems: "center" },
  closeText: { color: "#17484A", fontWeight: "700" },

  openFloating: {
    position: "absolute", bottom: 30, alignSelf: "center",
    backgroundColor: "#0B6A66",
    paddingHorizontal: 18, paddingVertical: 10,
    borderRadius: 999, elevation: 6, zIndex: 40,
  },
  openTxt: { color: "#fff", fontWeight: "700" },
});
