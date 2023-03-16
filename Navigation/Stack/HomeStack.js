import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import Home from "../../Screens/Bottom/Home/Home";
import ExploreCourses from "../../Screens/Explore/ExploreCourses";
import Formator from "../../Screens/Explore/Formator";
import SectionComplete from "../../Screens/Explore/SectionComplete";
import PubExplorer from "../../Screens/Explore/PubExplorer";
import ExploreBest from "../../Screens/Explore/ExploreBest";
import CourseOverview from "../../Screens/Explore/CourseOverview";
import CommentComplete from "../../Screens/Explore/CommentComplete";
import Pannier from "../../Components/Tools/Pannier";
import MainMenu from "../../Components/Tools/MainMenu";
import MyPannier from "../../Screens/Explore/MyPannier";
import Globals from "../../Ressources/Globals";
import Reader from "../../Screens/Bottom/Home/Reader/Reader";
import ReaderComplete from "../../Screens/Bottom/Home/Reader/ReaderComplete";
import Notes from "../../Screens/Bottom/Home/Reader/Notes";
import NoteComplete from "../../Screens/Bottom/Home/Reader/NoteComplete";

const Stack = createStackNavigator();
export default function HomeStack({ navigation }) {
  const HeaderStandar = {
    headerTitleStyle: { color: Globals.COLORS.white },
    headerStyle: { backgroundColor: Globals.COLORS.secondary },
    headerTintColor: Globals.COLORS.white,
  };
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        title: false,
      }}
    >
      <Stack.Screen
        name="MyPannier"
        component={MyPannier}
        options={HeaderStandar}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerStyle: {
            backgroundColor: Globals.COLORS.teal,
            elevation: 0,
            position: "absolute",
            height: 30,
          },
          headerRight: () => {
            return <Pannier navigation={navigation} />;
          },
          headerLeft: () => {
            return <MainMenu navigation={navigation} />;
          },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ExploreCourses"
        component={ExploreCourses}
        options={{
          title: "",
          headerBackTitleStyle: {
            backgroundColor: Globals.COLORS.white,
            color: Globals.COLORS.white,
          },
          headerStyle: { backgroundColor: Globals.COLORS.secondary },
          headerTitle: "Explorer",
          headerTitleStyle: { color: "white" },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="SectionComplete"
        component={SectionComplete}
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="CommentComplete"
        component={CommentComplete}
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="Formator"
        component={Formator}
        options={HeaderStandar}
      />
      <Stack.Screen
        name="ExploreBest"
        component={ExploreBest}
        options={HeaderStandar}
      />
      <Stack.Screen
        name="PubExplorer"
        component={PubExplorer}
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="Reader"
        component={Reader}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen name="Notes" component={Notes} options={HeaderStandar} />

      <Stack.Screen
        name="NoteComplete"
        component={NoteComplete}
        options={HeaderStandar}
      />
      <Stack.Screen
        name="ReaderComplete"
        component={ReaderComplete}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CourseOverview"
        component={CourseOverview}
        options={{
          headerTitleStyle: {
            color: Globals.COLORS.secondary,
            fontSize: 15,
          },
          headerTintColor: Globals.COLORS.secondary,
          headerRight: () => {
            return <Pannier navigation={navigation} />;
          },
          headerRightContainerStyle: { padding: 10 },
        }}
      />
    </Stack.Navigator>
  );
}
