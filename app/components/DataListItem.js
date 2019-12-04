/**
 * DataListItem.js
 */

// 组件
import React, { Component, Fragment } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions,} from 'react-native';
import {SwipeRow} from "react-native-swipe-list-view";

// 工具
import colors from "../resources/colors";
import strings from "../resources/strings";
import {SCREEN_WIDTH} from "../utils/tools";

// actions
// redux
// 导航
// 常量
var {height, width} = Dimensions.get('window');

class DataListItem extends Component {

  render() {
    const { title, brief, url} = this.props.data;
    return (
        <SwipeRow
            rightOpenValue={-60}>
          {/*侧滑栏*/}
          <View style={DataListItemStyles.swipeRowContainer}>
            {/*删除*/}
            <TouchableOpacity
                style={DataListItemStyles.swipeRowDeleteButton}
                onPress={this.props.onDeleteBtnPress}>
              <Text style={DataListItemStyles.swipeRowText}>
                {strings.delete_btn}
              </Text>
            </TouchableOpacity>
          </View>

          {/*内容栏*/}
            <TouchableOpacity
                style={DataListItemStyles.mainRowContainer}
                onPress={this.props.onDetailPress}>
                <Image resizeMode="contain"
                       style={DataListItemStyles.mainPicture}
                       source={url == null?require('../assets/img/img_logo.png'):{uri:url}}/>
              <View style={DataListItemStyles.mainTextWrapper}>
                <Text style={DataListItemStyles.mainTitleText}>{title}</Text>
                <Text style={DataListItemStyles.mainBriefText} numberOfLines={2}>{brief}</Text>
              </View>
            </TouchableOpacity>
        </SwipeRow>
    );
  }
}

const DataListItemStyles = StyleSheet.create({
  swipeRowContainer: {
    alignItems: 'center',
    height:80,
    width:SCREEN_WIDTH,
    flexDirection: "row-reverse",
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  swipeRowDeleteButton:{
    width: 60,
    height:80,
    paddingHorizontal: 10,
    backgroundColor: colors.baseRed,
    textAlign:'center',
    justifyContent:'center'
  },
  swipeRowText:{
    color: '#fff',
    textAlign: 'center',
    fontSize: 14
  },

  mainRowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    height:80,
    width:SCREEN_WIDTH,
    padding: 10,
    backgroundColor: '#fff'
  },
  mainPicture:{
    height: 60,
    width: 100,
  },
  mainTextWrapper:{
    flex: 1,
    flexDirection: 'column',
    marginLeft: 8,
  },
  mainTitleText: {
    fontSize: 16,
    color: '#222'
  },
  mainBriefText: {
    fontSize: 14,
    color: '#666',
  },
});

export default DataListItem;
