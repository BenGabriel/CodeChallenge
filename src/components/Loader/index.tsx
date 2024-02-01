import { ActivityIndicator, StyleSheet, Modal, View } from "react-native";
import React from "react";

type Props = {
  visible: boolean;
};
const Loader = ({ visible }: Props) => {
  return (
    <Modal
      style={styles.loader}
      visible={visible}
      animationType="slide"
      transparent
    >
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000099",
  },
});
