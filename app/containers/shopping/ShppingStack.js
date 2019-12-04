/**
 * UnionStack.js
 */

import React, {Component} from "react";

import { createStackNavigator} from 'react-navigation';
import ShoppingList from './ShoppingList';

const Routes = {
    ShoppingList: {screen: ShoppingList},
};

const ShppingStack = createStackNavigator(Routes, {
    initialRouteName: 'ShoppingList',
    headerMode: 'screen',
    defaultNavigationOptions: {
    header:null
    },
});

export default ShppingStack;
