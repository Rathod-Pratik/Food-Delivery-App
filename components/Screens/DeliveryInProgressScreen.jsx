// DeliveryInProgressScreen.js
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

// replace these with your real local images
const MAP_IMAGE = require("../images/Map.png");
const AVATAR = require("../imageswebp/profile.webp");
const PHONE_ICON = require("../images/phone.png");
const STAR_FILLED = require("../images/yellowstar.png");
const STAR_EMPTY = require("../images/greystar.png");
const PACKAGE_ICON = require("../images/package.png");

const SHEET_COLLAPSED = height * 0.28;
const SHEET_EXPANDED = height * 0.64;

export default function DeliveryInProgressScreen({ navigation }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [rating, setRating] = useState(0);

  // translateY used to move sheet: 0 => collapsed visible; negative => expanded upward
  const translateY = useRef(new Animated.Value(SHEET_COLLAPSED)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const bannerOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // show collapsed sheet on mount
    translateY.setValue(SHEET_COLLAPSED);
    Animated.parallel([
      Animated.timing(translateY, { toValue: 0, duration: 320, useNativeDriver: true }),
      Animated.timing(overlayOpacity, { toValue: 0.12, duration: 320, useNativeDriver: true }),
      Animated.timing(bannerOpacity, { toValue: 1, duration: 320, useNativeDriver: true }),
    ]).start();
  }, []);

  // toggle between collapsed and expanded
  const toggleExpand = () => {
    const toExpanded = !isExpanded;
    setIsExpanded(toExpanded);

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: toExpanded ? -(SHEET_EXPANDED - SHEET_COLLAPSED) : 0,
        duration: 320,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: toExpanded ? 0.28 : 0.12,
        duration: 320,
        useNativeDriver: true,
      }),
      Animated.timing(bannerOpacity, {
        toValue: toExpanded ? 0.9 : 1,
        duration: 320,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // close sheet (animate down) then go back
  const closeSheet = () => {
    Animated.parallel([
      Animated.timing(translateY, { toValue: SHEET_COLLAPSED, duration: 260, useNativeDriver: true }),
      Animated.timing(overlayOpacity, { toValue: 0, duration: 260, useNativeDriver: true }),
      Animated.timing(bannerOpacity, { toValue: 0, duration: 260, useNativeDriver: true }),
    ]).start(() => {
      navigation?.goBack?.();
    });
  };

  const onPressStar = (i) => {
    setRating(i);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <Image source={MAP_IMAGE} style={styles.fullImage} resizeMode="cover" />

      {/* Top banner */}
      <SafeAreaView style={styles.topRow}>
        <Animated.View style={[styles.topBanner, { opacity: bannerOpacity }]}>
          <Text style={styles.bannerText}>Delivery in progress</Text>
        </Animated.View>
      </SafeAreaView>

      {/* Overlay to dim background + tap-to-close */}
      <Animated.View
        pointerEvents="auto"
        style={[styles.overlay, { opacity: overlayOpacity }]}
      >
        <Pressable style={{ flex: 1 }} onPress={closeSheet} />
      </Animated.View>

      {/* Bottom sheet container (animated transform) */}
      <Animated.View
        style={[
          styles.sheetContainer,
          { transform: [{ translateY }] }, // translateY: 0 = collapsed visible; negative moves up for expanded
        ]}
      >
        <View style={styles.handleWrap}>
          <Pressable onPress={toggleExpand} style={styles.handle} />
        </View>

        {/* Content changes depending on collapsed/expanded state */}
        {!isExpanded ? (
          // COLLAPSED: courier card
          <View style={styles.card}>
            <Text style={styles.etaText}>5 minutes to delivery</Text>

            <View style={styles.driverRow}>
              <Image source={AVATAR} style={styles.avatar} />

              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.driverName}>Allan Smith</Text>
                <Text style={styles.driverSub}>124 Deliveries</Text>

                <View style={styles.starRow}>
                  <Image source={STAR_FILLED} style={styles.starIcon} />
                  <Image source={STAR_FILLED} style={styles.starIcon} />
                  <Image source={STAR_FILLED} style={styles.starIcon} />
                  <Image source={STAR_FILLED} style={styles.starIcon} />
                  <Image source={STAR_EMPTY} style={styles.starIcon} />
                  <Text style={styles.ratingValue}> 4.1</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.callBtn} onPress={() => { /* implement call */ }}>
                <Image source={PHONE_ICON} style={styles.callIcon} />
              </TouchableOpacity>
            </View>

            {/* Close button for collapsed state */}
            <TouchableOpacity style={styles.closeBtnSheet} onPress={closeSheet}>
              <Text style={styles.closeTextSheet}>Close</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // EXPANDED: review form
          <View style={[styles.card, { paddingBottom: 30 }]}>
            <Text style={styles.reviewTitle}>Leave a review about this Courier</Text>

            <Text style={styles.label}>Rating</Text>

            <View style={styles.ratingRow}>
              {[1, 2, 3, 4, 5].map((i) => (
                <TouchableOpacity key={i} onPress={() => onPressStar(i)} activeOpacity={0.7}>
                  <Image
                    source={i <= rating ? STAR_FILLED : STAR_EMPTY}
                    style={[styles.rateStar, { tintColor: i <= rating ? "#F2B01E" : undefined }]}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.doneBtn} onPress={() => { /* submit rating */ }}>
              <Text style={styles.doneTxt}>Done</Text>
            </TouchableOpacity>

            {/* Close button for expanded state */}
            <TouchableOpacity style={[styles.closeBtnSheet, { marginTop: 12 }]} onPress={closeSheet}>
              <Text style={styles.closeTextSheet}>Close</Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },

  fullImage: {
    width,
    height,
    position: "absolute",
    top: 0,
    left: 0,
  },

  topRow: {
    position: "absolute",
    top: 12,
    left: 12,
    right: 12,
    zIndex: 40,
    alignItems: "center",
  },
  topBanner: {
    backgroundColor: "#2F8C4E",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 8,
    alignItems: "center",
    width: width - 80,
  },
  bannerText: { color: "#fff", fontWeight: "700" },

  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#000",
    zIndex: 30,
  },

  sheetContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -SHEET_COLLAPSED, // initial offset so translateY 0 brings it up by SHEET_COLLAPSED
    height: SHEET_EXPANDED + 20,
    zIndex: 35,
  },

  handleWrap: {
    alignItems: "center",
  },
  handle: {
    width: 64,
    height: 6,
    borderRadius: 4,
    backgroundColor: "#E6ECEB",
    marginTop: 8,
    marginBottom: 12,
  },

  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 20,
    justifyContent: "flex-start",
  },

  etaText: { fontSize: 16, color: "#233634", marginBottom: 10 },

  driverRow: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: "#eee" },
  driverName: { fontSize: 16, fontWeight: "700", color: "#111" },
  driverSub: { color: "#8A8A8A", marginTop: 4 },

  starRow: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  starIcon: { width: 16, height: 16, marginRight: 6 },
  ratingValue: { color: "#6B6B6B", marginLeft: 6 },

  callBtn: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#E7F6F5",
    justifyContent: "center",
    alignItems: "center",
  },
  callIcon: { width: 20, height: 20, tintColor: "#0B6A66" },

  // expanded review styles
  reviewTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12, color: "#111" },
  label: { color: "#9DA9A6", marginBottom: 8 },
  ratingRow: { flexDirection: "row", marginBottom: 18 },

  rateStar: { width: 36, height: 36, marginRight: 10 },

  doneBtn: {
    backgroundColor: "#0B6A66",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },
  doneTxt: { color: "#fff", fontWeight: "700", fontSize: 16 },

  // Close button style inside sheet
  closeBtnSheet: { marginTop: 14, alignItems: "center" },
  closeTextSheet: { color: "#C23B3B", fontWeight: "700" },
});
