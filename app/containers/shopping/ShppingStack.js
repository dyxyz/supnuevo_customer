/**
 * UnionStack.js
 */

import React, {Component} from "react";

import { createStackNavigator} from 'react-navigation';
import ShoppingList from './ShoppingList';
import commodityDetail from "../CommodityDetail";

const Routes = {
    ShoppingList: {screen: ShoppingList},
    commodityDetail: {screen: commodityDetail},
};

const ShppingStack = createStackNavigator(Routes, {
    initialRouteName: 'ShoppingList',
    headerMode: 'screen',
    defaultNavigationOptions: {
    header:null
    },
});

export default ShppingStack;
