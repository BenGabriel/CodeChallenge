import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { appStyle } from "@utils/styles";
import { useNavigation } from "@react-navigation/native";
import textStyle from "@utils/textStyle";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  name: string;
};

const Header = ({ name }: Props) => {
  const navigation = useNavigation<any>();
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={appStyle.flexRowSpaceCenter}>
      <TouchableOpacity style={styles.icon} onPress={goBack}>
        <Ionicons name="chevron-back" size={24} />
      </TouchableOpacity>
      <Text style={textStyle.defaultBold16}>{name}</Text>
      <View style={styles.icon} />
    </View>
  );
};

export default React.memo(Header);

const styles = StyleSheet.create({
  icon: {
    width: 44,
    height: 44,
    justifyContent: "center",
  },
});
