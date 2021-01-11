/**
 * RootStack.js
 */

import React, {Component} from "react";

import { createStackNavigator} from 'react-navigation';
import loggedHelp from './LoggedHelp';
import RootState from './RootState';
import Setting from './Setting';
import Verify from './Verify';
import QRCode from './QRCode';
import Clause from './Clause';
import UnionList from './union/UnionList';
import RootPage from './RootPage';
import UnionStack from './union/UnionStack';
import ShoppingStack from './shopping/ShppingStack';
import OrderStack from './order/OrderStack';
import BigPicture from "./shopping/BigPicture";


const Routes = {
    UnionStack: {screen: UnionStack},
  loggedHelp:{screen: loggedHelp},
  RootPage: {screen: RootPage},
  RootState:{screen: RootState},
  Setting:{screen: Setting},
  Verify:{screen: Verify},
  QRCode:{screen: QRCode},
  Clause:{screen: Clause},
  ShoppingStack: {screen: ShoppingStack},
  OrderStack: {screen: OrderStack},
  UnionList: {screen: UnionList},
  BigPicture: {screen: BigPicture},
};

const RootStack = createStackNavigator(Routes, {
  initialRouteName: 'UnionList',
  headerMode: 'screen',
  defaultNavigationOptions: {
    header:null
  },
});

export default RootStack;
