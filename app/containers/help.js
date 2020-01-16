import React,{Component} from 'react';
import {View,Text,ScrollView,StyleSheet,TouchableOpacity,Platform} from 'react-native';

import * as authActions from "../actions/auth-actions";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../utils/tools";
import constants from "../resources/constants";
import colors from "../resources/colors";
import {connect} from "react-redux";

import {TopToolBar} from "../components/TopToolBar";
const helpMessage=["欢迎您使用街区超市联盟系统，我们将为您的购物提供物美价廉方便安全的服务。您的采购将不再需要占用您大量的宝贵时间，也不需要预付任何款项，可以在离您最近的超市提货或者选择您最信得过的超市为您服务。",
"在使用本系统之前，您需要首先注册一个账号，我们是采用一个手机一个账号的方式，除了手机号码，您不需要提供任何个人信息。注册后，需要等待人工确定后才可生效，这是为了防止无效注册，因此给您带来的不便，还请您给予谅解。",
    "如有任何疑问可以向我们的任何一家会员超市请求帮助，他们会耐心的为您解答，也可以直接拨打下面投诉电话，我们将出面为您协调。"
]

export class help extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentpage:0,
        };

    }

    componentWillMount() {
        this.props.dispatch(authActions.getCustomerHelp("01"));
        this.props.dispatch(authActions.getCustomerHelp("02"));
        this.props.dispatch(authActions.getCustomerHelp("03"));
    }

    render(){
        // const navigator = this.props.navigation;
        return(
            <View style={styles.container}>
                <View>
                    <TopToolBar title = {this.props.username+'-'+"帮助"} navigation = {this.props.navigation}
                                _onLeftIconPress={this._onVolumeIconPress}
                                _onRightIconPress={this._onHelpIconPress}
                    />
                    <ScrollView
                        ref="myscroll"
                        horizontal={true}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={(e) => this.onAnimationEnd(e)}
                    >

                        {this.allHelp()}
                    </ScrollView>
                    <View style={styles.indicator}>
                        <View style={{flexDirection:"row"}}>
                            {this.addpoint()}
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={()=>this.props.navigation.navigate('AuthStack')}
                    >
                        <View style={{alignItems:"center"}}>
                            <View style={{width:SCREEN_WIDTH*0.4,marginTop:30,backgroundColor:colors.primaryColor,height:SCREEN_HEIGHT*0.05,
                                justifyContent:"center",alignItems:"center",borderRadius:SCREEN_WIDTH*0.02}}
                            >
                                <Text style={{fontSize:16,color:"white",letterSpacing:8}} allowFontScaling={false}>跳过帮助</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                </View>
                <View style={{width:SCREEN_WIDTH,height:SCREEN_HEIGHT*0.06,position:"absolute",bottom:0,backgroundColor:colors.primaryColor}}/>
            </View>

        );
    }

    allHelp(){
        const helpListView = [];
        // const help=this.props.help;
        helpMessage.map((helpItem,i)=>{
                helpListView.push(
                    [

                        <View key={i} style={{
                            width: SCREEN_WIDTH,
                            alignItems: "center",
                            height: SCREEN_HEIGHT * 0.5,
                            marginTop: SCREEN_HEIGHT * 0.1
                        }}>
                            <View style={{
                                width: SCREEN_WIDTH * 0.6,
                                height: SCREEN_HEIGHT * 0.5,
                                backgroundColor: "rgb(220,228,242)",
                                borderRadius: SCREEN_WIDTH * 0.05
                            }}>
                                <ScrollView style={{marginTop: 10}} showsVerticalScrollIndicator={false}>
                                    <Text allowFontScaling={false} style={styles.helpText}>{helpItem}</Text>
                                </ScrollView>
                            </View>
                        </View>,
                    ]
                );

        });
        return helpListView
    }
    //添加指示点
    addpoint() {
        var allpoint = [];
        var changestyle;
        for (var i = 0; i < 3; ++i) {
            changestyle = (i === this.state.currentpage) ? {color: colors.primaryColor} : {color: "rgb(220,228,242)"}
            allpoint.push(
                <Text key={i} style={[styles.point, changestyle]}>&bull;</Text>
            )
        }
        return allpoint;
    }

    //滚动函数
    onAnimationEnd(e) {
        var x = e.nativeEvent.contentOffset.x;
        var page = Math.floor((x+1) / SCREEN_WIDTH);
        this.setState({
            currentpage: page,
        })

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
    helpText:{
        ...Platform.select({
            android: {
                fontFamily: 'lucida grande',
            }
        }),
        fontSize:20,
        padding:20,
        letterSpacing:3,
        lineHeight:20,

    },
});

const mapStateToProps = (state) => ({
    auth: state.get('auth'),
    root: state.get('root'),
    union: state.get('union'),
    help:state.get('auth').get('help'),
    username:state.get('auth').get('username'),
});

export default connect(mapStateToProps)(help)