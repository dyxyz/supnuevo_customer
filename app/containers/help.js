import React,{Component} from 'react';
import {View,Text,ScrollView,StyleSheet,TouchableOpacity,Platform,ImageBackground,Image} from 'react-native';

import * as authActions from "../actions/auth-actions";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../utils/tools";
import constants from "../resources/constants";
import strings from "../resources/strings"
import colors from "../resources/colors";
import {connect} from "react-redux";
import {SpinnerWrapper} from '../components/SpinnerLoading/index'
import DeviceInfo from 'react-native-device-info';
import Swiper from 'react-native-swiper'
import { getUniqueId, getManufacturer ,getDeviceId} from 'react-native-device-info';
let deviceId = DeviceInfo.getUniqueId();
const backgroundImg = require('../assets/img/app_background_img.jpg');

import {TopToolBar, ACTION_SPACE, ACTION_SKIP} from "../components/TopToolBar";
// const helpMessage=["欢迎您使用街区超市联盟系统，我们将为您的购物提供物美价廉方便安全的服务。您的采购将不再需要占用您大量的宝贵时间，也不需要预付任何款项，可以在离您最近的超市提货或者选择您最信得过的超市为您服务。",
// "在使用本系统之前，您需要首先注册一个账号，我们是采用一个手机一个账号的方式，除了手机号码，您不需要提供任何个人信息。注册后，需要等待人工确定后才可生效，这是为了防止无效注册，因此给您带来的不便，还请您给予谅解。",
//     "如有任何疑问可以向我们的任何一家会员超市请求帮助，他们会耐心的为您解答，也可以直接拨打下面投诉电话，我们将出面为您协调。"
// ]

export class help extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentpage:0,
        };

    }

    componentWillMount() {
        this.props.dispatch(authActions.getCustomerHelp("01"));
        // this.props.dispatch(authActions.getCustomerHelp("02"));
        // this.props.dispatch(authActions.getCustomerHelp("03"));
    }

    componentDidUpdate(){
        const isLoggedIn = this.props.auth.get('isLoggedIn');
        if (isLoggedIn) {
            this.props.navigation.navigate('UnionList'); //自动登录
        }

        this.props.dispatch(authActions.resetLoginStatus());
    }

    render(){
        // const navigator = this.props.navigation;
        const loading = this.props.root.get('loading');
        return(
            <View style={{height:SCREEN_HEIGHT,width:SCREEN_WIDTH,backgroundColor: '#9DD6EB',alignItems:'center'}}>

                <ScrollView
                    ref="myscroll"
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={(e) => this.onAnimationEnd(e)}
                >

                    {this._renderImage()}
                </ScrollView>
                <TouchableOpacity
                    onPress={this.onLoginPress}
                >
                    <View style={{width:SCREEN_WIDTH*0.4,marginTop:SCREEN_HEIGHT*0.05,backgroundColor:colors.primaryColor,height:SCREEN_HEIGHT*0.05,
                        justifyContent:"center",alignItems:"center",borderRadius:SCREEN_WIDTH*0.02}}>
                        <Text style={{fontSize:16,color:"white",letterSpacing:0}} allowFontScaling={false}>Continuar</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.indicator}>
                    <View style={{flexDirection:"row",justifyContent:'space-around'}}>
                        {this.addpoint()}
                    </View>
                </View>
                {/*<TouchableOpacity*/}
                    {/*onPress={this.onLoginPress}*/}
                {/*>*/}
                    {/*<View style={{alignItems:"center"}}>*/}
                        {/*<View style={{width:SCREEN_WIDTH*0.4,marginTop:30,backgroundColor:colors.primaryColor,height:SCREEN_HEIGHT*0.05,*/}
                            {/*justifyContent:"center",alignItems:"center",borderRadius:SCREEN_WIDTH*0.02}}*/}
                        {/*>*/}
                            {/*<Text style={{fontSize:16,color:"white",letterSpacing:0}} allowFontScaling={false}>{strings.skip_help}</Text>*/}
                        {/*</View>*/}
                    {/*</View>*/}
                {/*</TouchableOpacity>*/}
                <SpinnerWrapper loading={loading} title={strings.wait_login}/>

            </View>

        );
    }

    _renderImage(){
        var ts=new Date().getTime();
        const loading = this.props.root.get('loading');
        var dataListView = [];
        for(var i=0;i<this.props.helpSeg;i++){
            dataListView.push(
                [
                    <View style={styles.slide1} key={i}>
                    {/*<SpinnerWrapper loading={loading} title={strings.wait_login}/>*/}
                        <Image source={{uri:strings.head+'help/login/'+(i+1)+'.jpg'+'?'+ts}} style={styles.imageBackgroundStyle}/>



                    </View>,
                ]

            )
        }
        return dataListView;
    }


    //添加指示点
    addpoint() {
        var allpoint = [];
        var changestyle;
        for (var i = 0; i < this.props.helpSeg; ++i) {
            changestyle = (i === this.state.currentpage) ? {color: colors.primaryColor} : {color: "rgb(220,228,242)"}
            allpoint.push(
                <View key={i}>
                <Text key={i} style={[styles.point, changestyle]} allowFontScaling={false}>&bull;</Text>
                </View>
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

    onLoginPress = () => {
        this.props.dispatch(authActions.login(deviceId, null));
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
        // borderWidth:1,
        // marginTop:15,
        justifyContent:"center",
        // alignItems:"center",
        flexDirection:"row",
        width:SCREEN_WIDTH,
        height:SCREEN_HEIGHT*0.08,
        marginBottom:10,
        // backgroundColor:"black",
        // opacity:0.5,
        // borderWidth:1,

    },
    point:{
        fontSize:35,
        color:"blue",
        padding:5,

    },
    helpText:{
        ...Platform.select({
            android: {
                fontFamily: 'lucida grande',
            }
        }),
        fontSize:16,
        padding:20,
        letterSpacing:3,
        lineHeight:20,
    },
    wrapper: {},
    slide1: {
        // flex: 1,
        width:SCREEN_WIDTH,
        height:SCREEN_HEIGHT*0.87,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    imageBackgroundStyle: {
        width: SCREEN_WIDTH*0.9,
        height: SCREEN_HEIGHT*0.75,
        borderWidth:2,
        borderColor:colors.baseWhite
    },
});

const mapStateToProps = (state) => ({
    auth: state.get('auth'),
    helpSeg:state.get('auth').get('helpSeg'),
    root: state.get('root'),
    union: state.get('union'),
    help:state.get('auth').get('help'),
    username:state.get('auth').get('username'),
});

export default connect(mapStateToProps)(help)
