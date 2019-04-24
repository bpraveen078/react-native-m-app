/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./src/app/redux/store";
import AppContainer from "./src/app/Navigation/combinenavigator";
// const store = createStore();
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
//AppRegistry.registerComponent('MYPROJECT', () => PrimaryNav );
