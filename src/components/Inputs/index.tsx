import {
  KeyboardType,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React, { useState } from "react";
import Spacer from "@components/Spacer";
import colors from "@utils/colors";
import textStyle from "@utils/textStyle";
import { Ionicons } from "@expo/vector-icons";
import { appStyle } from "@utils/styles";

type InputType = "Text" | "Password";

type Props = {
  style?: ViewStyle;
  label?: string;
  inputProps?: TextInputProps;
  onChangeText?: (value: string) => void;
  value?: string;
  keyboardType?: KeyboardType;
  editable?: boolean;
  length?: number;
  placeholder?: string;
  error?: string;
  topMargin?: number;
  multiline?: boolean;
  isSuccess?: boolean;
};

const CustomInputs: Record<InputType, React.FC<Props>> = {
  Text: ({
    label,
    inputProps,
    onChangeText,
    value,
    keyboardType,
    editable,
    style,
    length,
    placeholder,
    error,
    topMargin,
    multiline,
    isSuccess,
  }) => {
    const [focused, setFocused] = useState(false);
    return (
      <View style={{ marginTop: topMargin }}>
        {label && (
          <>
            <Text style={[textStyle.defaultRegular14, { fontWeight: "600" }]}>
              {label}
            </Text>
            <Spacer height={10} />
          </>
        )}
        <TextInput
          style={[
            styles.textInput,
            focused && styles.borderFocused,
            isSuccess && styles.borderFocused,
            error !== undefined && styles.borderError,
            style,
          ]}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          keyboardType={keyboardType}
          maxLength={length}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          editable={editable}
          {...inputProps}
          multiline={multiline}
          cursorColor={colors.black}
        />
        <Spacer height={7} />
        {error && (
          <Text style={[textStyle.defaultRegular12, { color: colors.error }]}>
            {error}
          </Text>
        )}
      </View>
    );
  },
  Password: ({
    label,
    inputProps,
    onChangeText,
    value,
    placeholder,
    error,
    style,
    topMargin,
    length,
  }) => {
    const [focused, setFocused] = useState(false);
    const [secureTextEntry, setSecurityEntry] = useState(true);
    return (
      <View style={{ marginTop: topMargin }}>
        {label && (
          <>
            <Text style={[textStyle.defaultRegular14, { fontWeight: "600" }]}>
              {label}
            </Text>
            <Spacer height={10} />
          </>
        )}
        <View
          style={[
            styles.passwordInput,
            focused && styles.borderFocused,
            error !== undefined && styles.borderError,
            style,
          ]}
        >
          <TextInput
            style={styles.otherInput}
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={value}
            secureTextEntry={secureTextEntry}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            {...inputProps}
            cursorColor={colors.black}
            maxLength={length}
          />

          <TouchableOpacity onPress={() => setSecurityEntry(!secureTextEntry)}>
            {secureTextEntry ? (
              <Ionicons name="eye-off-outline" size={18} />
            ) : (
              <Ionicons name="eye-outline" size={18} />
            )}
          </TouchableOpacity>
        </View>
        <Spacer height={7} />
        {error && (
          <Text style={[textStyle.defaultRegular12, { color: colors.error }]}>
            {error}
          </Text>
        )}
      </View>
    );
  },
};

export default CustomInputs;

const styles = StyleSheet.create({
  borderFocused: {
    borderColor: colors.black,
  },

  borderError: {
    borderColor: colors.error,
  },
  textInput: {
    width: "100%",
    height: 50,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.gray,
    ...textStyle.defaultRegular14,
  },

  passwordInput: {
    width: "100%",
    height: 50,
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.gray,
    ...appStyle.flexRowSpaceCenter,
  },
  otherInput: {
    ...textStyle.defaultRegular14,
    flex: 1,
    height: 45,
    marginRight: 3,
  },
});
