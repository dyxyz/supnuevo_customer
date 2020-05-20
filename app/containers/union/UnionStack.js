/**
 * UnionStack.js
 */

import React, {Component} from "react";

import { createStackNavigator} from 'react-navigation';
import UnionList from './UnionList';
import UnionMemberList from './UnionMemberList';
import UnionDiscount from './UnionDiscount';
import UnionPrice from './UnionPrice';
import commodityDetail from "../CommodityDetail";
import UnionState from "./UnionState";

const Routes = {
    UnionList: {screen: UnionList},
    UnionMemberList: {screen: UnionMemberList},
    UnionDiscount: {screen: UnionDiscount},
    UnionPrice:{screen:UnionPrice},
    commodityDetail:{screen:commodityDetail},
    UnionState:{screen:UnionState},

};

const UnionStack = createStackNavigator(Routes, {
    initialRouteName: 'UnionList',
    headerMode: 'screen',
    defaultNavigationOptions: {
    header:null
    },
});

export default UnionStack;
