/**
 * AIServerContainer.js
 */

import React, {Component} from "react";
import {Image, StatusBar, StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import AIDataDisplay from './AIDataDisplay';
import AISearchBar from './AISearchBar';

export default class AIDataBoard extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        const {data, showSearchResult, searchResult, searchText} = this.props;

        return ([
                <AIDataDisplay data={data}/>,
                <AISearchBar
                    onMicrophonePress={this.props._onMicrophonePress}
                    _searchTextChange={this.props._searchTextChange}
                    _onSearchInputFocus={this.props._onSearchInputFocus}
                    _onSearchResultPress={this.props._onSearchResultPress}
                    showSearchResult = {showSearchResult}
                    searchResult = {searchResult}
                    searchText = {searchText}/>]
            );
    }
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent: 'center'
    },
});
