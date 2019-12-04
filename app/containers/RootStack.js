/**
 * RootStack.js
 */

import React, {Component} from "react";

import { createStackNavigator} from 'react-navigation';
import RootPage from './RootPage';
import UnionStack from './union/UnionStack';
import ShoppingStack from './shopping/ShppingStack';
import OrderStack from './order/OrderStack';

const Routes = {
  RootPage: {screen: RootPage},
  UnionStack: {screen: UnionStack},
  ShoppingStack: {screen: ShoppingStack},
  OrderStack: {screen: OrderStack},
};

const RootStack = createStackNavigator(Routes, {
  initialRouteName: 'RootPage',
  headerMode: 'screen',
  defaultNavigationOptions: {
    header:null
  },
});

export default RootStack;
