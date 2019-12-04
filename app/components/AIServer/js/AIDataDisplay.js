/**
 * AIDataDisplay.js
 */

import React, {
    Component,
} from 'react';

import {StyleSheet, Dimensions, View, Text, ListView, Modal, ActivityIndicator, ScrollView} from 'react-native';
import {InformationItem, TYPE_TEXT} from "../../InformationItem";
import strings from "../../../resources/strings";
import IntroDivider from '../../../components/IntroDivider';
import {Image} from "react-native-elements";

export default class AIDataDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const data = this.props.data;

        return (data && data !== ""?
                    <ScrollView style={styles.container}>
                        <IntroDivider intro={strings.imgurls_intro}/>
                        {this._renderImage(data.pictureurl)}
                        <IntroDivider intro={strings.details_intro}/>
                        {this._renderInformationListItem(data)}
                    </ScrollView>:
                    <View style={styles.container}/>
        );
    }

    _renderImage(pictureurl){
        return(<View style={styles.imageWrapper}><Image style={styles.image} resizeMode={"contain"} source={require('../../../assets/img/img_logo.png')} /></View>);
    }

    // 商品相关信息列表
    _renderInformationListItem(data){
        return([
            <InformationItem key = {0} type = {TYPE_TEXT} title = {strings.name} content = {data.descripcion}/>,
            <InformationItem key = {1} type = {TYPE_TEXT} title = {strings.codigo} content = {data.codigo} />
        ]);}
}

var styles = StyleSheet.create({
    container:{
        flex:1,
    },
    imageWrapper:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image:{
        width: 200,
        height: 200,
        margin: 10,
    },
})
