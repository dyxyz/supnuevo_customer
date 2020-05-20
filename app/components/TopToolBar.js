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
import strings from "../resources/strings";

const TEXT_TYPE = 0;
const ICON_TYPE = 1;


const ACTION_HELP={name:strings.help, type: TEXT_TYPE};
const ACTION_SKIP={name:strings.skip_to_car, type: TEXT_TYPE};
const ACTION_SPACE={name:'', type: TEXT_TYPE};

// const ACTION_VOLUME_ON ='md-volume-high';
// const ACTION_VOLUME_OFF = 'md-volume-off';
// const ACTION_HELP = 'md-help';

class TopToolBar extends Component{

  constructor(props) {
    super(props);
    this.state={
    }
  }

  render()
  {
    var {title, isVolumeOn,rightAction,leftAction,flag}=this.props

    var defaultStyle={
      height:getHeaderHeight(),
      width:SCREEN_WIDTH,
      paddingTop:30,
      flexDirection:'row',
      justifyContent:'center',
      backgroundColor: colors.primaryColor,
    }

    // var ACTION_VOLUME = isVolumeOn?ACTION_VOLUME_OFF:ACTION_VOLUME_ON;

    return(
        <View style={styles.container}>
          <View style={defaultStyle}>
              {
                flag==1?
                    <TouchableOpacity style={[styles.IconContainerStyle,{width:70}]} onPress={this.props._onLeftIconPress}>
                        {this._renderAction(leftAction)}
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.IconContainerStyle} onPress={this.props._onLeftIconPress}>
                        {this._renderAction(leftAction)}
                    </TouchableOpacity>
              }



            <View style={styles.titleContainerStyle}><Text style={styles.textStyle} allowFontScaling={false}>supy-{title}</Text></View>

            <TouchableOpacity style={styles.IconContainerStyle} onPress={this.props._onRightIconPress}>
                {/*<Text style={styles.textStyle} allowFontScaling={false}>{ACTION_HELP.name}</Text>*/}
                {this._renderAction(rightAction)}
            </TouchableOpacity>
          </View>

          {this.props.children}
        </View>
    )
  }
    _renderAction(action){
        if(action)
            switch (action.type) {
                case TEXT_TYPE:
                    return (<Text style={styles.textStyle} allowFontScaling={false}>{action.name}</Text>);
                case ICON_TYPE:
                    return ( <Ionicons name={action.name} size={30} color="#fff"/>);
            }
    }
}

var styles = StyleSheet.create({
  container:{
    height:getHeaderHeight(),
    width:SCREEN_WIDTH,
  },
  IconContainerStyle:{
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainerStyle:{
    flex:1,
    justifyContent:'center',
    alignItems: 'center',
    flexDirection:'row',
  },
  textStyle:{
    color:'#fff',
    fontSize:14
  }
});

const topToolBar ={
    get ACTION_HELP() {return ACTION_HELP},
    get ACTION_SKIP() {return ACTION_SKIP},
  get TopToolBar() {return TopToolBar},
    get ACTION_SPACE() {return ACTION_SPACE},
}

module.exports = topToolBar

