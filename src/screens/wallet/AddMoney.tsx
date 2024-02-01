import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import Container from "@components/Container";
import Header from "@components/Header";
import Spacer from "@components/Spacer";
import CustomInputs from "@components/Inputs";
import Buttons from "@components/Buttons";
import textStyle from "@utils/textStyle";
import ModalPopUp from "@components/Modal";
import { appStyle } from "@utils/styles";
import Loader from "@components/Loader";
import { Context } from "context/AppState";
import { schedulePushNotification } from "@utils/functions";

const AddMoney = ({ navigation }) => {
  const { addToTransaction, addToWallet } = useContext(Context);
  const [amount, setamount] = useState("");
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const makeApiCall = async () => {
    setModal(false);
    setLoading(true);
    addToWallet(amount);
    const data = {
      accountName: "Flutterwave",
      accountNumber: "1223456757",
      amount,
      bank: "Flutterwave",
      type: "debit",
      date: Date.now(),
    };

    addToTransaction(data);
    schedulePushNotification({
      title: "Transaction complete",
      body: `You added ${amount} to your account`,
      data: "Done",
    });
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("PaymentSuccess");
    }, 2000);
  };
  return (
    <Container.Keyboard>
      <Loader visible={loading} />
      <Header name="Add money" />
      <Spacer height={10} />
      <Text style={textStyle.defaultRegular12}>
        Add money to your CtyPay wallet
      </Text>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardDismissMode="on-drag"
      >
        <Spacer height={40} />
        <CustomInputs.Text
          keyboardType="number-pad"
          value={amount}
          onChangeText={setamount}
          label="Amount"
        />
        <Spacer flex={1} />
        <Buttons disable={amount.length < 3} onPress={() => setModal(true)}>
          Continue
        </Buttons>
      </ScrollView>
      <ModalPopUp visible={modal} onCancel={() => setModal(false)} center>
        <View style={{ padding: 20, width: "100%" }}>
          <Text style={textStyle.defaultBold16}>
            Enter your bank card details
          </Text>
          <Spacer height={30} />
          <CustomInputs.Text
            label="Card number"
            value="5555-5555-5555-5555"
            editable={false}
          />

          <Spacer height={20} />
          <View style={appStyle.flexRowSpaceCenter}>
            <CustomInputs.Text
              label="CVV"
              value="111"
              editable={false}
              style={{ width: 100 }}
            />
            <CustomInputs.Text
              label="Exp date"
              value="11/03"
              editable={false}
              style={{ width: 100 }}
            />
          </View>

          <Spacer height={40} />
          <Buttons onPress={makeApiCall}>Add money</Buttons>
        </View>
      </ModalPopUp>
    </Container.Keyboard>
  );
};

export default AddMoney;

const styles = StyleSheet.create({});
