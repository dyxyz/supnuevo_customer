/**
 * Verify.js
 */

import React, {Component} from "react";
import {Image, StatusBar, StyleSheet, Text, View,ScrollView,TouchableOpacity,TextInput,Alert} from "react-native";
import {connect} from "react-redux";
import {TopToolBar,ACTION_HELP} from '../components/TopToolBar';
import {BottomToolBar, ACTION_BACK, ACTION_DISCOUNT,ACTION_LOGOUT} from '../components/BottomToolBar';
import * as authActions from "../actions/auth-actions";
import strings from "../resources/strings"
import constants from '../resources/constants';
import colors from "../resources/colors";
import * as orderActions from "../actions/order-actions";
import Button from "../components/Button";
import {getTabBarHeight, SCREEN_HEIGHT, SCREEN_WIDTH,showCenterToast} from "../utils/tools";
import Modal from "react-native-modalbox";
import ImageViewer from 'react-native-image-zoom-viewer';
import CountDown from 'react-native-zycountdown';

export class Verify extends Component {


    constructor(props) {
        super(props);
        this.state={
            verifyTel:'',
            verifyCode:null,
            inputCode:null
        };
    }
    // componentWillReceiveProps(){
    //     this.refs.modal.open()
    // }


    // componentWillMount() {
    //     this.refs.modal.open()
    // }

    render() {
        const navigator = this.props.navigation;
        var ts=new Date().getTime();
        return (
            <View style={styles.container}>
                <TopToolBar title = {"Verificación"} navigation = {this.props.navigation}
                            _onLeftIconPress={this._onVolumeIconPress}
                            _onRightIconPress={this._onHelpIconPress}/>
                <View style={{flex:1,backgroundColor:"rgb(220,228,242)",justifyContent:'center'}}>
                    <View>
                        <View style={{alignItems:'center',justifyContent:'space-around'}}>
                            <View>
                                <Text style={{textAlign:'center'}}>
                                    Por seguridad, solamente contás con cinco intentos para obtener el código.
                                </Text>
                            </View>
                            <View style={{width:SCREEN_WIDTH,padding:20,justifyContent:'space-around',alignItems:'center'}}>
                                <TextInput
                                    style={{width:SCREEN_WIDTH*0.6,height:35,backgroundColor:colors.baseWhite,borderRadius:5,padding:5}}
                                    keyboardType={'numeric'}
                                    allowFontScaling={false}
                                    placeholder={strings.input_tel}
                                    placeholderTextColor={colors.baseBlack}
                                    onChangeText={(value) =>{
                                        this.setState({verifyTel:value})

                                    }}
                                />
                                <CountDown
                                    style={{width:'auto',justifyContent:'center',height:40,alignItems:'center',padding:10,borderRadius:5,backgroundColor:colors.primaryColor,marginTop:20}}
                                    textStyle={{color: 'white'}}
                                    count={60}
                                    title={strings.get_code}
                                    behindText={' segs.'}
                                    frontText={'Reenviar código '}
                                    onClick={this.fetchCode}
                                />
                            </View>
                            <View style={{width:SCREEN_WIDTH*0.8,padding:20,justifyContent:'center',alignItems:'center'}}>
                                <Text style={{marginRight:10,fontSize:16}} allowFontScaling={false}>{strings.check_code}:</Text>
                                <TextInput
                                    style={{width:SCREEN_WIDTH*0.6,height:35,backgroundColor:colors.baseWhite,borderRadius:5,padding:5,marginTop:15}}
                                    placeholder={strings.input_code}
                                    allowFontScaling={false}
                                    placeholderTextColor={colors.baseBlack}
                                    keyboardType={'numeric'}
                                    maxLength={4}
                                    onChangeText={(value) =>{
                                        this.setState({inputCode:value})
                                    }}
                                />
                            </View>

                            <TouchableOpacity
                                onPress={()=>{this.verifyFinal()}}
                            >
                                <View style={{backgroundColor:colors.primaryColor,width:'auto',borderRadius:10,padding:10,justifyContent:'center',alignItems:'center',marginTop:50}}>
                                    <Text style={{color:colors.baseWhite,fontSize:18}} allowFontScaling={false}>{strings.confirm}</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>

                <BottomToolBar navigation={this.props.navigation}
                               leftAction={ACTION_BACK}
                               _onLeftIconPress={this._onBackIconPress}
                />
            </View>
        );
    }



    _onVolumeIconPress =() =>{};
    _onHelpIconPress =() =>{};
    fetchCode=()=>{

        if(this.state.verifyTel==null || this.state.verifyTel==''  || this.state.verifyTel==undefined){
            Alert.alert(strings.alertTitle,strings.null_tel)
            return false
        }
        else{
            // var num=Math.random()
            // num=num*10000
            // num=Math.floor(num)
            var checkCode=Math.random()
            var num = checkCode*9000
            num +=1000;
            num=parseInt(num)
            this.setState({verifyCode:num})
            this.props.dispatch(orderActions.sendVerifyCode(this.state.verifyTel.toString(),num.toString()));
            return true

        }


    }

    verifyFinal(){
        if(this.state.inputCode==null || this.state.inputCode==''  || this.state.inputCode==undefined){
            Alert.alert(strings.alertTitle,strings.null_code)
        }
        else{
            if(this.state.inputCode==this.state.verifyCode){
                showCenterToast(strings.verify_success);
                this.props.dispatch(orderActions.setCustomerPhoneChecked(this.state.verifyTel.toString()));
            }
            else{
                Alert.alert(strings.alertTitle,strings.code_error)
            }
        }
        console.log(this.props.phoneChecked)
    }
    _onBackIconPress = () => {
        this.props.navigation.pop()
    };


};

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent: 'center',

    },
    stateWrapper:{
        // flex:1,
        // alignItems:'center',
        // justifyContent: 'center'
        // borderWidth:1,
        marginTop:SCREEN_HEIGHT*0.01,
        width:SCREEN_WIDTH*0.9,
        // paddingTop:20,
        // alignSelf:"flex-start"
    },
    stateText:{
        fontSize:16,
        margin:2,
        lineHeight:18,
    },
    row:{
        height:"auto",
        width:SCREEN_WIDTH,
        padding:15,
        justifyContent:'space-between',
        backgroundColor:colors.baseWhite,
        borderBottomWidth:1,
        borderColor:colors.saperatorLine,
        flexDirection:"row",
        alignItems:"center"
    },
    rowText:{
        fontSize:20
    }
});

const mapStateToProps = (state) => ({
    auth: state.get('auth'),
    unionId:state.get('auth').get('unionId'),
    cartId:state.get('auth').get('cartId'),
    username:state.get('auth').get('username'),
    password:state.get('auth').get('password'),
    root: state.get('root'),
    union: state.get('union'),
});

export default connect(mapStateToProps)(Verify)
