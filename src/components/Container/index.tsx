import {
  KeyboardAvoidingView,
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { appStyle } from "@utils/styles";

type ContainerType = "Normal" | "Keyboard" | "Scroll";
type Props = {
  children: React.ReactElement | React.ReactNode;
  style?: ViewStyle;
  props?: ScrollViewProps;
};
const Container: Record<ContainerType, React.FC<Props>> = {
  Normal: ({ children, style }) => {
    return <View style={[appStyle.container, style]}>{children}</View>;
  },
  Keyboard: ({ children, style }) => {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={[appStyle.container, style]}
      >
        {children}
      </KeyboardAvoidingView>
    );
  },
  Scroll: ({ children, style, props }) => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[appStyle.container, style]}
        keyboardDismissMode="on-drag"
        {...props}
      >
        {children}
      </ScrollView>
    );
  },
};

export default Container;

const styles = StyleSheet.create({});
