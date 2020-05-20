/**
 * ShoppingCart.js
 */

import React, {Component} from 'react';
import {ScrollView, View,StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import colors from '../resources/colors';
import { SCREEN_WIDTH,SCREEN_HEIGHT} from '../utils/tools';
import {Badge,Slider} from "react-native-elements";
import SwipeableView from "./SwipeableView";
import constants from '../resources/constants';
import strings from "../resources/strings";
var _scrollView: ScrollView;

export default class ShoppingCart extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state={
      value:0,
       condition:false,
    }


  }

    // componentWillUnmount(){
    //     const cartInfo = this.props.cartInfo
    //     var x=cartInfo.length*SCREEN_WIDTH*0.25-SCREEN_WIDTH
    //     console.log(x)
    //     if(x<0){
    //         this.setState({condition:true})
    //     }
    //     else{
    //         this.setState({condition:false})
    //     }
    // }

  render() {
    const cartInfo = this.props.cartInfo;
      var x=this.props.cartInfo.length*SCREEN_WIDTH*0.25-SCREEN_WIDTH
    return(
        <View style={styles.container}>

        <ScrollView
            ref={(scrollView) => { _scrollView = scrollView; }}
            horizontal={true}
            contentContainerStyle = {styles.centerContainer}
            showsHorizontalScrollIndicator={false}
        >

            {this._renderCartItems(cartInfo)}

        </ScrollView >
            {
              x>0?
                  <Slider
                      maximumTrackTintColor={colors.baseWhite}
                      value={this.state.value}
                      onValueChange={(value)=>this.scroll(value,cartInfo.length)}
                  />
                  :
                  null
            }

        </View>

    )
  }
    scroll(value,length){
        var x=length*SCREEN_WIDTH*0.25-SCREEN_WIDTH
        this.setState({value:value})
        if(x>0)
        {

            _scrollView.scrollTo({ x: x*value, animated: true})
        }


    }

  _renderCartItems(cartInfo){
    if(!cartInfo || cartInfo.length === 0)return;
    var cartItemList = [];
    cartInfo.map((item,i)=>{
      // const image = item.imageUrl && item.imageUrl!==undefined?{uri:strings.head+item.imageUrl}:require('../assets/img/img_logo.png')
      cartItemList.push
      (

            <View style={{width: SCREEN_WIDTH*0.24, height: SCREEN_HEIGHT*0.17,alignItems:"center",justifyContent:"center",marginLeft:SCREEN_WIDTH*0.01}}>
              <Badge value={item.amount} status="error" containerStyle={{ position: 'absolute', top: 1, right: 1 }}/>


              <SwipeableView key={i} swipeableStyle={styles.picStyle}
                             swipeRow={"col"}
                             onDownSwipe={()=>this.props._onUpdateCartCommodity(constants.CART_DECLINE, item)}
                             onUpSwipe={()=>this.props._onUpdateCartCommodity(constants.CART_ADD, item)}
                             onMorePress={()=>this.props.navigateToDetail(item)}
                             onLeftSwipe={()=>{}}
                             onRightSwipe={()=>{}}
              >

                <TouchableOpacity
                    onPress={()=>this.props.navigateToDetail(item)}
                >
                  {
                      item.imageUrl !=null && item.imageUrl!=undefined?
                    <Image resizeMode="contain" style={{width:SCREEN_WIDTH*0.15, height: SCREEN_HEIGHT*0.10,}} source={{uri:strings.head+item.imageUrl}}/>
                          :
                    <Text allowFontScaling={false}>{item.nombre}</Text>
                  }

                </TouchableOpacity>

              </SwipeableView>


            </View>


      );
    });
    return cartItemList;
  };

}

var styles = StyleSheet.create({
  container:{
    height:SCREEN_HEIGHT*0.24,
    width:SCREEN_WIDTH,
  },
  IconContainerStyle:{
    width: 60,
    justifyContent: 'center',
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
  },
  picStyle: {
    width: SCREEN_WIDTH*0.18,
    height: SCREEN_HEIGHT*0.12,
    margin:10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.8,
    borderColor: colors.primaryGrayLight,
    borderRadius:SCREEN_WIDTH*0.02,
  },
  centerContainer:{
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

