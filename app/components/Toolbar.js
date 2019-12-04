/**
 * Toolbar.js
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

import Popover from 'react-native-popover-view'
import Ionicons from 'react-native-vector-icons/Ionicons'

import colors from '../resources/colors';
import {getHeaderHeight} from '../utils/tools';

const {height, width} = Dimensions.get('window');

const ACTION_ADD='md-add'
const ACTION_EDIT='md-create'
const BACK_SHOW='BACK_SHOW'
const BACK_NEVER='BACK_NEVER'
const OPTION_SHOW='OPTION_SHOW'
const OPTION_NEVER='OPTION_NEVER'

class Toolbar extends Component{

  goBack(){
    this.props.navigation.pop();
  }

  closePopover(){
    this.setState({menuVisible: false});
  }

  showPopover(ref){
    this.refs[ref].measure((ox, oy, width, height, px, py) => {
      this.setState({
        menuVisible: true,
        buttonRect: {x: px+20, y: py+0, width: 200, height: height}
      });
    });
  }

  constructor(props) {
    super(props);
    this.state={
      menuVisible:false
    }
  }

  render()
  {
    var {backgroundColor,title,cancelIcon,onCancel,action,onOptionsItemSelected,actions,isBack}=this.props

    var defaultStyle1={
      height:getHeaderHeight(),
      width:width,
      paddingTop:30,
      flexDirection:'row',
      justifyContent:'center',
      backgroundColor: colors.primaryColor,
    }

    if(backgroundColor&&backgroundColor!='')
      defaultStyle1.backgroundColor=backgroundColor

    var items=[];
    var optionShows=[]

    actions.map((action,i)=>{

      // OPTION_SHOW 是左侧自定义选择按钮
      // OPTION_NEVER 是左侧默认菜单栏+弹出选择框
      if(action.show==OPTION_SHOW)
      {
        optionShows.push(
            <TouchableOpacity key={i}
                              style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',width:60}}
                              onPress={()=>{
                                if(this.props.onPress)
                                  this.props.onPress(i)
                              }}
            >
              <Ionicons name={action.icon} size={25} color="#fff"/>
            </TouchableOpacity>
        )
      }

      else if(action.show==OPTION_NEVER){
        items.push(
            <TouchableOpacity style={[styles.popoverContent]} key={i}
                              onPress={()=>{
                                this.closePopover();
                                // 对于 popover 关闭动画对主页面的屏蔽
                                // 通过 添加时限(1000ms) 来对页面事件进行处理

                                setTimeout(()=>{
                                    if(this.props.onPress)
                                    this.props.onPress(i)
                                }, 1000)
                              }}>
              <Text style={[styles.popoverText,{color:'#444'}]}>{action.value}</Text>
            </TouchableOpacity>
        )
      }
    })

    return(
        <View style={styles.container}>
          <View style={defaultStyle1}>
            {
              (isBack && isBack == true)?
              <TouchableOpacity style={{width: 60, justifyContent: 'center', alignItems: 'center',}}
                               onPress={() => {
                                 if (cancelIcon && cancelIcon != '') {
                                   if (onCancel)
                                     onCancel()
                                 } else {
                                   this.goBack();
                                 }
                               }}>
              {
                cancelIcon && cancelIcon != '' ?
                    <Ionicons name={cancelIcon} size={25} color="#fff"/> :
                    <Ionicons name={'md-arrow-back'} size={25} color="#fff"/>
              }
            </TouchableOpacity>:
                  <View style={{width: 60}}/>
            }
            <View style={{flex:1,justifyContent:'flex-start',alignItems: 'center',flexDirection:'row'}}>
              <Text style={{color:'#fff',fontSize:18}}>
                {title}
              </Text>
            </View>
            {optionShows}
            {
              items.length>0?
                  <TouchableOpacity ref="menu"
                                    style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',width:60}}
                                    onPress={()=>{
                                      this.showPopover('menu')
                                    }}
                  >
                    <Ionicons name={'md-more'} size={25} color="#fff"/>
                  </TouchableOpacity>:
                  null
            }
          </View>

          {this.props.children}

          <Popover
              isVisible={this.state.menuVisible}
              fromRect={this.state.buttonRect}
              onRequestClose={()=>{this.closePopover()}}>
            {items}
          </Popover>
        </View>
    )
  }
}

var styles = StyleSheet.create({
  container:{
    flex:1,
  },
  popoverContent: {
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: colors.primaryGray,
  },
  popoverText: {
    color: '#ccc',
    fontSize:14
  }
})

const toolbar ={
  get Toolbar() {return Toolbar},
  get ACTION_ADD() {return ACTION_ADD},
  get ACTION_EDIT() {return ACTION_EDIT},
  get BACK_SHOW(){return BACK_SHOW},
  get BACK_NEVER(){return BACK_NEVER},
  get OPTION_SHOW(){return OPTION_SHOW},
  get OPTION_NEVER(){return OPTION_NEVER},
}

module.exports=toolbar

