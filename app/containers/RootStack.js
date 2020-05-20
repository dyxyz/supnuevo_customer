/**
 * RootStack.js
 */

import React, {Component} from "react";

import { createStackNavigator} from 'react-navigation';
import loggedHelp from './LoggedHelp';
import RootState from './RootState';
import RootPage from './RootPage';
import UnionStack from './union/UnionStack';
import ShoppingStack from './shopping/ShppingStack';
import OrderStack from './order/OrderStack';

const Routes = {
    UnionStack: {screen: UnionStack},
  loggedHelp:{screen: loggedHelp},
  RootPage: {screen: RootPage},
  RootState:{screen: RootState},
  ShoppingStack: {screen: ShoppingStack},
  OrderStack: {screen: OrderStack},
};

const RootStack = createStackNavigator(Routes, {
  initialRouteName: 'loggedHelp',
  headerMode: 'screen',
  defaultNavigationOptions: {
    header:null
  },
});

export default RootStack;
