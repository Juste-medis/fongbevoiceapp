import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Downloads from "../../Screens/Bottom/Downloads";
import Reader from "../../Screens/Bottom/Home/Reader/Reader";

const Stack = createStackNavigator();
export default function Navigation({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Downloads">
      <Stack.Screen
        name="Downloads"
        options={{
          headerShown: false,
        }}
        component={Downloads}
      />
      <Stack.Screen
        name="Reader"
        component={Reader}
        options={{
          title: "",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
