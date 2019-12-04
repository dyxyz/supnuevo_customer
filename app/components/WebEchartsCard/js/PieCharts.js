/**
 * PieCharts.js
 * 饼状图
 */

import React from 'react';
import {View, Image, StyleSheet, TextInput, ViewPropTypes, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import colors from '../../../resources/colors';
import Echarts from './Echarts';
import {isObject, SCREEN_WIDTH} from "../../../utils/tools";

export default class PieCharts extends React.PureComponent {

  constructor(props: {}) {
    super(props);
    this.state = {
    };
  }

  render() {

    const { title,name,data } = this.props;

    var nameList = [];
    for(var i=0;i<data.length;i++)
      nameList.push(data[i].name)

    const option = {
      color :[colors.baseCyan,colors.basePurple,colors.baseBlueLight,colors.baseYellow,colors.baseRed],
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient : 'vertical',
        x : 'left',
        data:nameList
      },
      calculable : true,
      series : [
        {
          name:name,
          type:'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:data
        }
      ]
    };

    return (
        <View style={styles.container}>
          <View style={styles.titleHeader}><Text style={styles.textStyle}>{title}</Text></View>
          <Echarts option={option} height={300} width={SCREEN_WIDTH} />
        </View>
    );
  }
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
