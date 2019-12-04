/**
 * LineAndBarCharts.js
 * 折线 & 柱状图
 */

import React from 'react';
import {View, Image, StyleSheet, TextInput, ViewPropTypes, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import colors from '../../../resources/colors';
import Echarts from './Echarts';
import {isObject, SCREEN_WIDTH} from "../../../utils/tools";

export default class LineAndBarCharts extends React.PureComponent {

  constructor(props: {}) {
    super(props);
    this.state = {
    };
  }

  render() {

    // xAxisList: 数据的单位
    // data1 :{type:'line',dataList:[],name:''}... 表示一种图表

    const { title, xAxisList, data1, data2, data3 } = this.props;
    const defaultLabel = {normal:{show:true,position:'top'}};

    var seriesList = [];
    var legendList = [];
    if(data1 && isObject(data1)) {
      seriesList.push(
          {name: data1.name, data: data1.data, type: data1.type, label: defaultLabel});
      legendList.push(data1.name);
    }
    if(data2 && isObject(data2)) {
      seriesList.push(
          {name: data2.name, data: data2.data, type: data2.type, label: defaultLabel});
      legendList.push(data2.name);
    }
    if(data3 && isObject(data3)) {
      seriesList.push(
          {name: data3.name, data: data3.data, type: data3.type, label: defaultLabel});
      legendList.push(data3.name);
    }

    const option = {
      color: [colors.brightRed,colors.brightBlue,colors.brightPurple],
      tooltip : { trigger: 'axis'},
      legend: {data:legendList},
      xAxis: {data: xAxisList},
      yAxis: {},
      series: seriesList
    };

    return (
        <View style={styles.container}>
          <View style={styles.titleHeader}><Text style={styles.textStyle}>{title}</Text></View>
          <Echarts option={option} height={300} width={SCREEN_WIDTH} />
        </View>
    );
  }
}

LineAndBarCharts.propTypes = {
  xAxisList: PropTypes.array,
  data1: PropTypes.array,
  data2: PropTypes.array,
  data3: PropTypes.array,
}

const styles = StyleSheet.create({
  container: {
    height:400,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleHeader:{
    height: 40,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle:{
    fontSize:16,
  }
});
