/**
 * BottomToolBar.js
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
import {getHeaderHeight, getTabBarHeight, SCREEN_WIDTH} from '../utils/tools';

const TEXT_TYPE = 0;
const ICON_TYPE = 1;

const ACTION_HOME={name:'md-home', type: ICON_TYPE};
const ACTION_BACK={name:'md-arrow-back', type: ICON_TYPE};
const ACTION_PRICE={name:'价格表', type: TEXT_TYPE};
const ACTION_DISCOUNT={name:'折扣', type: TEXT_TYPE};
const ACTION_RULE={name:'规则', type: TEXT_TYPE};
const ACTION_HISTORY={name:'历史', type: TEXT_TYPE};

class BottomToolBar extends Component{

  constructor(props) {
    super(props);
    this.state={
    }
  }

  render()
  {
    var {leftAction, rightAction}=this.props

    var defaultStyle={
      height:getTabBarHeight(),
      width:SCREEN_WIDTH,
      paddingTop:15,
      flexDirection:'row',
      justifyContent:'center',
      backgroundColor: colors.primaryColor,
    }

    return(
        <View style={styles.container}>
          <View style={defaultStyle}>
            <TouchableOpacity style={styles.IconContainerStyle} onPress={this.props._onLeftIconPress}>
              {this._renderAction(leftAction)}
            </TouchableOpacity>
            <TouchableOpacity style={styles.titleContainerStyle} onPress={this.onHomeIconPress}>
            {this._renderAction(ACTION_HOME)}
            </TouchableOpacity>

            <TouchableOpacity style={styles.IconContainerStyle} onPress={this.props._onRightIconPress}>
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
        return (<Text style={styles.textStyle}>{action.name}</Text>);
      case ICON_TYPE:
        return ( <Ionicons name={action.name} size={25} color="#fff"/>);
    }
  }

  onHomeIconPress= () =>{
    this.props.navigation.navigate('RootPage');
  }

}

var styles = StyleSheet.create({
  container:{
    flex:1,
    position:'absolute',
    bottom:0,
  },
  IconContainerStyle:{
    width: 60,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleContainerStyle:{
    flex:1,
    justifyContent:'flex-start',
    alignItems: 'center',
  },
  textStyle:{
    color:'#fff',
    fontSize:18
  }
})

const bottomToolBar ={
  get BottomToolBar() {return BottomToolBar},
  get ACTION_HOME() {return ACTION_HOME},
  get ACTION_BACK() {return ACTION_BACK},
  get ACTION_PRICE(){return ACTION_PRICE},
  get ACTION_DISCOUNT(){return ACTION_DISCOUNT},
  get ACTION_RULE(){return ACTION_RULE},
  get ACTION_HISTORY(){return ACTION_HISTORY},
}

module.exports=bottomToolBar

