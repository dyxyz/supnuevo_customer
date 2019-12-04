/**
 * TopToolBar.js
 */

import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  InteractionManager
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

import colors from '../resources/colors';
import {getHeaderHeight, getTabBarHeight,SCREEN_WIDTH} from '../utils/tools';

const ACTION_VOLUME_ON ='md-volume-high';
const ACTION_VOLUME_OFF = 'md-volume-off';
const ACTION_HELP = 'md-help';

class TopToolBar extends Component{

  constructor(props) {
    super(props);
    this.state={
    }
  }

  render()
  {
    var {title, isVolumeOn}=this.props

    var defaultStyle={
      height:getHeaderHeight(),
      width:SCREEN_WIDTH,
      paddingTop:30,
      flexDirection:'row',
      justifyContent:'center',
      backgroundColor: colors.primaryColor,
    }

    var ACTION_VOLUME = isVolumeOn?ACTION_VOLUME_OFF:ACTION_VOLUME_ON;

    return(
        <View style={styles.container}>
          <View style={defaultStyle}>
            <TouchableOpacity style={styles.IconContainerStyle} onPress={this.props._onLeftIconPress}>
              <Ionicons name={ACTION_VOLUME} size={25} color="#fff"/>
            </TouchableOpacity>

            <View style={styles.titleContainerStyle}><Text style={styles.textStyle}>{title}</Text></View>

            <TouchableOpacity style={styles.IconContainerStyle} onPress={this.props._onRightIconPress}>
              <Ionicons name={ACTION_HELP} size={25} color="#fff"/>
            </TouchableOpacity>
          </View>

          {this.props.children}
        </View>
    )
  }
}

var styles = StyleSheet.create({
  container:{
    height:getHeaderHeight(),
    width:SCREEN_WIDTH,
  },
  IconContainerStyle:{
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainerStyle:{
    flex:1,
    justifyContent:'center',
    alignItems: 'center',
    flexDirection:'row'
  },
  textStyle:{
    color:'#fff',
    fontSize:18
  }
});

const topToolBar ={
  get TopToolBar() {return TopToolBar},
}

module.exports = topToolBar

