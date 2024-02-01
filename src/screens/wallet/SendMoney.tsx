import { ScrollView, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Container from "@components/Container";
import Header from "@components/Header";
import CustomInputs from "@components/Inputs";
import Spacer from "@components/Spacer";
import DropdownComponent, {
  DropDownType,
} from "@components/DropDowns/DropDown";
import Loader from "@components/Loader";
import Buttons from "@components/Buttons";
import { useNavigation } from "@react-navigation/native";
import ModalPopUp from "@components/Modal";
import textStyle from "@utils/textStyle";
import PinInput from "@components/Otp/PinInput";
import { Context } from "context/AppState";
import { schedulePushNotification } from "@utils/functions";
import Error from "@components/Error";

const options: DropDownType[] = [
  {
    label: "Access",
    value: "Access",
  },
  {
    label: "Kuda",
    value: "Kuda",
  },
  {
    label: "CtyPay",
    value: "CtyPay",
  },
];
const SendMoney = () => {
  const { navigate } = useNavigation<any>();
  const { removeFromWallet, addToTransaction, user } = useContext(Context);
  const [accountNumber, setAccountNumber] = useState("");
  const [bank, setBank] = useState<DropDownType | undefined>(options[0]);
  const [accountName, setAccountName] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [pin, setPin] = useState("");
  const [pinModal, setPinModal] = useState(false);
  const [error, setError] = useState("");

  // select bank
  const selectBank = (value: DropDownType) => {
    setBank(value);
    setLoading(true);
    setTimeout(() => {
      setAccountName("John Doe");
      setLoading(false);
    }, 3000);
  };

  const condition = Boolean(
    accountNumber.length < 10 || accountName === "" || amount.length < 3
  );

  useEffect(() => {
    if (pin.length === 4) {
      makeApiCall();
    }
  }, [pin]);
  const navigateOut = () => {
    setModal(true);
  };

  const openPin = () => {
    setModal(false);
    setPinModal(true);
  };
  const makeApiCall = async () => {
    setPinModal(false);

    const data = {
      accountName,
      accountNumber,
      amount,
      bank: bank?.value,
      type: "withdraw",
      date: Date.now(),
    };

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (user.pin !== pin) {
        return setError("invalidPin");
      }

      addToTransaction(data);
      removeFromWallet(amount);
      schedulePushNotification({
        title: "Transaction complete",
        body: `You sent ${amount} to ${accountName}`,
        data: "Done",
      });
      setPin("");
      navigate("PaymentSuccess");
    }, 3000);
  };

  return (
    <Container.Keyboard>
      <Header name="Send money" />
      <Loader visible={loading} />
      <ScrollView keyboardDismissMode="on-drag">
        <Spacer height={40} />
        <CustomInputs.Text
          label="Account Number"
          keyboardType="number-pad"
          onChangeText={setAccountNumber}
          length={11}
        />
        <Spacer height={10} />
        <DropdownComponent
          options={options}
          onSelect={selectBank}
          label="Select Bank"
          value={bank?.value}
          dropDownProps={{
            disable: accountNumber.length < 10,
          }}
        />
        <CustomInputs.Text
          label="Account Name"
          topMargin={10}
          editable={false}
          value={accountName}
        />
        <CustomInputs.Text
          label="Amount"
          topMargin={10}
          keyboardType="number-pad"
          onChangeText={setAmount}
        />
      </ScrollView>
      <Buttons onPress={navigateOut} disable={condition}>
        Continue
      </Buttons>
      {error && <Error value={error} setError={setError} />}
      <ModalPopUp visible={modal} onCancel={() => setModal(false)}>
        <View style={{ padding: 20, alignItems: "center" }}>
          <Text style={textStyle.defaultRegular14}> You are about to send</Text>
          <Spacer height={15} />
          <Text style={textStyle.defaultBold18}>₦{amount}</Text>
          <Spacer height={15} />
          <Text style={textStyle.defaultRegular14}>to</Text>
          <Spacer height={15} />
          <Text style={textStyle.defaultBold18}>
            {accountName} - {bank?.value}
          </Text>
          <Spacer height={40} />
          <Buttons onPress={openPin}>Pay</Buttons>
        </View>
      </ModalPopUp>
      <ModalPopUp visible={pinModal} onCancel={() => setPinModal(false)}>
        <View style={{ padding: 20 }}>
          <Text style={[textStyle.defaultBold17, { textAlign: "center" }]}>
            Enter PIN
          </Text>

          <Spacer height={20} />
          <PinInput setPin={setPin} />
        </View>
      </ModalPopUp>
    </Container.Keyboard>
  );
};

export default SendMoney;
