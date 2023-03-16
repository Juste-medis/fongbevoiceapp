import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Account from "../../Screens/Bottom/Account/Account";
import Personal from "../../Screens/Bottom/Account/Personal";
import Command from "../../Screens/Bottom/Account/Command";
import Security from "../../Screens/Bottom/Account/Security";
import About from "../../Screens/Bottom/Account/About";
import Notification from "../../Screens/Bottom/Account/Notification";
import Globals from "../../Ressources/Globals";
import Notes from "../../Screens/Bottom/Home/Reader/Notes";

const Stack = createStackNavigator();
export default function Navigation({ navigation }) {
  const HeaderStandar = {
    headerTitleStyle: { color: Globals.COLORS.white },
    headerStyle: { backgroundColor: Globals.COLORS.secondary },
    headerTintColor: Globals.COLORS.white,
  };
  return (
    <Stack.Navigator initialRouteName="Account">
      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Personal"
        component={Personal}
        options={{
          title: Globals.STRINGS.personal_informations,
          ...HeaderStandar,
        }}
      />
      <Stack.Screen
        name="Command"
        component={Command}
        options={HeaderStandar}
      />
      <Stack.Screen name="Notes" component={Notes} options={HeaderStandar} />
      <Stack.Screen
        name="Security"
        component={Security}
        options={HeaderStandar}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={HeaderStandar}
      />
    </Stack.Navigator>
  );
}
