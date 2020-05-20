/**
 * UnionStack.js
 */

import React, {Component} from "react";

import { createStackNavigator} from 'react-navigation';
import OrderCommit from './OrderCommit';
import OrderHistory from './OrderHistory';
import OrderRule from './OrderRule';
import ShoppingList from '../shopping/ShoppingList'
import commodityDetail from "../CommodityDetail";
import ShoppingState from "../shopping/ShoppingState";

const Routes = {
    OrderCommit: {screen: OrderCommit},
    OrderHistory: {screen: OrderHistory},
    OrderRule: {screen: OrderRule},
    ShoppingList: {screen: ShoppingList},
    commodityDetail: {screen: commodityDetail},
    ShoppingState: {screen: ShoppingState},
};

const OrderStack = createStackNavigator(Routes, {
    initialRouteName: 'OrderCommit',
    headerMode: 'screen',
    defaultNavigationOptions: {
    header:null
    },
});

export default OrderStack;
