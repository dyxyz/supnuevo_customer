/**
 * UnionStack.js
 */

import React, {Component} from "react";

import { createStackNavigator} from 'react-navigation';
import UnionList from './UnionList';
import UnionMemberList from './UnionMemberList';
import UnionDiscount from './UnionDiscount';
import UnionPrice from './UnionPrice';

const Routes = {
    UnionList: {screen: UnionList},
    UnionMemberList: {screen: UnionMemberList},
    UnionDiscount: {screen: UnionDiscount},
    UnionPrice:{screen:UnionPrice},
};

const UnionStack = createStackNavigator(Routes, {
    initialRouteName: 'UnionList',
    headerMode: 'screen',
    defaultNavigationOptions: {
    header:null
    },
});

export default UnionStack;
