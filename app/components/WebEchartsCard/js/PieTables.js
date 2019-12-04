/**
 * PieTables.js
 * 环状图 对应的表单
 */

import React from 'react';
import {View, Image, StyleSheet, TextInput, ViewPropTypes, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import colors from '../../../resources/colors';
import Echarts from './Echarts';
import constants from './constants';
import {isObject, SCREEN_WIDTH, GetPercentList} from "../../../utils/tools";

const HeaderList = [constants.NAME,constants.ADDRESS,constants.TIME];

export default class PieTables extends React.PureComponent {

  constructor(props: {}) {
    super(props);
    this.state = {
    };
  }

  render() {

    const {data } = this.props;
    const nameList = [];
    const dataList = [];

    for(var i=0;i<data.length;i++){
      nameList.push(data[i].name);
      dataList.push(data[i].value);
    }
    const percentList = GetPercentList(dataList);

    return (
        <View style={styles.container}>
          {this._renderHeader(HeaderList)}
          {this._renderRow(nameList,dataList,percentList)}
        </View>
    );
  }

  _renderHeader(HeaderList){
    var headerCellList = [];
    HeaderList.map((headerItem,i)=>{
      var headerCell = i==0 ? this._renderCell(constants.NAME_TYPE,headerItem):this._renderCell(constants.OTHER_TYPE,headerItem);
      headerCellList.push(headerCell);
    })

    return(<View style={styles.headerRowStyle}>{headerCellList}</View>);
  }

  _renderRow(nameList,dataList,percentList){
    var rowList = [];
    for(var i=0;i<nameList.length;i++){
      var row = (
          <View style={styles.normalRowStyle}>
            {this._renderCell(constants.NAME_TYPE,nameList[i])}
            {this._renderCell(constants.OTHER_TYPE,dataList[i])}
            {this._renderCell(constants.OTHER_TYPE,percentList[i])}
          </View>
      );
      rowList.push(row);
    }
    return rowList;
  }

  _renderCell(type,value){
    return (
        <View style={type==constants.NAME_TYPE?styles.nameCellStyle:styles.cellStyle}><Text style={styles.cellTextStyle}>{value}</Text></View>
    );
  }
}

const styles = StyleSheet.create({
  headerRowStyle:{
    height:40,
    width:SCREEN_WIDTH,
    backgroundColor: colors.saperatorLine,
    flexDirection: 'row'
  },
  normalRowStyle:{
    height:40,
    width:SCREEN_WIDTH,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor:colors.primaryGrayLight,
  },
  nameCellStyle:{
    flex:2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellStyle:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellTextStyle:{
    fontSize:14
  }
});
