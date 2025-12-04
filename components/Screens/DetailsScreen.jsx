import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
  SafeAreaView,
  Platform,
  PermissionsAndroid,
  Alert,
} from "react-native";
import { launchCamera } from "react-native-image-picker";

const { width } = Dimensions.get("window");

const ICON_INFO = require("../images/Vector.png"); // small red circle with ?
const ICON_CAMERA = require("../images/camera.png"); // camera icon inside circle

export default function DetailsScreen({ navigation }) {
  const [itemType, setItemType] = useState(""); // will be selected from inline dropdown
  const [quantity, setQuantity] = useState("");
  const [payer, setPayer] = useState("me"); // "me" | "recipient"
  const [paymentType, setPaymentType] = useState(""); // selected from inline dropdown
  const [recipientName, setRecipientName] = useState(""); // empty -> show placeholder
  const [recipientContact, setRecipientContact] = useState(""); // empty -> show placeholder

  // image from camera
  const [photoUri, setPhotoUri] = useState(null);

  // inline dropdown visibility
  const [showItemDropdown, setShowItemDropdown] = useState(false);
  const [showPaymentDropdown, setShowPaymentDropdown] = useState(false);

  const ITEM_OPTIONS = [
    { id: "gadget", label: "Gadget" },
    { id: "document", label: "Document" },
  ];

  const PAYMENT_OPTIONS = [
    { id: "upi", label: "UPI" },
    { id: "cash", label: "Cash" },
    { id: "card", label: "Card" },
  ];

  const openItemType = () => {
    setShowItemDropdown((s) => !s);
    // ensure other dropdown closed
    setShowPaymentDropdown(false);
  };
  const openPaymentType = () => {
    setShowPaymentDropdown((s) => !s);
    // ensure other dropdown closed
    setShowItemDropdown(false);
  };

  // Request runtime camera & storage permission on Android
  async function requestCameraPermissionsAndroid() {
    if (Platform.OS !== "android") return true;

    try {
      const permissions = [PermissionsAndroid.PERMISSIONS.CAMERA];
      permissions.push(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      permissions.push(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);

      const granted = await PermissionsAndroid.requestMultiple(permissions);

      const cameraGranted =
        granted[PermissionsAndroid.PERMISSIONS.CAMERA] === PermissionsAndroid.RESULTS.GRANTED;
      if (cameraGranted) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.warn("Permission error", err);
      return false;
    }
  }

  const openCamera = async () => {
    if (Platform.OS === "android") {
      const ok = await requestCameraPermissionsAndroid();
      if (!ok) {
        Alert.alert(
          "Permission required",
          "Camera permission is required to take a photo. Please enable it in settings.",
          [{ text: "OK" }]
        );
        return;
      }
    }

    const options = {
      mediaType: "photo",
      saveToPhotos: true,
      quality: 0.8,
      cameraType: "back",
    };

    try {
      const result = await launchCamera(options);
      if (result.didCancel) {
        return;
      }
      if (result.errorCode) {
        console.warn("Camera error:", result.errorMessage);
        Alert.alert("Camera error", result.errorMessage || "Could not open camera");
        return;
      }
      if (result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setPhotoUri(uri);
      }
    } catch (err) {
      console.warn("launchCamera error", err);
      Alert.alert("Error", "Unable to open camera");
    }
  };

  const handleContinue = () => {
    console.log("Continue pressed", {
      itemType,
      quantity,
      payer,
      paymentType,
      recipientName,
      recipientContact,
      photoUri,
    });
    navigation?.navigate?.("ConfirmDetailsScreen");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backWrap} onPress={() => navigation?.goBack?.()}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.heading}>Details</Text>

        <Text style={styles.subLabel}>What are you sending</Text>
        <Text style={styles.helper}>Select type of item (e.g gadget, document)</Text>

        {/* Inline dropdown trigger */}
        <View>
          <TouchableOpacity style={styles.selectBox} activeOpacity={0.8} onPress={openItemType}>
            <Text style={[styles.selectText, !itemType && styles.placeholderText]}>
              {itemType || "Select"}
            </Text>
            <Text style={styles.chev}>{showItemDropdown ? "▴" : "▾"}</Text>
          </TouchableOpacity>

          {showItemDropdown && (
            <View style={styles.dropdownList}>
              {ITEM_OPTIONS.map((it) => (
                <TouchableOpacity
                  key={it.id}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setItemType(it.label);
                    setShowItemDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{it.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={styles.prohibitedRow}>
          <Image source={ICON_INFO} style={styles.infoIcon} />
          <Text style={styles.prohibitedText}>
            Our Prohibited Items 
          </Text>
        </View>

        <Text style={[styles.subLabel, { marginTop: 18 }]}>Quantity</Text>
        <View style={styles.inputBox}>
          <TextInput
           value={quantity} 
           onChangeText={setQuantity} 
           keyboardType="numeric" 
           style={styles.input} 
            placeholderTextColor="#000"
           />
        </View>

        <Text style={[styles.subLabel, { marginTop: 18 }]}>Select who pays</Text>
        <View style={styles.radioRow}>
          <TouchableOpacity style={styles.radioWrap} onPress={() => setPayer("me")}>
            <View style={[styles.radioOuter, payer === "me" && styles.radioOuterActive]}>
              {payer === "me" && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.radioLabel}>Me</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.radioWrap} onPress={() => setPayer("recipient")}>
            <View style={[styles.radioOuter, payer === "recipient" && styles.radioOuterActive]}>
              {payer === "recipient" && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.radioLabel}>Recipient</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.subLabel, { marginTop: 18 }]}>Payment type</Text>

        {/* Inline dropdown for payment */}
        <View>
          <TouchableOpacity style={styles.selectBox} activeOpacity={0.8} onPress={openPaymentType}>
            <Text style={[styles.selectText, !paymentType && styles.placeholderText]}>
              {paymentType || "Payment type"}
            </Text>
            <Text style={styles.chev}>{showPaymentDropdown ? "▴" : "▾"}</Text>
          </TouchableOpacity>

          {showPaymentDropdown && (
            <View style={styles.dropdownList}>
              {PAYMENT_OPTIONS.map((it) => (
                <TouchableOpacity
                  key={it.id}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setPaymentType(it.label);
                    setShowPaymentDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{it.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <Text style={[styles.subLabel, { marginTop: 18 }]}>Recipient Names</Text>
        <View style={styles.inputBox}>
          <TextInput
            value={recipientName}
            onChangeText={setRecipientName}
            style={styles.input}
            placeholder="Name"
             placeholderTextColor="#000"
          />
        </View>

        <Text style={[styles.subLabel, { marginTop: 18 }]}>Recipient contact number</Text>
        <View style={styles.inputBox}>
          <TextInput
            value={recipientContact}
            onChangeText={setRecipientContact}
            keyboardType="phone-pad"
            style={styles.input}
            placeholder="Phone"
             placeholderTextColor="#000"
          />
        </View>

        {/* Camera / image area */}
        <TouchableOpacity style={styles.cameraBox} onPress={openCamera} activeOpacity={0.8}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.cameraPreview} />
          ) : (
            <>
              <View style={styles.cameraCircle}>
                <Image source={ICON_CAMERA} style={styles.cameraIcon} />
              </View>
              <Text style={styles.cameraText}>Take a picture of the package</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Continue button */}
        <TouchableOpacity style={styles.continueBtn} onPress={handleContinue} activeOpacity={0.9}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const PRIMARY = "#0B6A66";
const LIGHT_BG = "#F1F6F6";
const MUTED = "#9DA9A6";

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { paddingHorizontal: 20, paddingTop: 18 },

  backWrap: { width: 42, height: 42, borderRadius: 10, justifyContent: "center", alignItems: "center", marginBottom: 6, backgroundColor: "#fff" },
  backArrow: { fontSize: 26, color: PRIMARY, marginLeft: 2 },

  heading: { fontSize: 24, fontWeight: "700", color: "#111", marginTop: 6 },

  subLabel: { marginTop: 12, color: "#233634", fontSize: 16, fontWeight: "600" },
  helper: { color: MUTED, fontSize: 12, marginTop: 6, marginBottom: 8 },

  selectBox: { backgroundColor: LIGHT_BG, paddingVertical: 14, paddingHorizontal: 14, borderRadius: 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  selectText: { color: "#233634", fontSize: 15 },
  placeholderText: { color: MUTED },

  /* Inline dropdown list */
  dropdownList: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#E6ECEB",
    overflow: "hidden",
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F4F3",
  },
  dropdownItemText: { fontSize: 15, color: "#233634" },

  prohibitedRow: { flexDirection: "row", alignItems: "flex-start", marginTop: 8 },
  infoIcon: { width: 18, height: 18, marginRight: 8, marginTop: 2 },
  prohibitedText: { color: "#9A6363", fontSize: 12, flex: 1 },

  inputBox: { backgroundColor: LIGHT_BG, paddingVertical: 3, paddingHorizontal: 14, borderRadius: 8, flexDirection: "row", alignItems: "center", marginTop: 6 },
  input: { flex: 1, color: "#233634", fontSize: 15, color: "#000" },

  radioRow: { flexDirection: "row", marginTop: 8, alignItems: "center" },
  radioWrap: { flexDirection: "row", alignItems: "center", marginRight: 20 },
  radioOuter: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: MUTED, justifyContent: "center", alignItems: "center", marginRight: 8 },
  radioOuterActive: { borderColor: PRIMARY },
  radioInner: { width: 10, height: 10, borderRadius: 6, backgroundColor: PRIMARY },
  radioLabel: { color: "#233634" },

  chev: { color: MUTED, marginLeft: 8 },

  dtRow: { flexDirection: "row", justifyContent: "space-between" },

  cameraBox: {
    marginTop: 22,
    borderStyle: "dashed",
    borderWidth: 1.5,
    borderColor: "#C8E7E4",
    borderRadius: 8,
    paddingVertical: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#E6F6F5", justifyContent: "center", alignItems: "center", marginBottom: 10 },
  cameraIcon: { width: 22, height: 20, tintColor: PRIMARY },
  cameraText: { color: "#7A8C8A" },

  // preview size inside camera box
  cameraPreview: {
    width: width - 72,
    height: 160,
    borderRadius: 6,
    resizeMode: "cover",
  },

  continueBtn: { marginTop: 28, backgroundColor: PRIMARY, paddingVertical: 16, borderRadius: 12, alignItems: "center", width: width - 40, alignSelf: "center" },
  continueText: { color: "#fff", fontWeight: "700", fontSize: 16 },

  /* Modal styles removed - kept none here since we use inline dropdowns */
});
