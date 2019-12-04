/**
 * UnionStack.js
 */

import React, {Component} from "react";

import { createStackNavigator} from 'react-navigation';
import OrderCommit from './OrderCommit';
import OrderHistory from './OrderHistory';
import OrderRule from './OrderRule';

const Routes = {
    OrderCommit: {screen: OrderCommit},
    OrderHistory: {screen: OrderHistory},
    OrderRule: {screen: OrderRule},
};

const OrderStack = createStackNavigator(Routes, {
    initialRouteName: 'OrderCommit',
    headerMode: 'screen',
    defaultNavigationOptions: {
    header:null
    },
});

export default OrderStack;
