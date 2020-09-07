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
import MemberInfo from "./MemberInfo";
import CommodityClass from '../shopping/CommodityClass';
import BigPicture from "../shopping/BigPicture";
import RootPage from '../RootPage';

const Routes = {
    UnionList: {screen: UnionList},
    UnionMemberList: {screen: UnionMemberList},
    UnionDiscount: {screen: UnionDiscount},
    UnionPrice:{screen:UnionPrice},
    commodityDetail:{screen:commodityDetail},
    UnionState:{screen:UnionState},
    CommodityClass:{screen:CommodityClass},
    MemberInfo:{screen:MemberInfo},
    RootPage:{screen:RootPage},
    BigPicture: {screen: BigPicture},
};

const UnionStack = createStackNavigator(Routes, {
    initialRouteName: 'UnionMemberList',
    headerMode: 'screen',
    defaultNavigationOptions: {
    header:null
    },
});

export default UnionStack;
