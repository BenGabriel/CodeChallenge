import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Container from "@components/Container";
import { Ionicons } from "@expo/vector-icons";
import Spacer from "@components/Spacer";
import textStyle from "@utils/textStyle";
import Buttons from "@components/Buttons";
import { useNavigation } from "@react-navigation/native";

const PaymentSuccess = () => {
  const { navigate } = useNavigation();
  const navigateOut = () => {
    navigate("Home");
  };
  return (
    <Container.Normal
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <Ionicons name="checkmark-circle" color="#009900" size={70} />
      <Spacer height={20} />
      <Text style={[textStyle.defaultBold17, { textAlign: "center" }]}>
        Transaction Completed
      </Text>

      <Spacer height={70} />
      <Buttons onPress={navigateOut}>Continue</Buttons>
    </Container.Normal>
  );
};

export default PaymentSuccess;

const styles = StyleSheet.create({});
