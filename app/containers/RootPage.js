/**
 * RootPage.js
 */

import React, {Component} from "react";
import {Image, StatusBar, StyleSheet, Text, View,ScrollView,TouchableOpacity,Alert} from "react-native";
import {connect} from "react-redux";
import {ACTION_HELP, TopToolBar} from '../components/TopToolBar';
import {BottomToolBar, ACTION_BACK, ACTION_DISCOUNT,ACTION_LOGOUT,ACTION_SETTING} from '../components/BottomToolBar';
import * as authActions from "../actions/auth-actions";
import strings from "../resources/strings"
import constants from '../resources/constants';
import Button from "../components/Button";
import {getHeaderHeight, getTabBarHeight, SCREEN_HEIGHT, SCREEN_WIDTH} from "../utils/tools";
import Swiper from 'react-native-swiper';
import * as unionActions from "../actions/union-actions";



export class RootPage extends Component {


    constructor(props) {
        super(props);
        this.state={
        };
    }

    componentDidMount() {
        // this.props.dispatch(unionActions.getUnionAdvertisementList(this.props.unionId, 0, 5));

    }



  render() {
    const advertisements = this.props.union.get('advertisements');
    const navigator = this.props.navigation;
    return (
        <View style={styles.container}>
            <TopToolBar
                title = {this.props.union.get("union").unionName}
                navigation = {this.props.navigation}
                        rightAction={ACTION_HELP}
                        _onLeftIconPress={this._onVolumeIconPress}
                        _onRightIconPress={this._onHelpIconPress}/>
            <View style={{marginBottom: getTabBarHeight(),flex:1}}>
                {!advertisements || advertisements.length === 0?
                    <View style={{flex:1.2}}>
                        <Image
                            style={styles.image}
                            source={require('../assets/img/img_logo.png')}
                        />
                    </View>
                    :
                    <View style={{flex:1.2}}>
                        <Swiper
                            loadMinimal
                            loadMinimalSize={1}
                            style={styles.wrapper}
                            loop={true}
                            autoplay={true}
                            showsButtons={true}
                        >
                            {advertisements.map((item, i) => (
                                <TouchableOpacity
                                    key={i}
                                    style={styles.slideCon}
                                    onPress={()=>{this.props.navigation.push("BigPicture",{bigPictureUrl:item.image});}}
                                >
                                    <View style={{alignItems:'center',width:SCREEN_WIDTH,height:SCREEN_HEIGHT*0.5}}>

                                            <Image
                                                style={styles.image}
                                                source={{ uri:strings.head+item.image}}
                                            />
                                        {/*<Text>11111111111</Text>*/}

                                    </View>
                                </TouchableOpacity>
                            ))}
                        </Swiper>
                        {/*<View>*/}
                        {/*<Text>Current Loaded Images: {state.loadQueue}</Text>*/}
                        {/*</View>*/}
                    </View>
                }
                <View style={{flex:1,justifyContent:'space-around'}}>

                    <View style={styles.buttonWrapper}><Button title={strings.select_shop} iconName={'isv'} onPress={()=>navigator.push('UnionStack')}/></View>
                    {this.props.unionId == null || this.props.unionId == undefined?

                            <View style={styles.buttonWrapper}><Button title={strings.shopping} iconName={'shoppingcart'} onPress={() => {Alert.alert(strings.alertTitle,strings.shopping_with_union)}}/></View>

                        :

                            <View style={styles.buttonWrapper}><Button title={strings.shopping} iconName={'shoppingcart'} onPress={() => navigator.push('ShoppingStack')}/></View>

                    }

                    <View style={styles.buttonWrapper}><Button title={strings.my_order} iconName={'pay-circle-o1'} onPress={()=>navigator.push('OrderStack')}/></View>
                </View>

            </View>





            <BottomToolBar
                navigation = {this.props.navigation}
                leftAction = {ACTION_SETTING}
                _onLeftIconPress = {this._toSetting}
                isRoot={false}
                // rightAction = {ACTION_LOGOUT}
                // _onRightIconPress = {this._onLogOutIconPress}
            />
        </View>
    );
  }



    _onVolumeIconPress =() =>{};
    _toSetting =() =>{this.props.navigation.navigate('Setting')};
    _onHelpIconPress =() =>{this.props.navigation.navigate('RootState')};
    _onLogOutIconPress=()=>{this.props.dispatch(authActions.logout(1,this.props.username,this.props.password));
        this.props.navigation.navigate('AuthStack');
    }

};

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent: 'center'
    },
    buttonWrapper:{
        flex:1,
        alignItems:'center',
        justifyContent: 'center',
    },
    wrapper: {},

    slideCon: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    image: {
        width:SCREEN_WIDTH,
        flex: 1,
        backgroundColor: 'transparent'
    },

    loadingView: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,.5)'
    },

    loadingImage: {
        width: 60,
        height: 60
    }
});

const mapStateToProps = (state) => ({
    union: state.get("union"),
    auth: state.get('auth'),
    unionId:state.get('auth').get('unionId'),
    merchantId:state.get('auth').get('merchantId'),
    cartId:state.get('auth').get('cartId'),
    username:state.get('auth').get('username'),
    password:state.get('auth').get('password'),
    root: state.get('root'),
});

export default connect(mapStateToProps)(RootPage)
