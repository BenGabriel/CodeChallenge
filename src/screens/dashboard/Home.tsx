import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { formatAmount } from "@utils/functions";
import Container from "@components/Container";
import Spacer from "@components/Spacer";
import textStyle from "@utils/textStyle";
import { Ionicons } from "@expo/vector-icons";
import { appStyle } from "@utils/styles";
import colors from "@utils/colors";
import TransactionItem from "@components/Card/TransactionItem";
import Error from "@components/Error";
import * as Notifications from "expo-notifications";
import { Context } from "context/AppState";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Home = ({ navigation: { navigate } }) => {
  const { user, getUser, fetchTransaction, transaction, wallet, fetchWallet } =
    useContext(Context);

  const [error, setError] = useState("");

  useEffect(() => {
    getUser();
    fetchWallet();
    fetchTransaction();
  }, []);

  const sendMoney = () => {
    if (wallet?.balance < 1) {
      setError("Insufficient funds add money");
    } else {
      navigate("SendMoney");
    }
  };

  const logout = async () => {
    navigate("Register");
  };
  return (
    <Container.Scroll
      props={{
        contentContainerStyle: {
          flexGrow: 1,
        },
      }}
    >
      <Spacer height={20} />
      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
        <Text style={[textStyle.defaultRegular14, { color: "#555555" }]}>
          Hello,{" "}
        </Text>
        <Text style={textStyle.defaultBold18}>{user?.name}</Text>
        <Spacer flex={1} />
        <Text style={textStyle.defaultBold14} onPress={logout}>
          Logout
        </Text>
      </View>

      <Spacer height={30} />
      <View style={appStyle.flexRowSpaceCenter}>
        <View style={styles.balance}>
          <Text style={textStyle.defaultBold12}>Current balance</Text>
          <Spacer height={5} />
          <Text style={textStyle.defaultBold16}>
            ₦ {formatAmount(wallet?.balance)}
          </Text>
          <Spacer flex={1} />
          <Image
            source={require("../../assets/images/card.png")}
            style={{ width: 40, height: 40 }}
          />
        </View>
        <View style={styles.action}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={[styles.actionItem, { backgroundColor: "#FFAA00" }]}
            onPress={() => navigate("AddMoney")}
          >
            <Ionicons name="arrow-down" size={18} color={colors.white} />
            <Spacer flex={1} />
            <Text style={[textStyle.defaultBold15, { color: colors.white }]}>
              Add Money
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            style={[styles.actionItem, { backgroundColor: "#FB4180" }]}
            onPress={sendMoney}
          >
            <Ionicons name="cash" size={18} color={colors.white} />
            <Spacer flex={1} />
            <Text style={[textStyle.defaultBold15, { color: colors.white }]}>
              Send Money
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Spacer height={70} />
      <Text style={textStyle.defaultBold15}>Transactions</Text>
      <Spacer height={20} />
      {transaction.length < 1 ? (
        <View style={{ alignSelf: "center" }}>
          <Spacer height={40} />
          <Image
            source={require("../../assets/images/noTrans.png")}
            style={{ width: 150, height: 150, resizeMode: "contain" }}
          />
          <Spacer height={20} />
          <Text style={[textStyle.defaultBold14, { color: "#484848" }]}>
            No Transactions yet
          </Text>
        </View>
      ) : (
        transaction.map((t) => <TransactionItem key={t.date} item={t} />)
      )}
      {error && <Error value={error} setError={setError} />}
    </Container.Scroll>
  );
};

export default Home;

const styles = StyleSheet.create({
  balance: {
    backgroundColor: "#C1EBA4",
    width: "50%",
    padding: 10,
    borderRadius: 10,
    height: 200,
    ...appStyle.shadow,
  },
  action: {
    width: "43%",
    justifyContent: "space-between",
    height: 200,
  },
  actionItem: {
    borderRadius: 10,
    height: "47%",
    padding: 15,
    ...appStyle.shadow,
  },
});
