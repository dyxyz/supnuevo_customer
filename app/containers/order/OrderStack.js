/**
 * UnionStack.js
 */

import React, {Component} from "react";

import { createStackNavigator} from 'react-navigation';
import OrderCommit from './OrderCommit';
import OrderHistory from './OrderHistory';
import OrderRule from './OrderRule';
import OrderState from './OrderState';
import HistoryHelp from './HistoryHelp';
import HistoryCar from './HistoryCar';
import ShoppingList from '../shopping/ShoppingList'
import commodityDetail from "../CommodityDetail";
import ShoppingState from "../shopping/ShoppingState";
import CommodityClass from '../shopping/CommodityClass';
import Clause from '../Clause';

const Routes = {
    OrderCommit: {screen: OrderCommit},
    OrderHistory: {screen: OrderHistory},
    OrderRule: {screen: OrderRule},
    OrderState: {screen: OrderState},
    HistoryHelp: {screen: HistoryHelp},
    HistoryCar: {screen: HistoryCar},
    ShoppingList: {screen: ShoppingList},
    commodityDetail: {screen: commodityDetail},
    ShoppingState: {screen: ShoppingState},
    CommodityClass: {screen: CommodityClass},
    Clause: {screen: Clause},
};

const OrderStack = createStackNavigator(Routes, {
    initialRouteName: 'OrderCommit',
    headerMode: 'screen',
    defaultNavigationOptions: {
    header:null
    },
});

export default OrderStack;
