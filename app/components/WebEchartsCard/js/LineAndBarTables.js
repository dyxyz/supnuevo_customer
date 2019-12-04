/**
 * LineAndBarTables.js
 * 折线 & 柱状图 对应的表单
 */

import React from 'react';
import {View, Image, StyleSheet, TextInput, ViewPropTypes, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import colors from '../../../resources/colors';
import {isObject, SCREEN_WIDTH} from "../../../utils/tools";

export default class LineAndBarTables extends React.PureComponent {

  constructor(props: {}) {
    super(props);
    this.state = {
    };
  }

  render() {

    // xAxisList: 数据的单位
    // data1 :{type:'line',dataList:[],name:''}... 表示一种图表
    const {xAxisList, data1, data2, data3 } = this.props;
    const HeaderList = [];
    HeaderList.push('');
    if(data1 && isObject(data1))HeaderList.push(data1.name);
    if(data2 && isObject(data2))HeaderList.push(data2.name);
    if(data3 && isObject(data3))HeaderList.push(data3.name);

    return (
        <View style={styles.container}>
          {this._renderHeader(HeaderList)}
          {this._renderRow(xAxisList,data1,data2,data3)}
        </View>
    );
  }

  _renderHeader(HeaderList){
    var headerCellList = [];
    HeaderList.map((headerItem,i)=>{
      var headerCell = this._renderCell(headerItem);
      headerCellList.push(headerCell);
    })

    return(<View style={styles.headerRowStyle}>{headerCellList}</View>);
  }

  _renderRow(xAxisList,data1,data2,data3){
    var rowList = [];
    for(var i=0;i<xAxisList.length;i++){
      var row = (
          <View style={styles.normalRowStyle}>
            {this._renderCell(xAxisList[i])}
            {data1 && isObject(data1)?this._renderCell(data1.data[i]):null}
            {data2 && isObject(data2)?this._renderCell(data2.data[i]):null}
            {data3 && isObject(data3)?this._renderCell(data3.data[i]):null}
          </View>
      );
      rowList.push(row);
    }
    return rowList;
  }

  _renderCell(value){
    return (
        <View style={styles.cellStyle}><Text style={styles.cellTextStyle}>{value}</Text></View>
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
  cellStyle:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellTextStyle:{
    fontSize:14
  }
});
