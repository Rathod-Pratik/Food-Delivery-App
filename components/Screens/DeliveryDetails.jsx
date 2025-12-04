// screens/DeliveryDetails.js
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

/*
  NOTE:
  - Replace the require(...) image paths with your actual assets.
  - I used placeholder paths under ../images/ — you said you'll set real paths later.
*/

const IMG_ARROW = require("../images/Arrow.png"); // arrow image replacing Ionicons
const IMG_PROFILE = require("../imageswebp/profile.webp"); // profile image (you already had this)
const IMG_STARS = require("../images/yellowstar.png"); // single star image (you provided)
const IMG_STARS_GREY = require("../images/greystar.png");
const IMG_RED_DOT = require("../images/locationRed.png"); // top red dot
const IMG_GREEN_DOT = require("../images/greenDot.png"); // small green dot used 3x
const IMG_ELLIPSE = require("../images/Ellipse.png"); // bottom circle (white with green border in design)
const IMG_PAYMENT = require("../images/payment-icon.png"); // small payment icon to show next to "Card"
const IMG_FEE = require("../images/fee-icon.png"); // optional fee icon (if you prefer), otherwise ignored
const IMG_Bike = require("../images/Bike.png")

export default function DeliveryDetails({ route, navigation }) {
  const item = route.params?.item ?? {};
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={IMG_ARROW} style={styles.arrowImage} resizeMode="contain" />
          </TouchableOpacity>

          <Text style={styles.title}>Delivery details</Text>

          <View style={{ width: 26 }} />
        </View>

        <View style={styles.profileRow}>
          <Image
            source={IMG_PROFILE}
            style={[styles.bgIcon, styles.profileImage]}
            resizeMode="cover"
          />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={styles.driverName}>Faique Akmal </Text>
            <Text style={styles.small}>124 Deliveries</Text>

            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 6 }}>
              {/* stars */}
              <Image source={IMG_STARS} style={styles.starRow} resizeMode="contain" />
              <Image source={IMG_STARS} style={styles.starRow} resizeMode="contain" />
              <Image source={IMG_STARS} style={styles.starRow} resizeMode="contain" />
              <Image source={IMG_STARS} style={styles.starRow} resizeMode="contain" />
              <Image source={IMG_STARS_GREY} style={styles.starRow} resizeMode="contain" />
              <Text style={styles.ratingText}> 4.1</Text>
            </View>
          </View>

          <View style={styles.rightBadge}>
            <Text style={styles.completedText}>Completed</Text>
            </View>
            <Image source={IMG_Bike} style={styles.Bike} resizeMode="contain" />
        </View>

        <View style={styles.infoBox}>
          <View style={styles.row}>
            {/* IMAGE-based vertical markers column */}
            <View style={styles.dotCol}>
              {/* TOP RED DOT */}
              <Image source={IMG_RED_DOT} style={styles.dotImage} resizeMode="contain" />

              {/* THREE GREEN DOTS stacked vertically to replace the line */}
              <View style={{ marginVertical: 4 }}>
                <Image source={IMG_GREEN_DOT} style={styles.smallGreenDot} resizeMode="contain" />
                <Image source={IMG_GREEN_DOT} style={[styles.smallGreenDot, { marginTop: 6 }]} resizeMode="contain" />
                <Image source={IMG_GREEN_DOT} style={[styles.smallGreenDot, { marginTop: 6 }]} resizeMode="contain" />
              </View>

              {/* BOTTOM ELLIPSE / CIRCLE */}
              <Image source={IMG_ELLIPSE} style={styles.dotImage} resizeMode="contain" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Pickup Location</Text>
              <Text style={styles.locationText}>32 Samwell Sq, Chevron</Text>

              <View style={{ height: 18 }} />

              <Text style={styles.label}>Delivery Location</Text>
              <Text style={styles.locationText}>21b, Karimu Kotun Street, Victoria Island</Text>
            </View>
          </View>
        </View>

        <View style={styles.twoCol}>
          <View style={styles.col}>
            <Text style={styles.smallLabel}>What you are sending</Text>
            <Text style={styles.colValue}>Electronics/Gadgets</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.smallLabel}>Recipient</Text>
            <Text style={styles.colValue}>Donald Duck</Text>
          </View>
        </View>

        <View style={styles.twoCol}>
          <View style={styles.col}>
            <Text style={styles.smallLabel}>Recipient contact number</Text>
            <Text style={styles.colValue}>08123456789</Text>
          </View>

          {/* Payment + Fee area updated:
              - Payment label + "Card" below it
              - Fee area uses row layout (icon + $150) */}
          <View style={styles.col}>
            <View style={styles.paymentBlock}>
              <View>
                <Text style={styles.smallLabel}>Payment</Text>
                <Text style={styles.colValue}>Card</Text>
              </View>

              <View style={styles.feeRowRight}>
                {/* optional fee icon */}
                {/* <Image source={IMG_FEE} style={styles.feeIcon} resizeMode="contain" /> */}
                <Text style={styles.smallLabel}>Fee</Text>
                <Text style={styles.fee}>  $150</Text>
              </View>
            </View>
          </View>
        </View>

        <Text style={[styles.smallLabel, { marginTop: 10, marginLeft:10 }]}>Pickup image(s)</Text>
        <View style={styles.imagesRow}>
          <View style={styles.imagePlaceholder} />
          <View style={styles.imagePlaceholder} />
        </View>

        <Text style={[styles.smallLabel, { marginTop: 14 , marginLeft:10}]}>Delivery image(s)</Text>
        <View style={styles.imagesRow}>
          <View style={styles.imagePlaceholder} />
          <View style={styles.imagePlaceholder} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  header: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: { fontSize: 20, fontWeight: "700", color: "#222" },

  profileRow: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  profileImage: { width: 62, height: 62, borderRadius: 40, backgroundColor: "#eee", borderWidth: 1, borderColor: "#eee" },
  bgIcon: { /* kept for any shared styles if required */ },

  driverName: { fontSize: 16, fontWeight: "700" },
  small: { color: "#7D8A88" },
  ratingText: { color: "#7D8A88", marginLeft: 6 },

  rightBadge: {
    backgroundColor: "#2E7D32",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    flexDirection:"row"
  },
  completedText: { color: "#fff", fontWeight: "600" },

  infoBox: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginTop: 18,
  },

  row: { flexDirection: "row", alignItems: "flex-start" },

  /* replaced dot / line views with image-based column */
  dotCol: {
    width: 36,
    alignItems: "center",
    marginRight: 12,
    justifyContent: "flex-start",
  },
  dotImage: {
    width: 16,
    height: 16,
    marginVertical: 4,
  },
  smallGreenDot: {
    width: 8,
    height: 8,
    marginVertical: 0,
    alignSelf: "center",
  },

  /* star row image */
  starRow: {
    width: 22,
    height: 16,
  },
 Bike: {
    width: 32,
    height: 36,
    marginLeft:2
  },

  arrowImage: {
    width: 22,
    height: 22,
  },

  label: { color: "#9DA9A6", fontSize: 13 },
  locationText: { fontSize: 15, fontWeight: "600", color: "#233634", marginTop: 4 },

  twoCol: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 18,
    justifyContent: "space-between",
  },
  col: { width: "48%", marginBlock:10 },

  smallLabel: { color: "#9DA9A6", fontSize: 13 },
  colValue: { fontSize: 15, color: "#233634", marginTop: 6 },

  /* Payment + Fee updated styles */
  paymentBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  feeRowRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  feeIcon: { width: 18, height: 18, marginRight: 6 },
  fee: { fontSize: 20, fontWeight: "800", color: "#0B8A79" },

  imagesRow: { flexDirection: "row", paddingHorizontal: 20, marginTop: 8 },
  imagePlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 8,
    backgroundColor: "#EDEDED",
    marginRight: 12,
  },
});
