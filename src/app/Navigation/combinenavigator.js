import { createStackNavigator, createAppContainer } from "react-navigation";

import tabnavigation from "./tabNavigation";
import nonnavigator from "./nonNavigator";
import listcarts from "../modules/business/components/listcarts";
import registation from "../modules/common/components/registation";
import forgetpassword from "../modules/common/components/forgetpassword";
import otpvalidation from "../modules/common/components/otpvalidation";
import daywiseItemscreen from "../modules/business/components/daywiseItemscreen";
import login from "../modules/common/components/login";
//  import AddressSearch from '../../Screens/AddressSearch';
//  import MapLoad from '../../Screens/MapLoad';

const PrimaryNav = createStackNavigator(
  {
    loginStack: {
      screen: nonnavigator,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    drawerStack: {
      screen: tabnavigation,
      navigationOptions: {
        gesturesEnabled: false
      }
    },

    AddScreen: {
      screen: listcarts,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    Login: {
      screen: login,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ForgetPassword: {
      screen: forgetpassword,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    Registation: {
      screen: registation,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    OtpValidation: {
      screen: otpvalidation,
      navigationOptions: {
        gesturesEnabled: false
      }
    },

    // AddressSearch :{
    //   screen: AddressSearch,
    //   navigationOptions: {
    //     gesturesEnabled: false
    //   }
    // },
    DaywiseItemScreen: {
      screen: daywiseItemscreen,
      navigationOptions: {
        gesturesEnabled: false
      }
    }

    // MapLoad :{
    //   screen: MapLoad,
    //   navigationOptions:{
    //     gesturesEnabled: false
    //   }
    // },
  },
  {
    // Default config for all screens

    headerMode: "none",
    title: "Main",
    initialRouteName: "loginStack"
  }
);
const AppContainer = createAppContainer(PrimaryNav);
export default AppContainer;
