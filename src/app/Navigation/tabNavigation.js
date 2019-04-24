import React, { Component } from "react";
import { Icon } from "native-base";

import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";

import selectedplansscreen from "../modules/business/components/selectedplansscreen";
import Settings from "../modules/common/components/settings";
import colors from "../common/colors";

const tabNavigator = createBottomTabNavigator(
  {
    SelectedPlansScreen: {
      screen: selectedplansscreen,
      navigationOptions: () => ({
        title: "Subscribe plans",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-home" style={{ fontSize: 24, color: tintColor }} />
        )
      })
    },
    Settings: {
      screen: Settings,
      navigationOptions: () => ({
        title: "Settings",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="ios-settings"
            style={{ fontSize: 24, color: tintColor }}
          />
        )
      })
    }
  },
  {
    tabBarOptions: {
      showLabel: true, // hide labels
      activeTintColor: colors.white, // active icon color
      inactiveTintColor: colors.white, // inactive icon color
      style: {
        backgroundColor: colors.red // TabBar background
      }
    }
  }
);
const myNavigator = createStackNavigator(
  {
    //important: key and screen name (i.e. DrawerNavigator) should be same while using the drawer navigator inside stack navigator.
    tabNavigator
  },

  {
    // initialRouteName: "Home"
    headerMode: "none"
  }
);

const tabContainer = createAppContainer(myNavigator);
export default tabContainer;
