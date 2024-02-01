import { StyleSheet } from "react-native";
import colors from "./colors";

export const appStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },
  flexRowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  flexRowSelfCenter: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  flexRowSpaceCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  flexCenterAll: {
    alignItems: "center",
    justifyContent: "center",
  },

  shadow: {
    shadowColor: "#555",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
});
