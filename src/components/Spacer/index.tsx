import React from "react";
import { View } from "react-native";

type Props = {
  height?: number;
  width?: number;
  flex?: number;
};

const Spacer: React.FC<Props> = ({ height, width, flex }) => {
  return <View style={{ height, width, flex }} />;
};

export default React.memo(Spacer);
