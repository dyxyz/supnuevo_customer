import React,{Component} from 'react';
import {View,Text,ScrollView,StyleSheet,TouchableOpacity} from 'react-native';

import * as authActions from "../actions/auth-actions";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../utils/tools";
import constants from "../resources/constants";
import strings from "../resources/strings";
import colors from "../resources/colors";
import {connect} from "react-redux";

import {TopToolBar} from "../components/TopToolBar";
import {UnionList} from "./union/UnionList";

export class loggedHelp extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };

    }


    render(){

        return(
            <View style={styles.container}>
                <View>
                    <TopToolBar title = {strings.help} navigation = {this.props.navigation}
                                _onLeftIconPress={this._onVolumeIconPress}
                                _onRightIconPress={this._onHelpIconPress}
                    />
                    <View>
                        <View  style={{width:SCREEN_WIDTH,alignItems:"center",height:SCREEN_HEIGHT*0.6,marginTop:SCREEN_HEIGHT*0.05}}>
                            <View style={{width:SCREEN_WIDTH*0.65,height:SCREEN_HEIGHT*0.6,backgroundColor:"rgb(220,228,242)",borderRadius:SCREEN_WIDTH*0.05}}>
                                <ScrollView style={{marginTop:10}}>
                                    <Text style={{fontSize:20,padding:20,letterSpacing:3,lineHeight:20}} allowFontScaling={false}>Ha iniciado con éxito la sesión en SUPNUEVO alianza de supermercados en barrios. Por favor acceda a "Elegir mi comercio" y seleccione el comercio más próximo a su domicilio. Luego pulse " Comprar" para realizar su pedido y por último "Enviar pedido". ¡Listo, solo falta esperar su compra!!</Text>
                                </ScrollView>
                            </View>
                        </View>
                        {/*{this.allHelp()}*/}
                    </View>

                    <TouchableOpacity
                        onPress={()=>this.props.navigation.navigate('UnionList')}
                    >
                        <View style={{alignItems:"center"}}>
                            <View style={{width:SCREEN_WIDTH*0.4,marginTop:SCREEN_HEIGHT*0.05,backgroundColor:colors.primaryColor,height:SCREEN_HEIGHT*0.05,
                                justifyContent:"center",alignItems:"center",borderRadius:SCREEN_WIDTH*0.02}}
                            >
                                <Text style={{fontSize:16,color:"white",letterSpacing:0}} allowFontScaling={false}>{strings.skip_help}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                </View>
                <View style={{width:SCREEN_WIDTH,height:SCREEN_HEIGHT*0.06,position:"absolute",bottom:0,backgroundColor:colors.primaryColor}}/>
            </View>


        );
    }

    // allHelp(){
    //     const loggedHelp=this.props.loggedHelp;
    //     const loggedHelp=['Ha iniciado con éxito la sesión en SUPNUEVO alianza de supermercados  ' +
    //     'en barrios. Por favor acceda a "Elegir mi comercio" y seleccione el comercio más próximo a su domicilio. ' +
    //     'Luego pulse " Comprar" para realizar su pedido y por último "Enviar pedido". ¡Listo, solo falta esperar su compra!!'];
    //     const helpListView = [];
    //     loggedHelp.map((helpItem,i)=>{
    //         helpListView.push(
    //             [
    //                 <View key={i} style={{width:SCREEN_WIDTH,alignItems:"center",height:SCREEN_HEIGHT*0.6,marginTop:SCREEN_HEIGHT*0.05}}>
    //                     <View style={{width:SCREEN_WIDTH*0.65,height:SCREEN_HEIGHT*0.6,backgroundColor:"rgb(220,228,242)",borderRadius:SCREEN_WIDTH*0.05}}>
    //                         <ScrollView style={{marginTop:10}}>
    //                             <Text style={{fontSize:20,padding:20,letterSpacing:3,lineHeight:20}} allowFontScaling={false}>{helpItem.enContent}</Text>
    //                         </ScrollView>
    //                     </View>
    //                 </View>,
    //             ]
    //         );
    //     });
    //     return helpListView;
    //
    // }


    _onVolumeIconPress =() =>{};

    _onHelpIconPress =() =>{};


}

const styles=StyleSheet.create({
    container:{
        // height:SCREEN_HEIGHT,
        flex:1,
    },

    indicator:{
        marginTop:15,
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
        width:SCREEN_WIDTH,
        height:30,
        // backgroundColor:"black",
        // opacity:0.5,
        // borderWidth:1,

    },
    point:{
        fontSize:35,
        color:"blue",
        paddingRight:10,
    }
});

const mapStateToProps = (state) => ({
    auth: state.get('auth'),
    loggedHelp:state.get('auth').get('loggedHelp'),
    root: state.get('root'),
    union: state.get('union'),
    help:state.get('auth').get('help'),
    username:state.get('auth').get('username'),
});

export default connect(mapStateToProps)(loggedHelp)
