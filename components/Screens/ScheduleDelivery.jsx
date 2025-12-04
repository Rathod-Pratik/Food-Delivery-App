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
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const { height, width } = Dimensions.get("window");

// same map image
const MAP_IMAGE = require("../images/Map.png");

const ICON_LOCATION = require("../images/locationRed.png");
const ICON_LOCATION_GREEN = require("../images/Ellipse.png");
const IMG_BIKE = require("../images/Bike.png");
const IMG_CAR = require("../images/Car.png");
const IMG_VAN = require("../images/Van.png");

const SHEET_HEIGHT = height * 0.62;

function pad(n) {
  return n < 10 ? `0${n}` : `${n}`;
}

function formatDate(d) {
  // DD/MM/YYYY
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
}

function formatTime(d) {
  // HH:MM (12-hour) and compute am/pm
  let hours = d.getHours();
  const minutes = pad(d.getMinutes());
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  if (hours === 0) hours = 12;
  return { timeStr: `${pad(hours)}:${minutes}`, ampm };
}

export default function ScheduleDelivery({ navigation }) {
  const [vehicle, setVehicle] = useState("bike");

  // store as strings for display (kept backward-compatible with your UI)
  const [date, setDateStr] = useState("");
  const [time, setTimeStr] = useState("");
  const [ampm, setAmpm] = useState("pm");

  // actual Date object for pickers
  const [dateObj, setDateObj] = useState(new Date());

  // picker visibility
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  // animation values (start with sheet hidden)
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

  const handleBackPress = () => {
    if (isOpen) {
      closeSheet();
      return;
    }
    if (navigation && typeof navigation.goBack === "function") {
      navigation.goBack();
    } else {
      console.warn("No navigation.goBack available.");
    }
  };

  // Date picker handler
  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === "ios"); // keep open on iOS if inline; hide on Android
    if (selectedDate) {
      setDateObj(selectedDate);
      setDateStr(formatDate(selectedDate));
    }
  };

  // Time picker handler
  const onChangeTime = (event, selectedTime) => {
    setShowTimePicker(Platform.OS === "ios");
    if (selectedTime) {
      setDateObj(selectedTime);
      const { timeStr, ampm: ap } = formatTime(selectedTime);
      setTimeStr(timeStr);
      setAmpm(ap);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      {/* Fullscreen map image */}
      <Image source={MAP_IMAGE} style={styles.fullImage} resizeMode="cover" />

      {/* Top-left circular back button */}
      <SafeAreaView style={styles.topControls}>
        <TouchableOpacity style={styles.backBtn} onPress={handleBackPress}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
      </SafeAreaView>

      {/* Floating open button to show sheet */}
      <TouchableOpacity style={styles.openFloating} onPress={openSheet}>
        <Text style={styles.openTxt}>Open</Text>
      </TouchableOpacity>

      {/* Overlay (active only when sheet open) */}
      <Animated.View
        pointerEvents={isOpen ? "auto" : "none"}
        style={[styles.overlay, { opacity: overlayOpacity }]}
      >
        <Pressable style={styles.overlayFill} onPress={closeSheet} />
      </Animated.View>

      {/* Animated sheet that slides from bottom */}
      <Animated.View
        style={[
          styles.animatedSheetContainer,
          { transform: [{ translateY: sheetTranslateY }] },
        ]}
      >
        <View style={styles.sheet}>
          <ScrollView contentContainerStyle={styles.sheetContent} showsVerticalScrollIndicator={false}>
            <View style={styles.handle} />

            <Text style={styles.title}>Schedule Delivery</Text>

            <Text style={styles.label}>Pickup Location</Text>
            <View style={styles.inputBox}>
              <Image source={ICON_LOCATION} style={{ height: 20, width: 15, marginRight: 12 }} />
              <Text style={styles.inputText}>32 Samwell Sq, Chevron</Text>
            </View>

            <Text style={[styles.label, { marginTop: 14 }]}>Delivery Location</Text>
            <View style={styles.inputBox}>
              <Image source={ICON_LOCATION_GREEN} style={styles.pinSmall} />
              <Text style={styles.inputText}>21b, Karimu Kotun Street, Victoria Island</Text>
            </View>

            <View style={styles.dtRow}>
              <View style={styles.dtCol}>
                <Text style={styles.label}>Date</Text>

                {/* Touchable that opens native date picker */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setShowDatePicker(true)}
                  style={styles.dtInput}
                >
                  <Text style={{ color: date ? "#233634" : "#9DA9A6" }}>
                    {date || "DD/MM/YYYY"}
                  </Text>
                </TouchableOpacity>

                {/* DateTimePicker (Android: shows modal; iOS: will show inline if desired) */}
                {showDatePicker && (
                  <DateTimePicker
                    value={dateObj}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={onChangeDate}
                  />
                )}
              </View>

              <View style={styles.dtCol}>
                <Text style={styles.label}>Time</Text>

                {/* Touchable that opens native time picker */}
                <View style={styles.timeRow}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setShowTimePicker(true)}
                    style={[styles.dtInput, { flex: 1 }]}
                  >
                    <Text style={{ color: time ? "#233634" : "#9DA9A6" }}>
                      {time || "HH:MM"}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.ampmBox}
                    onPress={() => {
                      // toggle AM/PM manually (keeps displayed string but doesn't change underlying Date)
                      setAmpm((p) => (p === "am" ? "pm" : "am"));
                    }}
                  >
                    <Text style={styles.ampmText}>{ampm}</Text>
                  </TouchableOpacity>
                </View>

                {showTimePicker && (
                  <DateTimePicker
                    value={dateObj}
                    mode="time"
                    is24Hour={false}
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={onChangeTime}
                  />
                )}
              </View>
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
              onPress={() => {
                // example navigation after scheduling (send formatted values)
                navigation?.navigate?.("DetailsScreen", { vehicle, date, time, ampm });
              }}
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

  dtRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  dtCol: { width: "48%" },
  dtInput: {
    backgroundColor: "#EEF7F6",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    color: "#233634",
  },
  timeRow: { flexDirection: "row", alignItems: "center" },
  ampmBox: {
    backgroundColor: "#EEF7F6",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  ampmText: { color: "#233634", fontWeight: "600" },

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
