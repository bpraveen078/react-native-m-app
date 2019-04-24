import { createStackNavigator, createAppContainer } from "react-navigation";
import homescreen from "../modules/common/components/homescreen";
import listscreen from "../modules/business/components/listscreen";

const RootStack = createStackNavigator(
  {
    HomeScreen: {
      screen: homescreen,
      navigationOptions: {}
    },
    ListScreen: {
      screen: listscreen,
      navigationOptions: {}
    }
  },

  {
    // Default config for all screens
    headerMode: "none"
  }
);
const HomeAppContainer = createAppContainer(RootStack);
export default HomeAppContainer;
