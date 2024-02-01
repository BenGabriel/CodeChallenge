import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TransactionType } from "types/types";
import { Ionicons } from "@expo/vector-icons";
import { appStyle } from "@utils/styles";
import Spacer from "@components/Spacer";
import textStyle from "@utils/textStyle";
import dayjs from "dayjs";
import { formatAmount } from "@utils/functions";
type Props = {
  item: TransactionType;
};
const TransactionItem = ({ item }: Props) => {
  return (
    <View style={[appStyle.flexRowCenter, { marginBottom: 20 }]}>
      <View
        style={[
          styles.icon,
          {
            backgroundColor: item?.type === "debit" ? "#00FF0022" : "#FB418022",
          },
        ]}
      >
        <Ionicons
          name={item?.type === "debit" ? "arrow-down" : "arrow-up"}
          size={16}
          color={item?.type === "debit" ? "green" : "red"}
        />
      </View>
      <View>
        <Text style={textStyle.defaultBold14}>{item?.accountName}</Text>
        <Spacer height={5} />
        <Text style={textStyle.defaultRegular11}>
          {dayjs(item?.date).format("MMM D YYYY: hh:mm a")}
        </Text>
      </View>
      <Spacer flex={1} />
      <Text style={textStyle.defaultRegular12}>
        ₦{formatAmount(item?.amount)}
      </Text>
    </View>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  icon: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginRight: 7,
  },
});
