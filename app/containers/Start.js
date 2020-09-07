import React,{Component} from 'react';import {View,Text,ScrollView,StyleSheet,TouchableOpacity,Platform,ImageBackground,Image} from 'react-native';import * as authActions from "../actions/auth-actions";import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../utils/tools";import constants from "../resources/constants";import strings from "../resources/strings"import colors from "../resources/colors";import {connect} from "react-redux";import {SpinnerWrapper} from '../components/SpinnerLoading/index'import DeviceInfo from 'react-native-device-info';import Swiper from 'react-native-swiper'import { getUniqueId, getManufacturer ,getDeviceId} from 'react-native-device-info';let deviceId = DeviceInfo.getUniqueId();import SplashScreen from 'react-native-splash-screen'const startImg = require('../assets/img/start.jpg');export class Start extends Component {    constructor(props) {        super(props);        this.state = {            currentpage:0,        };    }    componentDidMount(){        //3秒后关闭启动页        setTimeout(()=>{this.props.navigation.navigate('help')}, 3000, )    };    render(){        // const navigator = this.props.navigation;        const loading = this.props.root.get('loading');        return(            <View style={{height:SCREEN_HEIGHT,width:SCREEN_WIDTH,backgroundColor: '#000000',alignItems:'center',justifyContent:'center'}}>                <Image source={startImg} style={{height:SCREEN_HEIGHT,width:SCREEN_WIDTH}} />            </View>        );    }    _renderImage(){        var ts=new Date().getTime();        const loading = this.props.root.get('loading');        var dataListView = [];        for(var i=0;i<this.props.helpSeg;i++){            dataListView.push(                [                    <View style={styles.slide1} key={i}>                        {/*<SpinnerWrapper loading={loading} title={strings.wait_login}/>*/}                        <Image source={{uri:strings.head+'help/login/'+(i+1)+'.jpg'+'?'+ts}} style={styles.imageBackgroundStyle}/>                    </View>,                ]            )        }        return dataListView;    }    //添加指示点    addpoint() {        var allpoint = [];        var changestyle;        for (var i = 0; i < this.props.helpSeg; ++i) {            changestyle = (i === this.state.currentpage) ? {color: colors.primaryColor} : {color: "rgb(220,228,242)"}            allpoint.push(                <View key={i}>                    <Text key={i} style={[styles.point, changestyle]} allowFontScaling={false}>&bull;</Text>                </View>            )        }        return allpoint;    }    //滚动函数    onAnimationEnd(e) {        var x = e.nativeEvent.contentOffset.x;        var page = Math.floor((x+1) / SCREEN_WIDTH);        this.setState({            currentpage: page,        })    }    onLoginPress = () => {        this.props.dispatch(authActions.login(deviceId, null));    }    _onVolumeIconPress =() =>{};    _onHelpIconPress =() =>{};}const styles=StyleSheet.create({    container:{        // height:SCREEN_HEIGHT,        flex:1,    },    indicator:{        // borderWidth:1,        // marginTop:15,        justifyContent:"center",        // alignItems:"center",        flexDirection:"row",        width:SCREEN_WIDTH,        height:SCREEN_HEIGHT*0.08,        marginBottom:10,        // backgroundColor:"black",        // opacity:0.5,        // borderWidth:1,    },    point:{        fontSize:35,        color:"blue",        padding:5,    },    helpText:{        ...Platform.select({            android: {                fontFamily: 'lucida grande',            }        }),        fontSize:16,        padding:20,        letterSpacing:3,        lineHeight:20,    },    wrapper: {},    slide1: {        // flex: 1,        width:SCREEN_WIDTH,        height:SCREEN_HEIGHT*0.87,        justifyContent: 'center',        alignItems: 'center',        backgroundColor: '#9DD6EB'    },    slide2: {        flex: 1,        justifyContent: 'center',        alignItems: 'center',        backgroundColor: '#97CAE5'    },    slide3: {        flex: 1,        justifyContent: 'center',        alignItems: 'center',        backgroundColor: '#92BBD9'    },    text: {        color: '#fff',        fontSize: 30,        fontWeight: 'bold'    },    imageBackgroundStyle: {        width: SCREEN_WIDTH*0.9,        height: SCREEN_HEIGHT*0.75,        borderWidth:2,        borderColor:colors.baseWhite    },});const mapStateToProps = (state) => ({    auth: state.get('auth'),    helpSeg:state.get('auth').get('helpSeg'),    root: state.get('root'),    union: state.get('union'),    help:state.get('auth').get('help'),    username:state.get('auth').get('username'),});export default connect(mapStateToProps)(Start)