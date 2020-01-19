/**
 * ShoppingCart.js
 */

import React, {Component} from 'react';
import {ScrollView, View,StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import colors from '../resources/colors';
import { SCREEN_WIDTH,SCREEN_HEIGHT} from '../utils/tools';
import {Badge} from "react-native-elements";
import SwipeableView from "./SwipeableView";
import constants from '../resources/constants';
import strings from "../resources/strings";

export default class ShoppingCart extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state={
    }
  }

  render() {
    const cartInfo = this.props.cartInfo;
    return(
        <View style={styles.container}>

        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            contentContainerStyle = {styles.centerContainer}
        >

            {this._renderCartItems(cartInfo)}

        </ScrollView>
        </View>

    )
  }

  _renderCartItems(cartInfo){
    if(!cartInfo || cartInfo.length === 0)return;
    var cartItemList = [];
    cartInfo.map((item,i)=>{
      // const image = item.imageUrl && item.imageUrl!==undefined?{uri:strings.head+item.imageUrl}:require('../assets/img/img_logo.png')
      cartItemList.push
      (

            <View style={{width: SCREEN_WIDTH*0.24, height: SCREEN_HEIGHT*0.15,alignItems:"center",justifyContent:"center",marginLeft:10}}>
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
                    <Text>{item.nombre}</Text>
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
    height:SCREEN_HEIGHT*0.18,
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

