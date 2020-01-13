import React,{Component} from 'react';
import {View,Text,ScrollView,StyleSheet,TouchableOpacity,Platform,Image} from 'react-native';

import * as authActions from "../actions/auth-actions";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../utils/tools";
import constants from "../resources/constants";
import colors from "../resources/colors";
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from "react-redux";
import {TopToolBar} from "../components/TopToolBar";
import {ACTION_BACK,BottomToolBar} from "../components/BottomToolBar";
import strings from "../resources/strings"


export class commodityDetail extends Component{
    constructor(props){
        super(props);
        this.state={

        };
    }

    render(){
        const detail=this.props.navigation.state.params.price;
        const imageuri =strings.head+ detail.imageUrl;
        return(
            <View style={styles.container}>
                <TopToolBar title = "商品详情" navigation = {this.props.navigation}
                            _onLeftIconPress={this._onVolumeIconPress}
                            _onRightIconPress={this._onHelpIconPress}
                />

                <View style={{alignItems:"center"}}>
                    <View style={{marginTop:SCREEN_HEIGHT*0.1}}>
                        {
                            detail.imageUrl==null || detail.imageUrl==undefined ?
                                <Icon name="photo" size={SCREEN_HEIGHT*0.3} color='rgb(112,112,112)'/>
                                :
                                <Image resizeMode="contain" style={{
                                    width: SCREEN_HEIGHT*0.3,
                                    height: SCREEN_HEIGHT*0.3,
                                }}
                                       source={{uri:imageuri}}
                                />
                        }
                    </View>
                    <View style={[styles.detail,{marginTop:SCREEN_HEIGHT*0.1}]}>
                        <Text style={styles.textStyle}>商品条码：{detail.codigo}</Text>
                    </View>
                    <View style={styles.detail}>
                        <Text style={styles.textStyle}>商品简称：{detail.nombre}</Text>
                    </View>
                    <View style={styles.detail}>
                        <Text style={styles.textStyle}>商品全称：{detail.commodityName}</Text>
                    </View>
                    <View style={styles.detail}>
                        <Text style={styles.textStyle}>商品价格：{detail.price}</Text>
                    </View>
                </View>
                <BottomToolBar navigation={this.props.navigation}
                               leftAction={ACTION_BACK}
                               _onLeftIconPress={this._onBackIconPress}
                />
            </View>
        );
    }

    _onBackIconPress = () => {
        this.props.navigation.pop()
    };

}

const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    detail:{
        height:SCREEN_HEIGHT*0.06,
        width:"100%",
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:10,
        // borderBottomWidth:2,
        // borderColor:colors.baseWhite,
        marginTop:8,
        backgroundColor:'rgb(236,154,64)',
    },
    textStyle:{
        color:colors.baseWhite,
        fontWeight:"bold",
        fontSize:16,
    }
});

const mapStateToProps = (state) => ({
    auth: state.get('auth'),
    root: state.get('root'),
    union: state.get('union'),
});

export default connect(mapStateToProps)(commodityDetail)
