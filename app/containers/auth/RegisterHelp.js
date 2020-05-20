import React,{Component} from 'react';
import {View,Text,ScrollView,StyleSheet,TouchableOpacity,Platform} from 'react-native';

import * as authActions from "../../actions/auth-actions";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../../utils/tools";
import constants from "../../resources/constants";
import colors from "../../resources/colors";
import strings from '../../resources/strings';
import {connect} from "react-redux";

import {TopToolBar} from "../../components/TopToolBar";


export class registerHelp extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };

    }



    render(){
        // const navigator = this.props.navigation;

        return(
            <View style={styles.container}>
                <View>
                    <TopToolBar title = {strings.commit} navigation = {this.props.navigation}
                                _onLeftIconPress={this._onVolumeIconPress}
                                _onRightIconPress={this._onHelpIconPress}
                    />
                    <View>

                        {this.allHelp()}
                    </View>

                    <TouchableOpacity
                        onPress={()=>this.props.navigation.navigate('Login')}
                    >
                        <View style={{alignItems:"center"}}>
                            <View style={{width:SCREEN_WIDTH*0.4,marginTop:SCREEN_HEIGHT*0.1,backgroundColor:colors.primaryColor,height:SCREEN_HEIGHT*0.05,
                                justifyContent:"center",alignItems:"center",borderRadius:SCREEN_WIDTH*0.02}}
                            >
                                <Text style={{fontSize:16,color:"white",letterSpacing:8}} allowFontScaling={false}>{strings.out}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                </View>
                <View style={{width:SCREEN_WIDTH,height:SCREEN_HEIGHT*0.06,position:"absolute",bottom:0,backgroundColor:colors.primaryColor}}/>
            </View>


        );
    }

    allHelp(){
        const registerHelp=this.props.registerHelp;
        const helpListView = [];
        registerHelp.map((helpItem,i)=>{
            helpListView.push(
                [
                    <View key={i} style={{width:SCREEN_WIDTH,alignItems:"center",height:SCREEN_HEIGHT*0.5,marginTop:SCREEN_HEIGHT*0.1}}>
                        <View style={{width:SCREEN_WIDTH*0.6,height:SCREEN_HEIGHT*0.5,backgroundColor:"rgb(220,228,242)",borderRadius:SCREEN_WIDTH*0.05}}>
                            <ScrollView style={{marginTop: 10}} showsVerticalScrollIndicator={false}>
                                <Text style={styles.registerStyle} allowFontScaling={false}>{helpItem.enContent}</Text>
                            </ScrollView>
                        </View>
                    </View>,
                ]
            );
        });
        return helpListView;

    }


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
    },
    registerStyle:{
        lineHeight:20,
        fontSize:20,
        padding:20,
        letterSpacing:3,
    }
});

const mapStateToProps = (state) => ({
    auth: state.get('auth'),
    registerHelp:state.get('auth').get('registerHelp'),
    root: state.get('root'),
    union: state.get('union'),
    help:state.get('auth').get('help'),
    username:state.get('auth').get('username'),
});

export default connect(mapStateToProps)(registerHelp)
