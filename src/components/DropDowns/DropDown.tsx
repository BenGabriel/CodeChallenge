import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import colors from "@utils/colors";
import Spacer from "@components/Spacer";
import { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";
import textStyle from "@utils/textStyle";

export type DropDownType = {
  label: string;
  value: string;
};
type DropDownProps = {
  options: DropDownType[];
  label?: string;
  placeholder?: string;
  onSelect: (val: DropDownType) => void;
  value: string;
  dropDownStyle?: ViewStyle;
  position?: "auto" | "top" | "bottom";
  dropDownProps?: DropdownProps<any>;
};

const DropdownComponent: React.FC<DropDownProps> = ({
  label,
  options,
  onSelect,
  placeholder,
  value = "",
  dropDownStyle,
  position = "auto",
  dropDownProps,
}) => {
  return (
    <View>
      <Text style={textStyle.defaultBold14}>{label}</Text>
      <Spacer height={6} />
      <Dropdown
        data={options}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        onChange={onSelect}
        style={[style.dropDown, dropDownStyle]}
        value={value}
        dropdownPosition={position}
        {...dropDownProps}
        itemTextStyle={{
          fontSize: 12,
          color: colors.black,
        }}
        selectedTextProps={{
          style: style.text,
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  dropDown: {
    borderRadius: 10,
    padding: 12,
    height: 55,
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(102, 112, 128, 0.40)",
    backgroundColor: colors.white,
  },
  text: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 20,
    color: colors.black,
  },
});

export default DropdownComponent;
