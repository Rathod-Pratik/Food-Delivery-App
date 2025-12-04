import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";

const Home = ({navigation}) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      
      {/* Header */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.nameText}>Davidson Edgar</Text>
        </View>

        <View style={styles.rightHeader}>
          
          {/* Notification */}
          <View style={styles.bellWrapper}>
            <Image
              source={require("../images/notification.png")}   // <-- CHANGE PATH
              style={{ width: 26, height: 26 }}
            />
            <View style={styles.redDot} />
          </View>

          {/* Profile */}
          <View style={styles.profileCircle}>
            <Text style={{ fontWeight: "600" }}>DE</Text>
          </View>
        </View>
      </View>

      <Text style={styles.questionText}>What would you like to do?</Text>

     {/* Instant Delivery */}
<TouchableOpacity 
style={styles.instantCard}
onPress={() => navigation.navigate("InstantDelivery")}
>
   

  {/* TOP ICON */}
  <Image
    source={require("../images/Electric.png")}
    style={{ width: 40, height: 40, tintColor: "#006970", marginBottom: 10 }}
  />

  {/* TEXT BELOW ICON */}
  <View style={{ width: "85%" }}>
    <Text style={styles.cardTitle}>Instant Delivery</Text>
    <Text style={styles.cardSubTitle}>
      Courier takes only your package and delivers instantly
    </Text>
  </View>

  {/* BIG BACKGROUND ICON (RIGHT SIDE) */}
  <Image
    source={require("../images/Electric.png")}
    style={[styles.bgIcon, { width: 100, height: 150, opacity: 0.1 }]}
  />
</TouchableOpacity>


{/* Schedule Delivery */}
<TouchableOpacity 
style={styles.scheduleCard}
   onPress={() => navigation.navigate("ScheduleDelivery")}

>

  {/* TOP ICON */}
  <Image
    source={require("../images/Clock.png")}
    style={{ width: 40, height: 40, tintColor: "#006970", marginBottom: 10 }}
  />

  {/* TEXT BELOW ICON */}
  <View style={{ width: "85%" }}>
    <Text style={styles.cardTitle}>Schedule Delivery</Text>
    <Text style={styles.cardSubTitle}>
      Courier comes to pick up on your specified date and time
    </Text>
  </View>

  {/* BIG BACKGROUND ICON (RIGHT SIDE) */}
  <Image
    source={require("../images/Clock.png")}
    style={[styles.bgIcon, { width: 110, height: 150, opacity: 0.05 }]}
  />
</TouchableOpacity>

      {/* History */}
      <View style={styles.historyRow}>
        <Text style={styles.historyTitle}>History</Text>
        <Text style={styles.viewAll}>View all</Text>
      </View>

      {/* History Items */}
      {Array(2).fill(0).map((_, index) => (
        <View key={index} style={styles.historyCard}>
          
          <View style={styles.historyTop}>
            <Text style={styles.orderId}>ORDB1234</Text>
            <Text style={styles.completedBadge}>Completed</Text>
          </View>

          <Text style={styles.receiver}>Recipient: Paul Pogba</Text>

          <View style={styles.historyBottom}>
            
            <View style={styles.iconContainer}>
              <Image
                source={require("../images/Bike.png")}   // <-- CHANGE PATH
                style={{ width: 34, height: 34 }}
              />
            </View>

            <View style={{ marginLeft: 10 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("../images/location.png")} // <-- CHANGE PATH
                  style={{ width: 7, height: 9, tintColor: "#006970" }}
                />
                <Text style={styles.dropOff}> Drop off</Text>
              </View>

              <Text style={styles.address}>Maryland bus stop, Anthony Ikeja</Text>
              <Text style={styles.timeStamp}>12 January 2020, 2:43pm</Text>
            </View>
          </View>

        </View>
      ))}

    </ScrollView>
  );
};

export default Home;



/* ----------------- STYLES ----------------- */

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  welcomeText: {
    fontSize: 16,
    color: "grey",
  },

  nameText: {
    fontSize: 22,
    fontWeight: "700",
  },

  rightHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  bellWrapper: {
    marginRight: 15,
    position: "relative",
  },

//   redDot: {
//     width: 8,
//     height: 8,
//     backgroundColor: "red",
//     borderRadius: 10,
//     position: "absolute",
//     right: -1,
//     top: -2,
//   },

  profileCircle: {
    width: 38,
    height: 38,
    borderRadius: 20,
    backgroundColor: "#D2EFEA",
    justifyContent: "center",
    alignItems: "center",
  },

  questionText: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
  },

  instantCard: {
    backgroundColor: "#CFEFEF",
    borderRadius: 12,
    padding: 20,
    marginTop: 10,
    flexDirection: "column",
    alignItems: "start",
    position: "relative",
  },

  scheduleCard: {
    backgroundColor: "#F4F8F7",
    borderRadius: 12,
    padding: 20,
    marginTop: 15,
    flexDirection: "column",
    alignItems: "start",
    position: "relative",
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  cardSubTitle: {
    fontSize: 12,
    color: "grey",
    width: "100%",
  },

  bgIcon: {
    position: "absolute",
    right: 10,
  },

  historyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    marginBottom: 10,
  },

  historyTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  viewAll: {
    fontSize: 14,
    color: "#006970",
    fontWeight: "500",
  },

  historyCard: {
    marginTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  historyTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  orderId: {
    fontSize: 16,
    fontWeight: "700",
  },

  completedBadge: {
    backgroundColor: "#2E7D32",
    color: "white",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 5,
    fontSize: 12,
    fontWeight: "600",
  },

  receiver: {
    marginTop: 5,
    color: "grey",
  },

  historyBottom: {
    flexDirection: "row",
    marginTop: 10,
  },

  iconContainer: {
    backgroundColor: "#EFF7F7",
    padding: 12,
    borderRadius: 10,
  },

  dropOff: {
    fontSize: 14,
    color: "#006970",
    fontWeight: "600",
  },

  address: {
    fontSize: 14,
    marginTop: 4,
  },

  timeStamp: {
    marginTop: 2,
    fontSize: 12,
    color: "grey",
  },
});
