import { useFavorites } from "@/context/FavoritesContext";
import { UserDetailData } from "@/interfaces";
import { fetchUserDetailAPI } from "@/services/userService";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Linking, ScrollView, View } from "react-native";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  IconButton,
  Text,
} from "react-native-paper";
import { RootStackParamList } from "../../navigation/types";
import styles from "./styles";

export default function UserDetailScreen() {
  const route = useRoute<RouteProp<RootStackParamList, "UserDetail">>();
  const { username } = route.params;

  const [user, setUser] = useState<UserDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const isFavorite = user ? favorites.some((fav) => fav.id === user.id) : false;

  useEffect(() => {
    const loadUserDetail = async () => {
      if (!username) {
        setLoading(false);
        return;
      }
      setLoading(true);
      const userData = await fetchUserDetailAPI(username);
      setUser(userData);
      setLoading(false);
    };
    loadUserDetail();
  }, [username]);

  const toggleFavorite = () => {
    if (!user) return;

    if (isFavorite) {
      removeFavorite(user.id);
    } else {
      addFavorite({
        id: user.id,
        login: user.login,
        avatar_url: user.avatar_url,
        type: user.type || "User",
        html_url: user.html_url,
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.errorContainer}>
        <Text variant="titleLarge">Usuario no encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.headerContainer}>
          <Avatar.Image size={100} source={{ uri: user.avatar_url }} />
          <IconButton
            icon={isFavorite ? "star" : "star-outline"}
            size={30}
            onPress={toggleFavorite}
            iconColor={isFavorite ? "#FFD700" : undefined}
            style={styles.favoriteButton}
          />
        </View>

        <Card.Content>
          <Text variant="titleLarge" style={styles.name}>
            {user.name || user.login}
          </Text>
          {user.bio && (
            <Text variant="bodyMedium" style={styles.bio}>
              {user.bio}
            </Text>
          )}

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text variant="titleLarge">{user.public_repos}</Text>
              <Text variant="bodyMedium">Repositorios</Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="titleLarge">{user.followers}</Text>
              <Text variant="bodyMedium">Seguidores</Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="titleLarge">{user.following}</Text>
              <Text variant="bodyMedium">Siguiendo</Text>
            </View>
          </View>

          {user.location && (
            <View style={styles.infoItem}>
              <IconButton icon="map-marker" size={28} disabled />
              <Text variant="bodyMedium">{user.location}</Text>
            </View>
          )}

          {user.company && (
            <View style={styles.infoItem}>
              <IconButton icon="office-building" size={28} disabled />
              <Text variant="bodyMedium">{user.company}</Text>
            </View>
          )}
        </Card.Content>

        <Card.Actions>
          <Button
            mode="contained"
            onPress={() => Linking.openURL(user.html_url)}
          >
            Ver perfil en GitHub
          </Button>
          {user.blog && (
            <Button onPress={() => Linking.openURL(user.blog)}>Blog</Button>
          )}
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}
