import * as React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Favorites from "../../Screens/Bottom/Favorites";
import Globals from "../../Ressources/Globals";
const Stack = createStackNavigator();
export default function Navigation({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Favorites">
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={{
          headerShown:false,
        }}
      />
    </Stack.Navigator>
  );
}
