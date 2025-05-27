import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

interface RenderIconProps {
  route: { key: string };
  focused: boolean;
  color: string;
}

const RenderIcon = ({ route, focused, color }: RenderIconProps) => {
  const iconSize = 26;
  let iconName: keyof typeof MaterialCommunityIcons.glyphMap = "help-circle";

  if (route.key === "usuarios") {
    iconName = "account-group";
  } else if (route.key === "favoritos") {
    iconName = "star";
  }

  return (
    <MaterialCommunityIcons
      name={iconName}
      size={iconSize}
      color={focused ? "#1976d2" : color}
    />
  );
};

export default RenderIcon;
