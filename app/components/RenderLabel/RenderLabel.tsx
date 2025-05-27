import { RenderLabelProps } from "@/interfaces";
import React from "react";
import { Text } from "react-native";

const RenderLabel = ({ route, focused, color }: RenderLabelProps) => {
  return (
    <Text
      style={{
        fontSize: 12,
        fontWeight: focused ? "bold" : "normal",
        color: focused ? "#1976d2" : color,
        textAlign: "center",
      }}
    >
      {route.title}
    </Text>
  );
};

export default RenderLabel;
