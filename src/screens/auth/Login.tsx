import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Buttons from "@components/Buttons";
import Container from "@components/Container";
import Loader from "@components/Loader";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spacer from "@components/Spacer";
import textStyle from "@utils/textStyle";
import CustomInputs from "@components/Inputs";
import { appStyle } from "@utils/styles";
import { decode } from "@utils/functions";
import Error from "@components/Error";
import { UserType } from "types/types";
import { Context } from "context/AppState";
import { Ionicons } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";

const Login = () => {
  const { setUser, user, getUser } = useContext(Context);
  const { navigate } = useNavigation();
  const [pin, setPin] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const condition = Boolean(phone.length < 10 || pin.length < 4);

  useEffect(() => {
    getUser();
  }, []);

  /**
   * Performs the login for the application
   */
  const makeApiCall = async () => {
    setLoading(true);
    const res = await AsyncStorage.getItem("user");
    const data = decode<UserType>(res);

    setTimeout(() => {
      setLoading(false);
      if (res === null) {
        return setError("Not a user");
      }
      if (data?.phone !== phone || data?.pin !== pin) {
        setError("Invalid Credentials");
      } else {
        setUser(data);
        navigate("Home");
      }
    }, 3000);
  };

  /**
   * For Biometrics
   */
  const pressFinger = async () => {
    try {
      const res = await LocalAuthentication.authenticateAsync();
      if (res.success) {
        navigate("Home");
      }
    } catch (error) {
      setError("Error loading your finger print");
    }
  };

  return (
    <Container.Keyboard>
      <Loader visible={loading} />
      <ScrollView style={{ flex: 1 }} keyboardDismissMode="on-drag">
        <Spacer height={50} />
        <Text style={[textStyle.defaultBold28]}>Login to</Text>
        <Text style={[textStyle.defaultBold28]}>CtyPay</Text>

        <Spacer height={50} />

        <CustomInputs.Text
          label="Phone Number"
          value={phone}
          onChangeText={setPhone}
          length={11}
          isSuccess={phone.length > 10}
          keyboardType="number-pad"
        />
        <CustomInputs.Password
          label="Pin"
          value={pin}
          onChangeText={setPin}
          length={4}
          keyboardType="number-pad"
          isSuccess={pin.length > 3}
          topMargin={10}
        />
        <Spacer height={10} />
        <View style={[appStyle.flexRowSelfCenter]}>
          <Text style={textStyle.defaultRegular14}>
            Don't have an account?{" "}
          </Text>
          <Text
            style={textStyle.defaultBold14}
            onPress={() => navigate("Register")}
          >
            Register
          </Text>
        </View>

        <Spacer height={50} />
        {user !== null && (
          <Pressable
            style={{ alignSelf: "flex-end", marginRight: 20 }}
            onPress={pressFinger}
          >
            <Ionicons name="finger-print" size={40} />
          </Pressable>
        )}
      </ScrollView>
      {error && <Error value={error} setError={setError} />}
      <Buttons onPress={makeApiCall} disable={condition}>
        Login
      </Buttons>
    </Container.Keyboard>
  );
};

export default Login;

const styles = StyleSheet.create({});
