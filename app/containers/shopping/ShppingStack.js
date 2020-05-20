/**
 * UnionStack.js
 */

import React, {Component} from "react";

import { createStackNavigator} from 'react-navigation';
import ShoppingList from './ShoppingList';
import commodityDetail from "../CommodityDetail";
import ShoppingState from "./ShoppingState";
import OrderCommit from '../order/OrderCommit';
import OrderHistory from '../order/OrderHistory';
import OrderRule from '../order/OrderRule';

const Routes = {
    ShoppingList: {screen: ShoppingList},
    ShoppingState: {screen: ShoppingState},
    commodityDetail: {screen: commodityDetail},
    OrderCommit: {screen: OrderCommit},
    OrderHistory: {screen: OrderHistory},
    OrderRule: {screen: OrderRule},
};

const ShppingStack = createStackNavigator(Routes, {
    initialRouteName: 'ShoppingList',
    headerMode: 'screen',
    defaultNavigationOptions: {
    header:null
    },
});

export default ShppingStack;
