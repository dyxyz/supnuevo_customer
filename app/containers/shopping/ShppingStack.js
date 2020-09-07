/**
 * UnionStack.js
 */

import React, {Component} from "react";

import { createStackNavigator} from 'react-navigation';
import ShoppingList from './ShoppingList';
import CommodityClass from './CommodityClass';
import commodityDetail from "../CommodityDetail";
import ShoppingState from "./ShoppingState";
import BigPicture from "./BigPicture";

import OrderCommit from '../order/OrderCommit';
import OrderHistory from '../order/OrderHistory';
import OrderRule from '../order/OrderRule';
import OrderState from '../order/OrderState';
import HistoryHelp from '../order/HistoryHelp';
import UnionDiscount from '../union/UnionDiscount';
import Clause from '../Clause';
import HistoryCar from '../order/HistoryCar';

const Routes = {
    ShoppingList: {screen: ShoppingList},
    ShoppingState: {screen: ShoppingState},
    BigPicture: {screen: BigPicture},
    CommodityClass: {screen: CommodityClass},
    commodityDetail: {screen: commodityDetail},
    OrderCommit: {screen: OrderCommit},
    OrderHistory: {screen: OrderHistory},
    OrderRule: {screen: OrderRule},
    OrderState: {screen: OrderState},
    HistoryHelp: {screen: HistoryHelp},
    UnionDiscount: {screen: UnionDiscount},
    Clause: {screen: Clause},
    HistoryCar: {screen: HistoryCar},
};

const ShppingStack = createStackNavigator(Routes, {
    initialRouteName: 'ShoppingList',
    headerMode: 'screen',
    defaultNavigationOptions: {
    header:null
    },
});

export default ShppingStack;
