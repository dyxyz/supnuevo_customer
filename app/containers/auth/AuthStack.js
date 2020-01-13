/**
 * AuthStack.js
 */
import React, {Component} from "react";
import { createStackNavigator,createAppContainer } from 'react-navigation';
import Login from "./Login";
import Register from './Register';
import registerHelp from './RegisterHelp'

const Routes = {

  Login:{screen:Login},
  Register:{screen:Register},
  registerHelp:{screen:registerHelp},

};
const AuthStack = createStackNavigator(Routes, {
  defaultNavigationOptions: {
    header:null
  },
  headerMode: 'screen'
});

export default AuthStack;
