import { createStackNavigator } from "@react-navigation/stack";
import { PaperProvider } from "react-native-paper";
import { FavoritesProvider } from "../context/FavoritesContext";
import { RootStackParamList } from "./navigation/types";
import HomeScreen from "./screens/Home/HomeScreen";
import UserDetailScreen from "./screens/UserDetail/UserDetailScreen";

const StackNav = createStackNavigator<RootStackParamList>();

export default function RootLayout() {
  return (
    <PaperProvider>
      <FavoritesProvider>
        <StackNav.Navigator>
          <StackNav.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <StackNav.Screen
            name="UserDetail"
            component={UserDetailScreen}
            options={{
              title: "Detalle del usuario",
              headerBackTitle: "Atrás",
            }}
          />
        </StackNav.Navigator>
      </FavoritesProvider>
    </PaperProvider>
  );
}
