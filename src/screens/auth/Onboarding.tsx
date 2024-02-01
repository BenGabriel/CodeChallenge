import { Image, StyleSheet, Text } from "react-native";
import React from "react";
import Container from "@components/Container";
import textStyle from "@utils/textStyle";
import Spacer from "@components/Spacer";
import { appStyle } from "@utils/styles";
import Buttons from "@components/Buttons";
import { useNavigation } from "@react-navigation/native";

const Onboarding = () => {
  const { navigate } = useNavigation<any>();
  return (
    <Container.Normal style={appStyle.flexCenterAll}>
      <Image
        source={require("../../assets/images/cty.png")}
        style={styles.image}
      />

      <Spacer height={20} />
      <Text style={[textStyle.defaultBold24]}>CtyPay app the safest</Text>
      <Spacer height={20} />
      <Text style={styles.text}>
        Your finance work starts here, we are here to help you track and deal
        with speeding up your transaction
      </Text>
      <Spacer height={50} />
      <Buttons style={{ width: "90%" }} onPress={() => navigate("Register")}>
        Get started
      </Buttons>
    </Container.Normal>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
    alignSelf: "center",
  },
  text: {
    ...textStyle.defaultRegular16,
    textAlign: "center",
    width: "80%",
  },
});
