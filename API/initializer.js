import Globals from "../Ressources/Globals";
import store from "../Store/Store";
import { setProfil } from "../Store/Actions";
import Fetcher from "./fetcher";
//import Notification from "./Notifer";

export default Initialize = {
  Fillup: async function () {
    store.dispatch(setProfil(Globals.PROFIL_INFO));
  },
};
