/**
 * AIServer.js
 */

'use strict';

import React, {
    Component,
} from 'react';

import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    ListView,
    Modal,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import constants from '../../../resources/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from "../../../resources/colors";
import aiAnswer from "../data/aiAnswer";

export default class AIServer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            step: 0,
        };
        this.user={
            _id: 1,
            name: this.props.username,
        };
        this.robot={
            _id: 2,
            name: constants.ANSWER_ROBOT,
        }
    }

    componentWillMount() {
        this.setState({
            messages: [
                {
                    _id: this.state.step,
                    text: constants.ROBOT_HELLO,
                    createdAt: new Date(),
                    user: this.robot,
                },
            ],
        })
    }

    render() {
        const {searchText} = this.props;
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={this.user}
                onInputTextChanged={(text) => this.props._searchTextChange(text)}
                text={searchText}
                renderChatFooter={this.renderChatFooter}
                renderActions={this.renderActions}
                onPressActionButton={this.props._onMicrophonePress}
            />
        );
    }

    renderChatFooter = props => {
        const {showSearchResult, searchText} = this.props;

        if(!showSearchResult)return null;
        var searchResult = [];
        aiAnswer.map((answer,i)=>{
            if(answer.key.indexOf(searchText) !== -1)searchResult.push(answer.key);
        })

        let searchResultsCustomStyle = {height: 150,borderTopWidth:0.5,borderColor:colors.primaryGray}
        if (searchResult.length < 3) {
            searchResultsCustomStyle = {height: 50 * searchResult.length,borderTopWidth:0.5,borderColor:colors.primaryGray}
        }

        let resultView = searchResult.map((item, index) => {
            return (
                <TouchableOpacity key={index} onPress={() => {this.props._onSearchResultPress(item)}}>
                    <View style={styles.searchResultContainer}>
                        <View style={styles.searchResultRightContainer}>
                            <Text numberOfLines={1} style={styles.searchResultText}>{item}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        })

        return (
            <View style={[styles.searchResultsContainer, searchResultsCustomStyle]}>
                <ScrollView>
                    {resultView}
                </ScrollView>
            </View>
        )
    }

    renderActions = props => {
        return (
            <TouchableOpacity style={styles.searchIcon} onPress={this.props._onMicrophonePress}>
                <Ionicons name={'md-mic'} size={25} color={colors.primaryDarkGray}/>
            </TouchableOpacity>
        );
    }

    renderSend = props => {
        return (
            <View style={styles.sendBtnWrapper}>
                <Text style={styles.sendBtnTxt}>send</Text>
            </View>
        );
    }

    _onInputTextChange = (text) => {
        this.setState({typingText: text,showSearchResult: true});
        if (!text) {
            this._clearSearchInput()
            return;
        }
    }

    _clearSearchInput = () => this.setState({typingText: '', showSearchResult: false,})

    onSend = (messages = []) => {
        const step = this.state.step + 1
        this.setState(previousState => {
            const sentMessages = [{ ...messages[0]}]
            return {
                messages: GiftedChat.append(previousState.messages, sentMessages),
                step,
            }
        })
        this._findAnswerOfMsg(messages[0].text);
    }

    _findAnswerOfMsg(message){
        let recAnswer = null;
        aiAnswer.map((answer,i)=>{
            if(answer.key === message)recAnswer = answer.answer;
        })
        this.onReceive(recAnswer)
    }

    onReceive = text => {
        this.setState(previousState => {
            return {
                messages: GiftedChat.append(previousState.messages, {
                    _id: Math.round(Math.random() * 1000000),
                    text,
                    createdAt: new Date(),
                    user: this.robot,
                }),
            }
        })
    }
}

const styles = StyleSheet.create({
    footerContainer:{
        height: 100,
        width: '100%',
        backgroundColor: colors.brightRed,
    },
    footerText:{
        fontSize: 14,
    },
    searchResultText: {
        fontSize: 16,
        color: '#030303'
    },
    searchInputLeftTxt: {
        fontSize: 16,
        color: colors.primaryColor,
        paddingRight: 10,
    },
    noSearchResultContainer: {
        padding: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#c8c7cc',
        borderTopWidth: 0
    },
    noSearchResultTxt: {
        fontSize: 18,
        color: '#030303'
    },
    searchResultsContainer: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#c8c7cc',
        borderTopWidth: 0.5,
        height: 50,
        width: constants.SCREEN_WIDTH,
    },
    searchResultContainer: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#c8c7cc'
    },
    searchResultRightContainer: {
        flex: 1,
        paddingLeft: 20
    },
    searchIcon:{
        width:25,
        height:25,
        alignItems:'center',
        justifyContent: 'center',
    },
    sendBtnWrapper:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sendBtnTxt:{
        fontSize:14,
        color:colors.primaryColor
    }
});
