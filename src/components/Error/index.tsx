import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import textStyle from "@utils/textStyle";
type Props = {
  value: string;
  setError: (value: string) => void;
};
const Error = ({ value, setError }: Props) => {
  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 4000);
  }, []);
  return (
    <View style={styles.error}>
      <Text style={[textStyle.defaultRegular14, { color: "#944A05" }]}>
        {value}
      </Text>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({
  error: {
    backgroundColor: "#FFECDB",
    width: "100%",
    alignSelf: "center",
    padding: 20,
    borderRadius: 10,
    position: "absolute",
    bottom: 0,
    zIndex: 1000,
  },
});
