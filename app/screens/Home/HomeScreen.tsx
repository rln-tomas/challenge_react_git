import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useCallback, useState } from "react";
import { View } from "react-native";
import { BottomNavigation } from "react-native-paper";

import { useFavorites } from "@/context/FavoritesContext";
import { useGithubUsers } from "@/hooks/useGithubUsers";
import { GitHubUser } from "@/interfaces";
import Appbar from "../../components/Appbar/Appbar";
import RenderIcon from "../../components/RenderIcon/RenderIcon";
import RenderLabel from "../../components/RenderLabel/RenderLabel";
import RenderList from "../../components/RenderList/RenderList";
import { RootStackParamList } from "../../navigation/types";
import styles from "./styles";

export default function HomeScreen() {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchTimeout, setSearchTimeout] = useState<number | null>(null);
  const [tab, setTab] = useState<"usuarios" | "favoritos">("usuarios");
  const [refreshing, setRefreshing] = useState(false);

  const {
    users,
    loading,
    loadingMore,
    isSearchMode,
    hasMoreResults,
    handleSearch,
    loadMoreUsers,
    resetSearch,
    reloadData,
  } = useGithubUsers();

  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "Home">>();
  const { isFavorite, favorites } = useFavorites();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (tab === "usuarios") {
      await reloadData();
    }
    setRefreshing(false);
  }, [reloadData, tab]);

  const handleScrollEnd = () => {
    if (hasMoreResults && !loading && !loadingMore && tab === "usuarios") {
      loadMoreUsers();
    }
  };

  const handleUserPress = (user: GitHubUser) => {
    navigation.navigate("UserDetail", { username: user.login });
  };

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    if (tab === "usuarios") {
      const timeoutId = setTimeout(() => {
        handleSearch(query);
      }, 1000);
      setSearchTimeout(timeoutId);
    }
  };

  const toggleSearch = () => {
    if (tab !== "usuarios") return;

    const newShowSearch = !showSearch;
    setShowSearch(newShowSearch);
    if (!newShowSearch) {
      setSearchQuery("");
      resetSearch();
    }
  };

  const currentList = tab === "usuarios" ? users : favorites;
  const emptyListMessage =
    currentList.length === 0
      ? tab === "usuarios"
        ? isSearchMode
          ? "No se encontraron resultados"
          : "No hay usuarios disponibles"
        : "No tienes usuarios favoritos"
      : "";

  return (
    <View style={styles.container}>
      <Appbar
        title={tab === "usuarios" ? "Usuarios" : "Favoritos"}
        showSearch={showSearch && tab === "usuarios"}
        searchQuery={searchQuery}
        onChangeSearch={onChangeSearch}
        toggleSearch={toggleSearch}
        showSearchAction={tab === "usuarios"}
      />
      <View style={styles.contentContainer}>
        <RenderList
          loading={loading}
          refreshing={refreshing}
          tab={tab}
          listData={currentList}
          emptyMessage={emptyListMessage}
          loadingMore={loadingMore}
          onRefresh={onRefresh}
          handleScrollEnd={handleScrollEnd}
          onUserPress={handleUserPress}
          isFavoriteCallback={isFavorite}
        />
      </View>
      <BottomNavigation.Bar
        navigationState={{
          index: tab === "usuarios" ? 0 : 1,
          routes: [
            { key: "usuarios", title: "Usuarios" },
            { key: "favoritos", title: "Favoritos" },
          ],
        }}
        renderIcon={(props) => <RenderIcon {...props} />}
        renderLabel={(props) => <RenderLabel {...props} />}
        onTabPress={({ route, preventDefault }) => {
          if (route.key === "usuarios") {
            setTab("usuarios");
          } else if (route.key === "favoritos") {
            setTab("favoritos");
            if (showSearch) {
              setShowSearch(false);
            }
          }
        }}
      />
    </View>
  );
}
