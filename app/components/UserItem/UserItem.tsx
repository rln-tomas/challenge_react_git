import { UserItemProps } from "@/interfaces";
import React from "react";
import { View } from "react-native";
import { Avatar, Divider, IconButton, List } from "react-native-paper";

const UserItem = ({ user, onPress, isFavorite = false }: UserItemProps) => {
  return (
    <View>
      <List.Item
        title={user.login}
        description={user.type}
        left={(props) => (
          <Avatar.Image
            size={40}
            source={{ uri: user.avatar_url }}
            style={props.style}
          />
        )}
        right={(props) => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {isFavorite && (
              <IconButton
                icon="star"
                size={20}
                iconColor="#FFD700"
                style={{ margin: 0 }}
              />
            )}
            <List.Icon {...props} icon="chevron-right" />
          </View>
        )}
        onPress={() => onPress(user)}
      />
      <Divider />
    </View>
  );
};

export default UserItem;
