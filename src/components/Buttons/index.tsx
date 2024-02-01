import React from "react";
import { Text, TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import colors from "@utils/colors";

type Props = {
  children: string;
  onPress?: () => void;
  style?: ViewStyle;
  disable?: boolean;
};

const Buttons: React.FC<Props> = ({ children, onPress, style, disable }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.wideBtn, { opacity: disable ? 0.5 : 1 }, style]}
      disabled={disable}
    >
      <Text style={styles.wideBtnText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wideBtn: {
    width: "100%",
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.black,
  },
  wideBtnText: {
    fontWeight: "bold",
    fontSize: 14,
    color: colors.white,
  },
});

export default Buttons;
