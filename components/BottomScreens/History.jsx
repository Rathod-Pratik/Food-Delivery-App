// screens/HistoryScreen.js
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

// removed vector-icon imports as requested
// replace icon usages with Image placeholders (update paths as needed)



const DATA = [
  {
    id: "1",
    orderId: "ORDB1234 Click here",
    recipient: "Paul Pogba",
    address: "21b, Karimu Kotun Street, Victoria Island",
    time: "20 mins to delivery location",
    status: "In progress",
  },
  {
    id: "2",
    orderId: "ORDB1234 Click here",
    recipient: "Paul Pogba",
    address: "Maryland bustop, Anthony Ikeja",
    time: "12 January 2020, 2:43pm",
    status: "Completed",
  },
  {
    id: "3",
    orderId: "ORDB1234",
    recipient: "Paul Pogba",
    address: "Maryland bustop, Anthony Ikeja",
    time: "12 January 2020, 2:43pm",
    status: "Completed",
  },
  {
    id: "4",
    orderId: "ORDB1234",
    recipient: "Paul Pogba",
    address: "Maryland bustop, Anthony Ikeja",
    time: "12 January 2020, 2:43pm",
    status: "Completed",
  },
];

const HistoryItem = ({ item, onPress }) => {
  const isInProgress = item.status === "In progress";
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.topRow}>
        <Text style={styles.orderId}>{item.orderId}</Text>
        <View style={[styles.badge, isInProgress ? styles.badgeYellow : styles.badgeGreen]}>
          <Text style={styles.badgeText}>{item.status}</Text>
        </View>
      </View>

      <Text style={styles.recipient}>Recipient: {item.recipient}</Text>

      <View style={styles.bottomRow}>
        <View style={styles.iconBox}>
          {/* motorbike icon replaced by image */}
          <Image source={require("../images/Bike.png")}   style={styles.iconImage} resizeMode="contain" />
        </View>

        <View style={{ flex: 1, marginLeft: 12 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/* location icon replaced by small image */}
            <Image source={require("../images/location.png")}   style={styles.smallIcon} resizeMode="contain" />
            <Text style={styles.dropText}> Drop off</Text>
          </View>

          <Text style={styles.address}>{item.address}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function HistoryScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Delivery History</Text>
        <TouchableOpacity style={styles.filterBtn}>
          {/* filter/options icon replaced by image */}
          <Image source={require("../images/Frame.png")}   style={styles.filterIcon} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={DATA}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ paddingBottom: 60 }}
        renderItem={({ item }) => (
          <HistoryItem
            item={item}
            onPress={() => navigation.navigate("DeliveryDetails", { item })}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
      />

      {/* bottom nav stub to match mock */}
      {/* <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Image source={SMALL_PLACEHOLDER} style={styles.navIcon} resizeMode="contain" />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.navItem, styles.navActive]}>
          <Image source={SMALL_PLACEHOLDER} style={styles.navIconActive} resizeMode="contain" />
          <Text style={[styles.navLabel, { color: "#0B8A79" }]}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Image source={SMALL_PLACEHOLDER} style={styles.navIcon} resizeMode="contain" />
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { fontSize: 22, fontWeight: "700", color: "#13302A" },
  filterBtn: {
    backgroundColor: "#F1F5F5",
    padding: 2,
    borderRadius: 5,
  },

  card: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E6ECEB",
  },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  orderId: { fontSize: 16, fontWeight: "700", color: "#234B44" },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
    
  },
  badgeYellow: { backgroundColor: "#d8c78fff" },
  badgeGreen: { backgroundColor:"#2E7D32" },
  badgeText: { fontSize: 12, color: "#fff", fontWeight: "600" },

  recipient: { marginTop: 6, color: "#7D8A88" },

  bottomRow: { flexDirection: "row", marginTop: 12, alignItems: "flex-start" },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: "#EEF7F6",
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: { width: 28, height: 28 },

  smallIcon: { width: 7, height: 9, marginRight: 6 },
  dropText: { fontSize: 14, color: "#006970", fontWeight: "600" },
  address: { marginTop: 6, fontSize: 14, color: "#203231" },
  time: { marginTop: 6, fontSize: 12, color: "#9DA9A6" },

  filterIcon: { width: 35, height: 35 },
  navIcon: { width: 22, height: 22, tintColor: "#9CA7A4" },
  navIconActive: { width: 22, height: 22 },

  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 68,
    borderTopWidth: 1,
    borderTopColor: "#E6ECEB",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  navItem: { alignItems: "center" },
  navLabel: { fontSize: 12, color: "#9CA7A4", marginTop: 4 },
  navActive: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 12,
    backgroundColor: "#F6FBFB",
  },
});
