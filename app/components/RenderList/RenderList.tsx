import { RenderListProps } from "@/interfaces";
import React from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import styles from "../../screens/Home/styles";
import UserItem from "../UserItem/UserItem";

const RenderList = ({
  loading,
  refreshing,
  tab,
  listData,
  emptyMessage,
  loadingMore,
  onRefresh,
  handleScrollEnd,
  onUserPress,
  isFavoriteCallback,
}: RenderListProps) => {
  if (loading && !refreshing && tab === "usuarios" && listData.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const renderListItem = ({
    item,
  }: {
    item: RenderListProps["listData"][0];
  }) => (
    <UserItem
      key={item.id}
      user={item}
      onPress={() => onUserPress(item)}
      isFavorite={isFavoriteCallback(item.id)}
    />
  );

  const keyExtractor = (item: RenderListProps["listData"][0]) =>
    item.id.toString();

  const listFooterComponent = () => {
    if (loadingMore && tab === "usuarios") {
      return (
        <View style={styles.loadMoreContainer}>
          <ActivityIndicator size="small" />
        </View>
      );
    }
    return null;
  };

  const listEmptyComponent = () => {
    if (loading || refreshing) {
      return null;
    }
    return (
      <View style={styles.noResultsContainer}>
        <Text style={styles.noResultsText}>{emptyMessage}</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={listData}
      renderItem={renderListItem}
      keyExtractor={keyExtractor}
      style={styles.scrollView}
      onEndReached={tab === "usuarios" ? handleScrollEnd : undefined}
      onEndReachedThreshold={0.5}
      refreshControl={
        tab === "usuarios" ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#1976d2"]}
            tintColor={"#1976d2"}
          />
        ) : undefined
      }
      ListFooterComponent={listFooterComponent}
      ListEmptyComponent={listEmptyComponent}
    />
  );
};

export default RenderList;
