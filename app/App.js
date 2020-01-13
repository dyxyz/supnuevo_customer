/**
 * App.js
 */

import React, {Component} from "react";
import {Provider} from "react-redux";
import configureStore from "./store/configureStore";
import RootStack from "./containers/RootStack";
import AuthStack from "./containers/auth/AuthStack";
import help from "./containers/help";
import {createAppContainer, createSwitchNavigator} from "react-navigation";

const store = configureStore();

const Routes = {
    RootStack:RootStack,
    AuthStack:AuthStack,
    help:help,
};
const AppContainer = createAppContainer(createSwitchNavigator(
    Routes,
    {
        initialRouteName: 'help',
        headerMode: 'screen'
    },
));

export default class App extends Component {
  render() {

    return (
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    );
  }
}
