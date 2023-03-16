import React from "react";
import { Text } from "react-native";
import Globals from "../Ressources/Globals";
import { useFonts } from "expo-font";
async function App() {
  const [loaded] = useFonts({
    Montserrat: Globals.FONTS.Montserrat_LightItalic,
    Helvetica: Globals.FONTS.Helvetica,
    Ubuntu: Globals.FONTS.Ubuntu,
    Neogrotesk: Globals.FONTS.Neogrotesk,
  });
  if (!loaded) {
    return null;
  }
  return <Text />;
}
export default App;
