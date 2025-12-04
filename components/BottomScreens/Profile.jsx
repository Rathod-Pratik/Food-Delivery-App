// screens/ProfileMenu.js
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

/* Your Icons */
const IMG_AVATAR = require("../imageswebp/profile.webp");
const ICON_PAYMENTS = require("../images/payment.png");
const ICON_HISTORY = require("../images/deliveryHistory.png");
const ICON_SETTINGS = require("../images/setting.png");
const ICON_SUPPORT = require("../images/support.png");
const ICON_INVITE = require("../images/invitation.png");
const ICON_SIGNOUT = require("../images/signout.png");

export default function Profile({ navigation }) {
  // Menu row component WITH ICON IMAGE
  const MenuRow = ({ icon, label, onPress }) => (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <Image source={icon} style={styles.rowIcon} resizeMode="contain" />
      <Text style={styles.rowLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.top}>
          <View style={styles.avatarWrapper}>
            <Image source={IMG_AVATAR} style={styles.avatar} resizeMode="cover" />
          </View>

          <Text style={styles.name}>Faique Akmal</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.menu}>
          <MenuRow
            icon={ICON_PAYMENTS}
            label="Payments"
            onPress={() => {}}
          />

          <MenuRow
            icon={ICON_HISTORY}
            label="Delivery History"
            onPress={() => {}}
          />

          <MenuRow
            icon={ICON_SETTINGS}
            label="Settings"
            onPress={() => {}}
          />

          <MenuRow
            icon={ICON_SUPPORT}
            label="Support/FAQ"
            onPress={() => {}}
          />

          <MenuRow
            icon={ICON_INVITE}
            label="Invite Friends"
            onPress={() => {}}
          />
        </View>

        {/* <View style={styles.spacer} /> */}

        {/* Sign Out Row */}
        <TouchableOpacity style={styles.signOutRow} onPress={() => {}}>
          <Image source={ICON_SIGNOUT} style={styles.signOutIcon} resizeMode="contain" />
          <Text style={styles.signOutLabel}>Sign out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  scroll: {
    paddingTop: 28,
    paddingHorizontal: 24,
    paddingBottom: 40,
    minHeight: "100%",
  },

  top: {
    alignItems: "center",
    marginBottom: 18,
  },

  avatarWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#CFEFEF",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  avatar: {
    width: 96,
    height: 96,
  },

  name: {
    marginTop: 14,
    fontSize: 20,
    fontWeight: "600",
    color: "#222",
  },

  divider: {
    height: 1,
    backgroundColor: "#E6E6E6",
    marginVertical: 18,
  },

  /* MENU */
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
  },
  rowIcon: {
    width: 24,
    height: 24,
    marginRight: 18,
  },
  rowLabel: {
    fontSize: 16,
    color: "#5F6B70",
  },

  spacer: {
    flex: 1,
    height: 20,
  },

  /* SIGN OUT */
  signOutRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    marginTop:60
  },
  signOutIcon: {
    width: 20,
    height: 20,
    marginRight: 14,
    tintColor: "#E04A2A",
  },
  signOutLabel: {
    fontSize: 16,
    color: "#5F6B70",
  },
});
