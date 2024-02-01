import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import React from "react";
import Spacer from "@components/Spacer";
import colors from "@utils/colors";
type Props = {
  visible: boolean;
  onCancel: () => void;
  children: React.ReactNode | React.ReactElement;
  center?: boolean;
};
const ModalPopUp = ({ visible, onCancel, children, center }: Props) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onCancel}
      transparent
      statusBarTranslucent
    >
      <Pressable
        style={{ flex: 1, backgroundColor: "#00000099" }}
        onPress={onCancel}
      >
        {center ? (
          <View style={styles.center}>
            <View style={styles.centerChild}>{children}</View>
          </View>
        ) : (
          <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={styles.end}>
              <Spacer height={15} />
              {children}
            </View>
          </KeyboardAvoidingView>
        )}
      </Pressable>
    </Modal>
  );
};

export default ModalPopUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  centerChild: {
    backgroundColor: colors.white,
    width: "90%",
    borderRadius: 24,
  },
  end: {
    backgroundColor: colors.white,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    paddingBottom: 24,
    width: "100%",
  },
});
