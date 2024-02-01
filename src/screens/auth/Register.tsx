import { ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Container from "@components/Container";
import Spacer from "@components/Spacer";
import textStyle from "@utils/textStyle";
import CustomInputs from "@components/Inputs";
import Buttons from "@components/Buttons";
import ModalPopUp from "@components/Modal";
import PinInput from "@components/Otp/PinInput";
import Loader from "@components/Loader";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { appStyle } from "@utils/styles";

const Register = () => {
  const { navigate } = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const emailRegex = RegExp(
    /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
  );

  const condition =
    Boolean(name.split(" ")[1] === undefined || name.split(" ")[1] === "") ||
    !emailRegex.test(email) ||
    phone.length < 11;

  useEffect(() => {
    if (otp.length === 4) {
      makeApiCall();
    }
  }, [otp]);

  /**
   * Saves users name, email and phone number to local storage
   */
  const makeApiCall = async () => {
    setModal(false);
    setTimeout(() => {
      setLoading(true);
    }, 500);
    const data = JSON.stringify({
      name,
      email,
      phone,
    });
    await AsyncStorage.setItem("user", data);

    setOtp("");
    setTimeout(() => {
      setLoading(false);
      navigate("CreatePin");
    }, 2000);
  };
  return (
    <Container.Keyboard>
      <Loader visible={loading} />
      <ScrollView style={{ flex: 1 }} keyboardDismissMode="on-drag">
        <Spacer height={50} />
        <Text style={[textStyle.defaultBold28]}>Create your</Text>
        <Text style={[textStyle.defaultBold28]}>Account</Text>

        <Spacer height={50} />
        <CustomInputs.Text
          label="Full Name"
          value={name}
          onChangeText={setName}
          isSuccess={
            name.split(" ")[1] !== undefined || name.split(" ")[1] === ""
          }
        />
        <CustomInputs.Text
          label="Email"
          value={email}
          onChangeText={setEmail}
          topMargin={10}
          isSuccess={emailRegex.test(email)}
        />
        <CustomInputs.Text
          label="Phone Number"
          value={phone}
          onChangeText={setPhone}
          topMargin={10}
          length={11}
          isSuccess={phone.length > 10}
          keyboardType="number-pad"
        />
        <Spacer height={10} />
        <View style={[appStyle.flexRowSelfCenter]}>
          <Text style={textStyle.defaultRegular14}>Already have account? </Text>
          <Text
            style={textStyle.defaultBold14}
            onPress={() => navigate("Login")}
          >
            Login
          </Text>
        </View>
      </ScrollView>
      <Buttons onPress={() => setModal(true)} disable={condition}>
        Create account
      </Buttons>
      <ModalPopUp visible={modal} onCancel={() => setModal(false)}>
        <View style={{ padding: 20 }}>
          <Text style={[textStyle.defaultBold17, { textAlign: "center" }]}>
            Enter OTP
          </Text>
          <Spacer height={10} />
          <Text style={[textStyle.defaultRegular15, { textAlign: "center" }]}>
            An OTP has been sent to {phone}
          </Text>

          <Spacer height={20} />
          <PinInput setPin={setOtp} />
        </View>
      </ModalPopUp>
    </Container.Keyboard>
  );
};

export default Register;
