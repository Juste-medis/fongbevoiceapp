import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Search from "../../Screens/Bottom/Search";
import ExploreCourses from "../../Screens/Explore/ExploreCourses";
import Formator from "../../Screens/Explore/Formator";
import CourseOverview from "../../Screens/Explore/CourseOverview";
import Pannier from "../../Components/Tools/Pannier";
import CommentComplete from "../../Screens/Explore/CommentComplete";
import SectionComplete from "../../Screens/Explore/SectionComplete";

const Stack = createStackNavigator();
export default function Navigation(route) {
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen
        options={{ headerShown: false }}
        name="Search"
        component={Search}
      />
      <Stack.Screen
        name="Formator"
        component={Formator}
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="ExploreCourses"
        component={ExploreCourses}
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
        name="SectionComplete"
        component={SectionComplete}
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="CourseOverview"
        component={CourseOverview}
        options={{
          title: "",
          headerTitleStyle: { color: "#ffffff" },
          headerStyle: { backgroundColor: "#404040" },
          headerRight: () => {
            return <Pannier color={"white"} navigation={route.navigation} />;
          },
          headerRightContainerStyle: { padding: 10 },
          headerLeft: () => {
            return;
          },
        }}
      />
    </Stack.Navigator>
  );
}
