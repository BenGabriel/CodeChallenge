import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { NotificationType } from "types/types";

export function decode<T>(value: string): T {
  return JSON.parse(value);
}
export async function walletAction<T extends { balance: number }>(
  value: number,
  action: "add" | "sub"
): Promise<T> {
  const wallet = await AsyncStorage.getItem("wallet");
  let data = decode<T>(wallet);
  if (action === "add") {
    data.balance + value;
  } else {
    data.balance - value;
  }
  return data;
}

export const formatAmount = (n: number) => {
  const value = n.toString();
  let b = value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return b.toString();
};

//This is used for push notification
export async function schedulePushNotification({
  title,
  body,
  data,
}: NotificationType) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data: { data },
    },
    trigger: { seconds: 1 },
  });
}
