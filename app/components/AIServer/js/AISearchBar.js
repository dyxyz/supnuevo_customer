import React from 'react';
import { View, StyleSheet, ActivityIndicator, Platform, Text, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView} from 'react-native';
import colors from '../../../resources/colors';
import strings from '../../../resources/strings';
import constants from './AIConstants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconE from 'react-native-vector-icons/Entypo';
import {getHeaderHeight, SCREEN_WIDTH,getTabBarHeight} from "../../../utils/tools";

export default class AISearchBar extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
        }
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior="padding"
                keyboardVerticalOffset={getTabBarHeight}
            >
            <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                    <TouchableOpacity style={styles.searchIcon} onPress={this.props._onMicrophonePress}>
                        <IconE name={'reply-all'} size={25} color={colors.baseWhite}/>
                    </TouchableOpacity>
                    <View style={styles.inputContainerStyle}>
                        <TextInput
                            // ref={ref => this._searchInput = ref}
                            ref="_searchInput"
                            underlineColorAndroid="transparent"
                            style={styles.inputStyle}
                            value={this.props.searchText}
                            onChangeText={(text) => this.props._searchTextChange(text)}
                            onFocus={this.props._onSearchInputFocus}
                            placeholder={this.props.placeText}
                        />
                    </View>
                    <TouchableOpacity style={styles.searchIcon} onPress={()=>{this.buttonPress()}}>
                        <Ionicons name={'md-search'} size={25} color={colors.baseWhite}/>
                    </TouchableOpacity>
                </View>
            </View>
            </KeyboardAvoidingView>
        );
    }

    buttonPress=()=>{
        this.refs._searchInput.blur()
        this.props._onSearchPress()
    }

}

const styles = StyleSheet.create({
    searchContainer: {
        width: constants.SCREEN_WIDTH,
        backgroundColor: colors.primaryColor,
    },
    searchInputContainer: {
        height: Platform.OS === 'ios' ? 49 : 55,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        // borderWidth: StyleSheet.hairlineWidth,
        // borderColor: '#c8c7cc',
    },
    searchIcon:{
        width:30,
        height:30,
        alignItems:'center',
        justifyContent: 'center',
    },
    inputContainerStyle: {
        flex: 1,
        margin: 0,
        paddingHorizontal: 15,
        // borderBottomWidth: 0,
        // borderLeftWidth: StyleSheet.hairlineWidth,
        // borderLeftColor: '#c8c7cc',
        // borderRightWidth: StyleSheet.hairlineWidth,
        // borderRightColor: '#c8c7cc',
        backgroundColor:"white",
        borderRadius:SCREEN_WIDTH*0.4,
    },
    inputStyle: {
        height: 35,
        padding: 0,
        margin: 0,
        backgroundColor:colors.baseWhite
    },
    searchInputLeftTxt: {
        fontSize: 16,
        color: colors.primaryColor,
        paddingRight: 10,
    },
});
