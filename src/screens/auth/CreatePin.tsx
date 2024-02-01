import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import Container from "@components/Container";
import Loader from "@components/Loader";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spacer from "@components/Spacer";
import textStyle from "@utils/textStyle";
import CustomInputs from "@components/Inputs";
import Buttons from "@components/Buttons";
import ModalPopUp from "@components/Modal";
import { Ionicons } from "@expo/vector-icons";
import { decode } from "@utils/functions";
import { UserType } from "types/types";
import { Context } from "context/AppState";

const CreatePin = () => {
  const { setUser } = useContext(Context);
  const { navigate } = useNavigation();
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const condition = Boolean(pin.length < 4 || confirmPin !== pin);

  const navigateOut = () => {
    setModal(false);
    setTimeout(() => {
      navigate("Home");
    }, 400);
  };

  const makeApiCall = async () => {
    setLoading(true);
    /**
     * This function gets the user details, decodes it and adds the pin
     * which is been saved back to AsyncStorage
     *
     */
    const res = await AsyncStorage.getItem("user");
    const body = JSON.stringify({ ...decode<UserType>(res), pin });
    setUser({ ...decode<UserType>(res), pin });
    const walletData = JSON.stringify({
      balance: 0,
    });
    /**
     * this is for creating a new user with default transaction and wallet
     */
    await AsyncStorage.setItem("user", body);
    await AsyncStorage.setItem("wallet", walletData);
    await AsyncStorage.setItem("transaction", JSON.stringify([]));

    setTimeout(() => {
      setLoading(false);
      setModal(true);
    }, 2000);
  };
  return (
    <Container.Keyboard>
      <Loader visible={loading} />
      <ScrollView style={{ flex: 1 }} keyboardDismissMode="on-drag">
        <Spacer height={50} />
        <Text style={[textStyle.defaultBold28]}>Set your Pin</Text>
        <Spacer height={5} />
        <Text style={textStyle.defaultRegular12}>
          Create 4 digit pin used to login and make transactions
        </Text>

        <Spacer height={50} />
        <CustomInputs.Password
          label="Your pin"
          value={pin}
          onChangeText={setPin}
          isSuccess={pin.length > 3}
          length={4}
          keyboardType="numeric"
        />
        <CustomInputs.Password
          label="Confirm pin"
          value={confirmPin}
          onChangeText={setConfirmPin}
          topMargin={10}
          isSuccess={confirmPin === pin}
          length={4}
          keyboardType="numeric"
        />
      </ScrollView>
      <Buttons onPress={makeApiCall} disable={condition}>
        Continue
      </Buttons>
      <ModalPopUp visible={modal} onCancel={navigateOut} center>
        <View style={{ padding: 20, alignItems: "center" }}>
          <Ionicons name="checkmark-circle" color="#009900" size={50} />
          <Spacer height={20} />
          <Text style={[textStyle.defaultBold17, { textAlign: "center" }]}>
            Password Set
          </Text>
          <Spacer height={20} />
          <Text style={[textStyle.defaultRegular15, { textAlign: "center" }]}>
            Your password has been set, click button to continue
          </Text>

          <Spacer height={20} />
          <Buttons onPress={navigateOut}>Continue</Buttons>
        </View>
      </ModalPopUp>
    </Container.Keyboard>
  );
};

export default CreatePin;

const styles = StyleSheet.create({});
