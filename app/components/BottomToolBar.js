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
import strings from '../resources/strings';
import {getHeaderHeight, getTabBarHeight, SCREEN_WIDTH} from '../utils/tools';
// import {UnionList} from "../containers/union/UnionList";

const TEXT_TYPE = 0;
const ICON_TYPE = 1;

// const ACTION_HOME={name:'md-home', type: ICON_TYPE};
// const ACTION_BACK={name:'md-arrow-back', type: ICON_TYPE};
// const ACTION_LOGOUT={name:'md-log-out', type: ICON_TYPE};

const ACTION_HOME={name:strings.first_page, type: TEXT_TYPE};
const ACTION_BACK={name:strings.back, type: TEXT_TYPE};
const ACTION_LOGOUT={name:strings.log_out, type: TEXT_TYPE};
const ACTION_PRICE={name:strings.price_list, type: TEXT_TYPE};
const ACTION_DISCOUNT={name:strings.discount, type: TEXT_TYPE};
const ACTION_RULE={name:strings.rule, type: TEXT_TYPE};
const ACTION_HISTORY={name:strings.history, type: TEXT_TYPE};
const ACTION_ORDER={name:strings.skip_to_order, type: TEXT_TYPE};
const ACTION_CLASS={name:strings.skip_to_class, type: TEXT_TYPE};
const ACTION_SETTING={name:strings.setting, type: TEXT_TYPE};


class BottomToolBar extends Component{

  constructor(props) {
    super(props);
    this.state={
    }
  }

  render()
  {
    var {leftAction, rightAction,isRoot}=this.props

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
            <TouchableOpacity style={[styles.IconContainerStyle,{marginLeft:3}]} onPress={this.props._onLeftIconPress}>
              {this._renderAction(leftAction)}
            </TouchableOpacity>
              {isRoot?
                  <View style={styles.titleContainerStyle} />

                  :
                  <TouchableOpacity style={styles.titleContainerStyle} onPress={this.onHomeIconPress}>
                      {this._renderAction(ACTION_HOME)}
                  </TouchableOpacity>
              }


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

            if(action.name==strings.skip_to_class){
                return (<Text style={[styles.textStyle,{fontSize:18,fontWeight:'bold'}]} allowFontScaling={false}>{action.name}</Text>);
            }
            else{
                return (<Text style={styles.textStyle} allowFontScaling={false}>{action.name}</Text>);
            }


      case ICON_TYPE:
        return ( <Ionicons name={action.name} size={30} color="#fff"/>);
    }
  }

  onHomeIconPress= () =>{
    this.props.navigation.navigate('UnionList');
  }

}

var styles = StyleSheet.create({
  container:{
    flex:1,
    position:'absolute',
    bottom:0,
  },
  IconContainerStyle:{
    width: 110,
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
    fontSize:14
  }
})

const bottomToolBar ={
  get BottomToolBar() {return BottomToolBar},
  get ACTION_HOME() {return ACTION_HOME},
  get ACTION_LOGOUT() {return ACTION_LOGOUT},
  get ACTION_BACK() {return ACTION_BACK},
  get ACTION_PRICE(){return ACTION_PRICE},
  get ACTION_DISCOUNT(){return ACTION_DISCOUNT},
  get ACTION_RULE(){return ACTION_RULE},
  get ACTION_HISTORY(){return ACTION_HISTORY},
  get ACTION_ORDER(){return ACTION_ORDER},
  get ACTION_CLASS(){return ACTION_CLASS},
  get ACTION_SETTING(){return ACTION_SETTING},


}

module.exports=bottomToolBar

