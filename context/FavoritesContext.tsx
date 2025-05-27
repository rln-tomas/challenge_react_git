import { createContext, ReactNode, useContext, useState } from "react";
import { GitHubUser } from "../interfaces";

type FavoritesContextType = {
  favorites: GitHubUser[];
  addFavorite: (user: GitHubUser) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<GitHubUser[]>([]);

  const addFavorite = (user: GitHubUser) => {
    if (!favorites.some((fav) => fav.id === user.id)) {
      setFavorites((prev) => [...prev, user]);
    }
  };

  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((user) => user.id !== id));
  };

  const isFavorite = (id: number) => {
    return favorites.some((user) => user.id === id);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
