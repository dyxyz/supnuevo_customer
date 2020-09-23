/**
 * OrderCommit.js
 */

// 组件
import React, {Component} from "react";
import {
    Image, StatusBar, Text, TouchableOpacity, View, Dimensions, KeyboardAvoidingView, Platform, SafeAreaView,
    StyleSheet, ScrollView, Alert, ListView,FlatList,TextInput
} from "react-native";
import {
    isEmptyObject,
    isObject,
    getHeaderHeight,
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
    showCenterToast
} from "../../utils/tools";
import {connect} from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';
import {ACTION_SKIP, TopToolBar, ACTION_SPACE, ACTION_TEL, ACTION_HELP} from "../../components/TopToolBar";
import IconA from "react-native-vector-icons/AntDesign"
import {ACTION_BACK, BottomToolBar,ACTION_HISTORY,ACTION_RULE} from "../../components/BottomToolBar";
import {InformationItem,TYPE_TEXT} from "../../components/InformationItem";
import {Button, CheckBox} from "react-native-elements";
import {DropdownCell, OrderDropdownCell} from "../../components/modalDropdownBar/index";
import {Avatar, ListItem} from "react-native-elements";
import colors from '../../resources/colors'
import strings from "../../resources/strings";
import constants from "../../resources/constants";
import TableView from "../../components/TableView";
import * as orderActions from "../../actions/order-actions";
import * as authActions from "../../actions/auth-actions";
import {transFromOrderItemToArray, transFromDiscountItemToArray, toDecimal2} from '../../utils/tools';
import Modal from "react-native-modalbox";
import DatePicker from "react-native-datepicker";
import CountDown from 'react-native-zycountdown';
import {InputWithClearButton, InputWithActionSheet, InputWithCalendar} from '../../components/multiFuncTextInput/index'
import * as shoppingActions from "../../actions/shopping-actions";
// import {SCREEN_WIDTH, SCREEN_HEIGHT} from "../../utils/tools";

let receiverNameList = [];
let receiverPhoneList = [];
let receiverAddrList = [];
let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


export class OrderCommit extends Component {

    constructor(props) {

        super(props);
        this.state = {
            deliveryInfo: {receiverName:this.props.auth.get("customerInfo").defaultReceiverName,receiverPhone:this.props.auth.get("customerInfo").defaultReceiverPhone,receiverAddr:this.props.auth.get("customerInfo").defaultReceiverAddr,deliveryType:constants.COMMON_DELIVERY,datetime:this.getMyDate(),agree:true},
            deliveryAddType: constants.ADDR_TYPE,
            deliveryTextInput: "",
            verifyTel:'',
            verifyCode:null,
            inputCode:null,
        };
    }

    componentDidMount() {
        this.props.dispatch(orderActions.getOrderPrevInfo());
    }

    componentWillReceiveProps(nextProps) {
        const orderResponse = this.props.order.get('dataResponse');
        const nextOrderResponse = nextProps.order.get('dataResponse');

        const authResponse = this.props.auth.get("dataResponse");
        const nextAuthResponse = nextProps.auth.get("dataResponse");

        // 获取当前订单
        if (orderResponse === constants.INITIAL && nextOrderResponse === constants.GET_PREV_ORDER_SUCCESS) {
            this.props.dispatch(orderActions.resetOrderResponse());
        }else if (orderResponse === constants.INITIAL && nextOrderResponse === constants.GET_PREV_ORDER_FAIL){
            if(this.props.cartInfo.length==0){
                showCenterToast(strings.empty_car);
            }
            else {
                showCenterToast(strings.getPrevOrderFail);
                this.props.dispatch(orderActions.resetOrderResponse());
            }
        }
        // 提交订单
        if (orderResponse === constants.INITIAL && nextOrderResponse === constants.SUBMIT_ORDER_INFO_SUCCESS) {

            this.props.dispatch(orderActions.resetOrderResponse());
        }else if (orderResponse === constants.INITIAL && nextOrderResponse === constants.SUBMIT_ORDER_INFO_FAIL){
            showCenterToast(strings.submitOrderFail);
            this.props.dispatch(orderActions.resetOrderResponse());
        }
        // 添加配送信息
        if (authResponse === constants.INITIAL && nextAuthResponse === constants.ADD_RECEIVER_INFO_SUCCESS) {
            this.props.dispatch(authActions.resetAuthResponse());
            this.refs.modal.close();
        }else if (authResponse === constants.INITIAL && nextAuthResponse === constants.ADD_RECEIVER_INFO_FAIL){
            showCenterToast(strings.addCustomerReceiverInfoFail);
            this.props.dispatch(authActions.resetAuthResponse());
        }
    }

    render() {
        const orderItemList = this.props.order.get("orderItemList");
        const discountItemList = this.props.order.get("discountItemList");
        const totalFee = this.props.order.get("totalFee");
        const discountFee = this.props.order.get("discountFee");
        const totalFeeFinal = this.props.order.get("totalFeeFinal");
        const totalDiscount = this.props.order.get("totalDiscount");
        const orderDiscountFee = this.props.order.get("orderDiscountFee");
        const orderDiscountScale = this.props.order.get("orderDiscountScale");


        this._getDeliverInfo();

        return (
            <View style={[styles.container,{backgroundColor:'#9DD6EB'}]}>
                <TopToolBar title = 'Enviar' navigation = {this.props.navigation}
                            _onLeftIconPress={this._onSkipCarPress}
                            leftAction = {ACTION_SKIP}
                            flag={1}
                            _onRightIconPress={this._onChangeTelPress}
                            rightAction={ACTION_HELP}
                />

                <ScrollView style={styles.scrollView}>
                    <View style={styles.scrollViewContanier}>
                        {this._renderBasicInfo()}

                        {this._renderDeliverInfo()}
                        {this._renderCartInfo(orderItemList, totalFee,discountFee,orderDiscountFee, totalFeeFinal,totalDiscount)}
                        {this._renderDiscountInfo(discountItemList, discountFee, orderDiscountFee,orderDiscountScale,totalDiscount)}
                        {this._renderAgree()}
                        {this._renderCommitButton()}
                        {/*<View style={styles.auxContainerStyle}>*/}
                        {/*<Text style={styles.auxTextStyle} allowFontScaling={false}>Total: {toDecimal2(totalFee)}</Text>*/}
                        {/*</View>*/}
                    </View>
                </ScrollView>



                {this._renderModal()}
                {this._renderVerify()}
                {this._renderClause()}
                <BottomToolBar navigation = {this.props.navigation}
                               leftAction={ACTION_HISTORY}
                               _onLeftIconPress={this._onHistoryIconPress}
                               rightAction={ACTION_RULE}
                               _onRightIconPress={this._onRuleIconPress}
                />
            </View>
        );
    }



    _renderBasicInfo(){
        const customerInfo = this.props.auth.get("customerInfo");
        const merchant = this.props.union.get("merchant");
        const deliveryInfo=this.state.deliveryInfo;
        const union = this.props.union.get("union");

        return(
            <View style={styles.basicInfoContainer}>
                <InformationItem key = {0} type = {TYPE_TEXT} title = {strings.customerMobilePhone} content = {this.props.mobilePhone}/>
                <InformationItem key = {1} type = {TYPE_TEXT} title = {strings.now_union} content = {union.unionName}/>

                {/*<InformationItem key = {0} type = {TYPE_TEXT} title = {strings.customerMobilePhone} content = {this.props.phoneChecked}/>*/}
                {/*<InformationItem key = {1} type = {TYPE_TEXT} title = {strings.now_union} content = {this.state.date}/>*/}
                {/*<InformationItem key = {1} type = {TYPE_TEXT} title = {strings.deliverMobilePhone} content = {merchant?merchant.cuit:''}/>*/}
                {/*<InformationItem key = {2} type = {TYPE_TEXT} title = {strings.deliverAddress} content = {merchant?merchant.direccion:''}/>*/}
            </View>
        );
    }

    getMyDate() {
        var date = new Date();

        var year = date.getFullYear().toString();
        var month = (date.getMonth()+1).toString();
        var day = date.getDate().toString();
        var hour =  (date.getHours()+1).toString();
        var minute = date.getMinutes().toString();

        // return year+'-'+month+'-'+day+'-'+' '+hour+':'+minute;
        return day+'-'+month+' '+hour+':'+minute;
    };

    getToday() {
        var date = new Date();

        var year = date.getFullYear().toString();
        var month = (date.getMonth()+1).toString();
        var day = date.getDate().toString();

        return year+'-'+month+'-'+day;
    };

    getSubmitDate() {
        var date = new Date();

        var year = date.getFullYear().toString();
        var month = (date.getMonth()+1).toString();
        var day = date.getDate().toString();
        var hour =  (date.getHours()+1).toString();
        var minute = date.getMinutes().toString();

        return year+'-'+month+'-'+day+'-'+' '+hour+':'+minute;
        // return day+'-'+month+' '+hour+':'+minute;
    };

    getPlusFiveDate() {
        var date = new Date();

        var year = date.getFullYear().toString();
        var month = (date.getMonth()+1).toString();
        var day = date.getDate().toString();
        var hour =  (date.getHours()+1).toString();
        var minute = (date.getMinutes()+5).toString();

        // return year+'-'+month+'-'+day+'-'+' '+hour+':'+minute;
        return day+'-'+month+' '+hour+':'+minute;
    };

    getMinDate() {
        var date = new Date();

        var year = date.getFullYear().toString();
        var month = (date.getMonth()+1).toString();
        var day = date.getDate().toString();
        var hour =  (date.getHours()+1).toString();
        var minute = date.getMinutes().toString();

        return year+'-'+month+'-'+day+'-'+' '+hour+':'+minute;
    };


    _renderDeliverInfo(){
        var {deliveryType} = this.state.deliveryInfo;
        const merchant = this.props.union.get("merchant");
        const customerInfo = this.props.auth.get("customerInfo");
        return(
            <View style={[styles.deliverInfoCard,{backgroundColor:colors.baseWhite}]}>
                <View style={{width:SCREEN_WIDTH-40,flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                    <CheckBox containerStyle={{width:SCREEN_WIDTH*0.38,borderWidth:1,fontSize:6}} title={strings.common_delivery}  checkedIcon='dot-circle-o' uncheckedIcon='circle-o' checked={deliveryType === constants.COMMON_DELIVERY} onPress={() => this.setState({deliveryInfo:Object.assign(this.state.deliveryInfo,{deliveryType: constants.COMMON_DELIVERY})})}/>
                    <CheckBox containerStyle={{width:SCREEN_WIDTH*0.38,borderWidth:1,fontSize:6}} title={strings.self_delivery}  checkedIcon='dot-circle-o' uncheckedIcon='circle-o' checked={deliveryType === constants.SELF_DELIVERY} onPress={() =>this.checkMerchant()  }/>
                </View>
                {
                    deliveryType == constants.COMMON_DELIVERY?
                        <View>
                            {/*<OrderDropdownCell defaultValue={strings.receiverAddr_input} dataList={receiverAddrList} onDropDownSelect={this._onReceiverAddrSelect} onButtonPress={this._onReceiverAddrPress}/>*/}
                            {/*<OrderDropdownCell defaultValue={strings.receiverPhone_input} dataList={receiverPhoneList} onDropDownSelect={this._onReceiverPhoneSelect} onButtonPress={this._onReceiverPhonePress}/>*/}
                            {/*<OrderDropdownCell defaultValue={strings.receiverName_input} dataList={receiverNameList} onDropDownSelect={this._onReceiverNameSelect} onButtonPress={this._onReceiverNamePress}/>*/}
                            <TouchableOpacity onPress={this._onReceiverAddrPress}>
                                {this.state.deliveryInfo.receiverAddr==null?
                                    <View style={styles.receiverInfo}>
                                        <Text allowFontScaling={false}>{strings.receiverAddr_input}</Text>
                                        <Icon name="angle-right" size={30} color='rgba(62, 62, 62, 1.0)' />
                                    </View>
                                    :
                                    <View style={styles.receiverInfo}>
                                        <Text allowFontScaling={false}>{this.state.deliveryInfo.receiverAddr}</Text>
                                        <Icon name="angle-right" size={30} color='rgba(62, 62, 62, 1.0)' />
                                    </View>
                                }

                            </TouchableOpacity>
                            <TouchableOpacity onPress={this._onReceiverNamePress}>
                                {this.state.deliveryInfo.receiverName==null?
                                    <View style={styles.receiverInfo}>
                                        <Text allowFontScaling={false}>{strings.receiverName_input}</Text>
                                        <Icon name="angle-right" size={30} color='rgba(62, 62, 62, 1.0)' />
                                    </View>
                                    :
                                    <View style={styles.receiverInfo}>
                                        <Text allowFontScaling={false}>{this.state.deliveryInfo.receiverName}</Text>
                                        <Icon name="angle-right" size={30} color='rgba(62, 62, 62, 1.0)' />
                                    </View>
                                }

                            </TouchableOpacity>
                            <TouchableOpacity onPress={this._onReceiverPhonePress}>
                                {this.state.deliveryInfo.receiverPhone==null?
                                    <View style={styles.receiverInfo}>
                                        <Text allowFontScaling={false}>{strings.receiverPhone_input}</Text>
                                        <Icon name="angle-right" size={30} color='rgba(62, 62, 62, 1.0)' />
                                    </View>
                                    :
                                    <View style={styles.receiverInfo}>
                                        <Text allowFontScaling={false}>{this.state.deliveryInfo.receiverPhone}</Text>
                                        <Icon name="angle-right" size={30} color='rgba(62, 62, 62, 1.0)' />
                                    </View>
                                }

                            </TouchableOpacity>
                            <DatePicker
                                style={styles.dataTime}
                                date={this.state.deliveryInfo.datetime}
                                mode="datetime"
                                minDate={this.getMyDate()}
                                format="DD-MM HH:mm"
                                confirmBtnText={strings.confirm}
                                cancelBtnText={strings.cancel}
                                placeholder={strings.common_time}
                                customStyles={{
                                    placeholderText:{
                                        color:'#646464',
                                        fontSize:12
                                    },
                                    dateInput: {
                                        borderWidth:0,
                                        alignItems:"flex-start",
                                        marginLeft:5,
                                        color:colors.baseRed
                                    },
                                    dateIcon:{
                                        marginRight:5,
                                    }
                                }}
                                placeholderTextColor={"black"}
                                showIcon={true}
                                iconComponent={<View style={{flexDirection:"row",alignItems:"center"}}><Text style={{color:'black',fontSize:12}} allowFontScaling={false}>{strings.common_time}</Text><IconA name={'right'} size={20}/></View>}
                                onDateChange={(datetime) => {this.checkTime(datetime)}}

                            />
                        </View>
                        :
                        <View style={{alignItems:"center"}}>
                            <View style={[styles.self,{flexDirection:'column'}]}>
                                <View style={{flex:1}}><Text style={styles.contentText} allowFontScaling={false}>{strings.deliverMobilePhone}:</Text></View>
                                <View style={{flex:1,marginTop:8}}><Text style={styles.contentText} allowFontScaling={false}>{merchant?merchant.nomroDeTelePhono:''}</Text></View>
                            </View>
                            <View style={[styles.self,{flexDirection:'column',marginBottom:10}]}>
                                <View style={{flex:1}}><Text style={styles.contentText} allowFontScaling={false}>{strings.deliverAddress}:</Text></View>
                                <View style={{flex:1,marginTop:8}}><Text style={styles.contentText} allowFontScaling={false}>{merchant?merchant.direccion:''}</Text></View>
                            </View>
                            <DatePicker
                                style={[styles.dataTime,{marginLeft:0}]}
                                date={this.state.deliveryInfo.datetime}
                                mode="datetime"
                                minDate={this.getMyDate()}
                                format="DD-MM HH:mm"
                                confirmBtnText={strings.confirm}
                                cancelBtnText={strings.cancel}
                                placeholder={strings.common_time}
                                customStyles={{
                                    placeholderText:{
                                        color:'#646464',
                                        fontSize:12
                                    },
                                    dateInput: {
                                        borderWidth:0,
                                        alignItems:"flex-start",
                                        marginLeft:5,
                                    },
                                    dateIcon:{
                                        marginRight:5,
                                    }
                                }}
                                placeholderTextColor={"black"}
                                showIcon={true}
                                iconComponent={<View style={{flexDirection:"row",alignItems:"center"}}><Text style={{color:'black',fontSize:12}} allowFontScaling={false}>{strings.self_time}</Text><IconA name={'right'} size={20}/></View>}
                                onDateChange={(datetime) => {this.checkTime(datetime)}}
                            />
                        </View>
                }
            </View>
        );
    }

    checkTime(datetime){
        var str=datetime
        var i = str.indexOf("-");
        var j = str.indexOf(" ");
        var k = str.indexOf(":");
        var day = str.substring(0, i);

        var month = str.substring(i+1, j);

        var hour = str.substring(j+1, k);

        var min = str.substring(k+1, str.length);

        var sTime = new Date().getFullYear() + "-" + month + "-" + day + " " + hour + ":" + min;

        var today = new Date().getFullYear() + "-" + month + "-" + day

            if(this.getDate(sTime)<this.getDate(this.getMinDate())){
                this.setState({deliveryInfo:Object.assign(this.state.deliveryInfo,{datetime: this.getPlusFiveDate()})})
                alert(strings.time_error)

            }
            else{
                this.setState({deliveryInfo:Object.assign(this.state.deliveryInfo,{datetime: datetime})})
            }


    }


    timeFinal(){
        const isDiscountScale = this.props.order.get("isDiscountScale");
        const isOrderMinLimit = this.props.order.get("isOrderMinLimit");
        const orderMinLimit = this.props.orderMinLimit;
        const discountScale = this.props.discountScale;
        var date = new Date();
        var str=this.state.deliveryInfo.datetime;
        var i = str.indexOf("-");
        var j = str.indexOf(" ");
        var k = str.indexOf(":");
        var day = str.substring(0, i);

        var month = str.substring(i+1, j);

        var hour = str.substring(j+1, k);

        var min = str.substring(k+1, str.length);

        var sTime = new Date().getFullYear() + "-" + month + "-" + day + " " + hour + ":" + min;
        // var selectedDay=new Date().getFullYear() + "-" + month + "-" + day
        var selectedDay = new Date(date.getFullYear(),month,day);
        var today=new Date(date.getFullYear(),date.getMonth()+1,date.getDate());
        console.log(selectedDay.getTime())


        console.log(today.getTime())
        if(this.getDate(sTime)<this.getDate(this.getSubmitDate())){
            alert(strings.time_error)
            return false
        }
        else{
            if(today.getTime()==selectedDay.getTime()){
                return true
            }
            else{
                Alert.alert(strings.alertTitle, 'Recordá que después de las 24 hs los precios podrían modificarse.',
                    [
                        {
                            text: "Aceptar ",
                            onPress: () => {

                                        if(this.props.phoneChecked==1){
                                            if(this.props.isAgree==1){
                                                if(this.checkInfoComplete()!=false) {
                                                    if(isOrderMinLimit){
                                                        if(isDiscountScale){
                                                            this.props.dispatch(orderActions.submitOrder(this.state.deliveryInfo));
                                                            this.props.dispatch(authActions.setDefaultInfo(this.state.deliveryInfo));
                                                            // this.props.dispatch(authActions.login(this.props.username, this.props.password));
                                                            this.props.dispatch(orderActions.getOrderPrevInfoSuccess(null, null, null, null, null,null,null));
                                                            showCenterToast(strings.submitOrderSuccess);
                                                        }
                                                        else{
                                                            alert('Las ofertas no pueden superar el '+discountScale+'% del pedido.')
                                                        }
                                                    }
                                                    else{
                                                        alert('Su pedido debe superar $'+orderMinLimit)
                                                    }

                                                }
                                            }
                                            else{
                                                this.refs.clause.open()
                                            }

                                        }
                                        else{
                                            this.refs.verify.open()
                                        }
                                 }
                        },
                        {
                            text: "Cancelar",
                            onPress: () => {return false}
                        },
                    ]
                );
            }

        }
    }

     getDate(strDate) {
            var st = strDate;
            var a = st.split(" ");
            var b = a[0].split("-");
            var c = a[1].split(":");
            var date = new Date(b[0], b[1]-1, b[2], c[0], c[1]);
            return date;
    }

    getDay(strDate) {
        var st = strDate;
        var b = st.split("-");
        var date = new Date(b[0], b[1]-1, b[2]);
        return date;
    }


    checkInfoComplete(){
        var {deliveryType,receiverName,receiverPhone,receiverAddr} = this.state.deliveryInfo;
        if(deliveryType==0){
            if(this.props.cartInfo.length==0){
                Alert.alert(strings.empty_car);
                return false;
            }
            if(receiverAddr==null || receiverAddr==undefined || receiverAddr==""){
                Alert.alert(strings.receiverAddr_input);
                return false;
            }
            if(receiverPhone==null || receiverPhone==undefined || receiverPhone==""){
                Alert.alert(strings.receiverPhone_input);
                return false;
            }
            if(receiverName==null || receiverName==undefined || receiverName==""){
                Alert.alert(strings.receiverName_input);
                return false;
            }


        }
        else{
            if(this.props.cartInfo.length==0){
                Alert.alert(strings.empty_car);
                return false;
            }
        }
    }

    // _renderDeliverInfo(){
    //     var {deliveryType} = this.state.deliveryInfo;
    //     return(
    //         <View style={styles.deliverInfoCard}>
    //             <CheckBox title={strings.self_delivery} checkedIcon='dot-circle-o' uncheckedIcon='circle-o' checked={deliveryType === constants.SELF_DELIVERY} onPress={() =>this.checkMerchant() }/>
    //             <CheckBox title={strings.common_delivery} checkedIcon='dot-circle-o' uncheckedIcon='circle-o' checked={deliveryType === constants.COMMON_DELIVERY} onPress={() => this.setState({deliveryInfo:Object.assign(this.state.deliveryInfo,{deliveryType: constants.COMMON_DELIVERY})})}/>
    //             <OrderDropdownCell defaultValue={strings.receiverAddr_input} dataList={receiverAddrList} onDropDownSelect={this._onReceiverAddrSelect} onButtonPress={this._onReceiverAddrPress}/>
    //             <OrderDropdownCell defaultValue={strings.receiverPhone_input} dataList={receiverPhoneList} onDropDownSelect={this._onReceiverPhoneSelect} onButtonPress={this._onReceiverPhonePress}/>
    //             <OrderDropdownCell defaultValue={strings.receiverName_input} dataList={receiverNameList} onDropDownSelect={this._onReceiverNameSelect} onButtonPress={this._onReceiverNamePress}/>
    //         </View>
    //     );
    // }

    //检查customer是否已经选择默认提货超市
    checkMerchant(){
        if(this.props.merchantId != null && this.props.merchantId !== undefined){
            this.setState({deliveryInfo:Object.assign(this.state.deliveryInfo,{deliveryType: constants.SELF_DELIVERY})})
        }
        else{
            alert(strings.no_shop)
        }
    }

    _renderCartInfo(orderItemList,totalFee,discountFee,orderDiscountFee, totalFeeFinal,totalDiscount){
        var orderItemArray = [];
        if(orderItemList && orderItemList.length>0)
            orderItemList.map((orderItem,i)=>{orderItemArray.push(transFromOrderItemToArray(orderItem))});
        return(
            <View style={styles.tableInfoCard}>
                <TableView title={strings.cartInfo}
                           headerList={strings.cartHeaderList}

                           dataList={orderItemArray}
                           renderAux={()=>this._renderCartAux(totalFee,totalDiscount,totalFeeFinal)}
                />
            </View>
        );
    }

    _renderCartAux(totalFee,totalDiscount,totalFeeFinal){
        return(
            <View style={styles.auxContainerStyle}>
                <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
                    <Text style={[styles.carTextStyle,{color:colors.baseBlack}]} allowFontScaling={false}>SUBTOT. SIN DESC.: </Text>
                    <Text style={styles.carTextStyle} allowFontScaling={false}>{totalFee}</Text>
                </View>

                    <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:5,width:'100%'}}>
                        <Text style={[styles.carTextStyle,{color:colors.baseBlack}]} allowFontScaling={false}>DESC.: </Text>
                        <Text style={styles.carTextStyle} allowFontScaling={false}>{totalDiscount}</Text>
                    </View>

                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:5,width:'100%'}}>
                    <Text style={styles.auxTextStyle} allowFontScaling={false}>TOTAL: </Text>
                    <Text style={styles.auxTextStyle} allowFontScaling={false}>{totalFeeFinal}</Text>
                </View>

            </View>
        );
    }

    _renderDiscountInfo(discountItemList, discountFee, orderDiscountFee,orderDiscountScale,totalDiscount){
        var discountItemArray = [];
        if(discountItemList && discountItemList.length>0)
            discountItemList.map((discountItem,i)=>{discountItemArray.push(transFromDiscountItemToArray(discountItem))});
        if(Math.abs(orderDiscountFee)>0){
            var array = [];
            array.push(orderDiscountScale);
            array.push(Math.abs(orderDiscountFee));
            array.push('Desc.  '+orderDiscountScale*100+'%:');
            discountItemArray.push(array)

        }

        return(
            <View style={styles.tableInfoCard}>
                <TableView title={strings.discountInfo} headerList={strings.discountHeaderList} dataList={discountItemArray} renderAux={()=>this._renderDiscountAux(totalDiscount)}/>
            </View>
        );
    }

    _renderDiscountAux(totalDiscount){
        return(
            <View style={styles.auxContainerStyle}>
                {totalDiscount==undefined?
                    <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
                        <Text style={styles.auxTextStyle} allowFontScaling={false}>TOT. AHORRO: </Text>
                        <Text style={styles.auxTextStyle} allowFontScaling={false}/>
                    </View>
                    :
                    <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
                        <Text style={styles.auxTextStyle} allowFontScaling={false}>TOT. AHORRO: </Text>
                        <Text style={styles.auxTextStyle} allowFontScaling={false}>{Math.abs(totalDiscount)}</Text>
                    </View>

                }

            </View>


        )
    }

    _renderAgree(){
        return(
            <View style={{width:SCREEN_WIDTH,alignItems:'center',marginTop:30}}>
                <CheckBox
                    title='Acepto que el pedido sea entregado por otro comercio de la comunidad (solo en caso de que el elegido no esté disponible).'
                    checked={this.state.deliveryInfo.agree}
                    onPress={() => {this.setState({deliveryInfo:Object.assign(this.state.deliveryInfo,{agree: !this.state.deliveryInfo.agree})})}}
                    textStyle={{color:'red',fontWeight:'bold',fontSize:18}}
                    containerStyle={{width:SCREEN_WIDTH*0.9,height:'auto'}}
                />
            </View>
        )
    }

    _renderCommitButton(){
        return(
            <View style={styles.commitBtnWrapper}>
                <Button title={strings.commit} buttonStyle={styles.commitBtn} onPress={this._onCommitPress}/>
            </View>
        )
    };
    _renderModal(){
        const nameList=this.props.order.get("nameList");
        const deliveryAddType  = this.state.deliveryAddType;

        // var data=nameList;
        // var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var placeholder = "";
        switch (deliveryAddType) {
            case constants.NAME_TYPE:
                placeholder = strings.receiverName_input;
                var data=receiverNameList;
                break;
            case constants.PHONE_TYPE:
                placeholder = strings.receiverPhone_input;
                var data=receiverPhoneList;
                break;
            case constants.ADDR_TYPE:
                placeholder = strings.receiverAddr_input;
                var data=receiverAddrList;
                break;
        }
        var listView=

            <FlatList
                data={data}
                renderItem={({item,index})=>this._renderReceiveItem(item,index)}
            />;
        {/*<ListView*/}
            {/*automaticallyAdjustContentInsets={false}*/}
            {/*keyboardShouldPersistTaps='always'*/}
            {/*dataSource={ds.cloneWithRows(data)}*/}
            {/*renderRow={this._renderReceiveItem.bind(this)}*/}

        {/*/>;*/}


        return(
            <Modal
                style={styles.modalbox}
                position={"center"}
                ref={"modal"}
                transparent={false}
                animationType={"slide"}
            >
            <View>
                <View style={{width:SCREEN_WIDTH*0.8,flexDirection:'row',padding:20,justifyContent:'space-around',alignItems:'center',backgroundColor:'rgba(66, 148, 136, 1.0)'}}>
                    <TextInput
                        style={{width:SCREEN_WIDTH*0.5,backgroundColor:colors.baseWhite,borderRadius:5,padding:5}}
                        onChangeText={(value) =>{
                             switch (deliveryAddType) {
                                 case constants.NAME_TYPE:this.setState({deliveryInfo:Object.assign(this.state.deliveryInfo,{receiverName: value}),deliveryTextInput:value});break;
                                 case constants.PHONE_TYPE:this.setState({deliveryInfo:Object.assign(this.state.deliveryInfo,{receiverPhone: value}),deliveryTextInput:value});break;
                                 case constants.ADDR_TYPE:this.setState({deliveryInfo:Object.assign(this.state.deliveryInfo,{receiverAddr: value}),deliveryTextInput:value});break;
                             }
                        }}
                    />
                    <TouchableOpacity onPress={()=>this.props.dispatch(authActions.addReceiverInfo(deliveryAddType, this.state.deliveryTextInput))}>
                        <View style={{width:'auto',justifyContent:'center',alignItems:'center',padding:5,borderRadius:5,backgroundColor:colors.baseWhite}}>
                            <Text allowFontScaling={false}>{strings.add}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {listView}
            </View>
            </Modal>
        );
    }

    _renderVerify(){
        return(
            <Modal
                style={[styles.modalbox,{backgroundColor:"rgb(220,228,242)"}]}
                position={"center"}
                ref={"verify"}
                transparent={false}
                animationType={"slide"}
            >
                <View style={{alignItems:'center',justifyContent:'space-around'}}>
                    <View style={{width:SCREEN_WIDTH*0.8,padding:20,justifyContent:'space-around',alignItems:'center'}}>
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
                        {/*<TouchableOpacity onPress={()=>{this.fetchCode()}} disabled={false}>*/}
                            {/*<View style={{width:'auto',justifyContent:'center',height:35,alignItems:'center',padding:5,borderRadius:5,backgroundColor:colors.baseWhite}}>*/}
                                {/*<Text allowFontScaling={false}>获取验证码</Text>*/}
                            {/*</View>*/}
                            <CountDown
                                style={{width:'auto',justifyContent:'center',height:40,alignItems:'center',padding:10,borderRadius:5,backgroundColor:colors.primaryColor,marginTop:15}}
                                textStyle={{color: 'white'}}
                                count={60}
                                title={strings.get_code}
                                behindText={' segs.'}
                                frontText={'Reenviar código '}
                                onClick={this.fetchCode}
                            />
                        {/*</TouchableOpacity>*/}
                    </View>
                    <View style={{width:SCREEN_WIDTH*0.8,padding:20,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{marginRight:10,fontSize:16,width:'auto'}} allowFontScaling={false}>{strings.check_code}:</Text>
                        <TextInput
                            style={{width:SCREEN_WIDTH*0.6,height:35,backgroundColor:colors.baseWhite,borderRadius:5,padding:5,marginTop:15}}
                            placeholder={strings.input_code}
                            placeholderTextColor={colors.baseBlack}
                            allowFontScaling={false}
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
            </Modal>
        );
    }

    fetchCode=()=>{

        if(this.state.verifyTel==null || this.state.verifyTel==''  || this.state.verifyTel==undefined){
            alert(strings.null_tel)
            return false
        }
        else{
            var checkCode=Math.random()
            // num=num*10000
            // num=Math.floor(num)
            var num = checkCode*9000
            num +=1000;
            num=Math.floor(num)
            this.setState({verifyCode:num})
            this.props.dispatch(orderActions.sendVerifyCode(this.state.verifyTel.toString(),num.toString()));
            return true

        }


    }

    verifyFinal(){
        if(this.state.inputCode==null || this.state.inputCode==''  || this.state.inputCode==undefined){
            alert(strings.null_code)
        }
        else{
            if(this.state.inputCode==this.state.verifyCode){
                showCenterToast(strings.verify_success);
                this.refs.verify.close()
                this.props.dispatch(orderActions.setCustomerPhoneChecked(this.state.verifyTel.toString()));
            }
            else{
                alert(strings.code_error)
            }
        }
    }

    _renderClause(){
        return(
            <Modal
                style={[styles.modalbox,{backgroundColor:"rgb(220,228,242)"}]}
                position={"center"}
                ref={"clause"}
                transparent={false}
                animationType={"slide"}
            >
                <View style={{alignItems:'center'}}>
                    <Text style={{fontSize:20,fontWeight:'bold'}}>He leído  los términos y condiciones</Text>
                    <TouchableOpacity
                        onPress={()=>{this.props.dispatch(authActions.setCustomerIsAgree(1));this.refs.clause.close()}}
                    >
                        <View style={{backgroundColor:'green',width:SCREEN_WIDTH*0.6,borderRadius:10,padding:10,justifyContent:'center',alignItems:'center',marginTop:50}}>
                            <Text style={{color:colors.baseWhite,fontSize:18}}>{strings.agree}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>{this.refs.clause.close()}}
                    >
                        <View style={{backgroundColor:'red',width:SCREEN_WIDTH*0.6,borderRadius:10,padding:10,justifyContent:'center',alignItems:'center',marginTop:35}}>
                            <Text style={{color:colors.baseWhite,fontSize:18}}>{strings.disagree}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>{this.refs.clause.close();this.props.navigation.push("Clause")}}
                    >
                        <View style={{backgroundColor:colors.primaryColor,width:SCREEN_WIDTH*0.6,borderRadius:10,padding:10,justifyContent:'center',alignItems:'center',marginTop:35}}>
                            <Text style={{color:colors.baseWhite,fontSize:15}}>{strings.read_clause}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </Modal>
        )
    }
    _renderReceiveItem(rowData,index){
        const deliveryAddType  = this.state.deliveryAddType;
        return (
            <TouchableOpacity
                onPress={() =>{
                    switch (deliveryAddType) {
                        case constants.NAME_TYPE:this.setState({deliveryInfo:Object.assign(this.state.deliveryInfo,{receiverName: rowData})});break;
                        case constants.PHONE_TYPE:this.setState({deliveryInfo:Object.assign(this.state.deliveryInfo,{receiverPhone: rowData})});break;
                        case constants.ADDR_TYPE:this.setState({deliveryInfo:Object.assign(this.state.deliveryInfo,{receiverAddr: rowData})});break;
                    }
                    this.refs.modal.close()
                }}
            >
                <ListItem
                    title={rowData}
                    style={styles.listItemStyle}
                    rightElement={
                    <TouchableOpacity
                        onPress={()=>this.deleteInfo(index)}
                    >
                        <Icon name="times-circle" size={30} color='red' />

                    </TouchableOpacity>
                }
                />
                {/*<View>*/}
                    {/*<Text>{rowData}</Text>*/}
                {/*</View>*/}
            </TouchableOpacity>
        );
    };

    addInfo(){
        alert('添加')
    }
    deleteInfo(index){
        const deliveryAddType  = this.state.deliveryAddType;
        var str=''
        var i=0
        switch (deliveryAddType) {
            case constants.NAME_TYPE:
                if(receiverNameList[index]==this.state.deliveryInfo.receiverName){
                    this.setState({deliveryInfo:Object.assign(this.state.deliveryInfo,{receiverName: null})})
                }
                receiverNameList.splice(index,1);
                for(i=0;i<receiverNameList.length;++i){
                    if(i==receiverNameList.length-1){
                        str=str+receiverNameList[i]
                    }
                    else{
                        str=str+receiverNameList[i]+','
                    }
                }
                this.props.dispatch(authActions.deleteReceiverInfo(deliveryAddType, str))
                break;
            case constants.PHONE_TYPE:
                if(receiverPhoneList[index]==this.state.deliveryInfo.receiverPhone){
                    this.setState({deliveryInfo:Object.assign(this.state.deliveryInfo,{receiverPhone: null})})
                }
                receiverPhoneList.splice(index,1);
                for(i=0;i<receiverPhoneList.length;++i){
                    if(i==receiverPhoneList.length-1){
                        str=str+receiverPhoneList[i]
                    }
                    else{
                        str=str+receiverPhoneList[i]+','
                    }
                }
                this.props.dispatch(authActions.deleteReceiverInfo(deliveryAddType, str))
                break;
            case constants.ADDR_TYPE:
                if(receiverAddrList[index]==this.state.deliveryInfo.receiverAddr){
                    this.setState({deliveryInfo:Object.assign(this.state.deliveryInfo,{receiverAddr: null})})
                }
                receiverAddrList.splice(index,1);
                for(i=0;i<receiverAddrList.length;++i){
                    if(i==receiverAddrList.length-1){
                        str=str+receiverAddrList[i]
                    }
                    else{
                        str=str+receiverAddrList[i]+','
                    }
                }
                this.props.dispatch(authActions.deleteReceiverInfo(deliveryAddType, str))
                break;
        }
    }
    selectInfo(rowData){
        alert('选择'+rowData.name)
    }
    // _renderModal(){
    //     const deliveryAddType  = this.state.deliveryAddType;
    //     var placeholder = "";
    //
    //     switch (deliveryAddType) {
    //         case constants.NAME_TYPE:placeholder = strings.receiverName_input;break;
    //         case constants.PHONE_TYPE:placeholder = strings.receiverPhone_input;break;
    //         case constants.ADDR_TYPE:placeholder = strings.receiverAddr_input;break;
    //     }
    //
    //     return(
    //         <Modal style={styles.modalbox} position={"center"} ref={"modal"}>
    //             <InputWithClearButton
    //                 hookCanBeCleared
    //                 textInputEvent={{
    //                     placeholder: placeholder,
    //                     onChangeText: (value) => {
    //                         switch (deliveryAddType) {
    //                             case constants.NAME_TYPE:this.setState({deliveryInfo:Object.assign(this.state.deliveryInfo,{receiverName: value}),deliveryTextInput:value});break;
    //                             case constants.PHONE_TYPE:this.setState({deliveryInfo:Object.assign(this.state.deliveryInfo,{receiverPhone: value}),deliveryTextInput:value});break;
    //                             case constants.ADDR_TYPE:this.setState({deliveryInfo:Object.assign(this.state.deliveryInfo,{receiverAddr: value}),deliveryTextInput:value});break;
    //                         }
    //                     }}}
    //             />
    //             <Button title={strings.add} buttonStyle={styles.addBtn} onPress={()=>this.props.dispatch(authActions.addReceiverInfo(deliveryAddType, this.state.deliveryTextInput))}/>
    //         </Modal>
    //     );
    // }

    _onReceiverAddrSelect = (idx, value) => this.setState({deliveryInfo:Object.assign(this.state.deliveryInfo,{receiverAddr: value})});

    _onReceiverPhoneSelect = (idx, value) => this.setState({deliveryInfo:Object.assign(this.state.deliveryInfo,{receiverPhone: value})});

    _onReceiverNameSelect = (idx, value) => this.setState({deliveryInfo:Object.assign(this.state.deliveryInfo,{receiverName: value})});

    _onReceiverAddrPress = () => {this.setState({deliveryAddType:constants.ADDR_TYPE});this.refs.modal.open()};

    _onReceiverPhonePress = () => {this.setState({deliveryAddType:constants.PHONE_TYPE});this.refs.modal.open()};

    _onReceiverNamePress = () => {this.setState({deliveryAddType:constants.NAME_TYPE});this.refs.modal.open()};

    _onCommitPress = () => {
        const isDiscountScale = this.props.order.get("isDiscountScale");
        const isOrderMinLimit = this.props.order.get("isOrderMinLimit");
        const orderMinLimit = this.props.orderMinLimit;
        const discountScale = this.props.discountScale;
        var date = new Date();
        var hour =  (date.getHours()).toString();
        if(hour>1 && hour<5){
            alert('El servidor está en mantenimiento')
        }
        else{
            if(this.props.merchantId == null || this.props.merchantId == undefined){
                alert(strings.no_shop)
            }
            else{
                if(this.timeFinal()){
                    if(this.props.phoneChecked==1){
                        if(this.props.isAgree==1){
                            if(this.checkInfoComplete()!=false) {
                                if(isOrderMinLimit){
                                    if(isDiscountScale){
                                        this.props.dispatch(orderActions.submitOrder(this.state.deliveryInfo));
                                        this.props.dispatch(authActions.setDefaultInfo(this.state.deliveryInfo));
                                        // this.props.dispatch(authActions.login(this.props.username, this.props.password));
                                        this.props.dispatch(orderActions.getOrderPrevInfoSuccess(null, null, null, null, null,null,null));
                                        showCenterToast(strings.submitOrderSuccess);
                                    }
                                    else{
                                        alert('Las ofertas no pueden superar el '+discountScale+'% del pedido.')
                                    }
                                }
                                else{
                                    alert('Su pedido debe superar $'+orderMinLimit)
                                }

                            }
                        }
                        else{
                            this.refs.clause.open()
                        }

                    }
                    else{
                        this.refs.verify.open()
                    }
                }
            }
        }




    };
    _onChangeTelPress=()=>{this.props.navigation.push("OrderState")}

    _onSkipCarPress=() =>{this.props.navigation.push("ShoppingList")};

    _onHistoryIconPress =() =>{this.props.navigation.push("OrderHistory");};

    _onRuleIconPress =()=>{this.props.navigation.push("OrderRule");};

    _getDeliverInfo(){
        var {customerInfo} = this.props;
        receiverNameList = customerInfo.receiverNames?customerInfo.receiverNames.split(','):[];
        receiverPhoneList = customerInfo.receiverPhones?customerInfo.receiverPhones.split(','):[];
        receiverAddrList = customerInfo.receiverAddrs?customerInfo.receiverAddrs.split(','):[];
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    scrollView:{
        marginBottom: getHeaderHeight(),
    },
    scrollViewContanier:{
        alignItems: 'center',

    },
    basicInfoContainer:{
        flex:1,
        marginTop:30
        // height:SCREEN_HEIGHT*0.08,
        // paddingVertical:25,
    },
    self:{
        flexDirection:"row",
        width:SCREEN_WIDTH-60,
        marginTop:5,
        paddingHorizontal:10,
        paddingVertical:15,
        borderWidth:1,
        borderColor:'#eee'
    },
    receiverInfo:{
        width:SCREEN_WIDTH-60,
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row',
        height:40,
        borderColor:'#cdcdcd',
        borderWidth:0.5,
        marginLeft:10,
        marginBottom:10,
        fontSize:12,
        paddingLeft:3,
        paddingRight:3
    },
    dataTime:{
        width:SCREEN_WIDTH-60,
        // alignItems:'center',
        // flexDirection:'row',
        height:40,
        borderColor:'#cdcdcd',
        borderWidth:0.5,
        marginLeft:10,
        marginBottom:10,
        fontSize:12,
        color:colors.baseRed
    },
    deliverInfoCard:{
        width:SCREEN_WIDTH*0.9,
        flex:1,
        borderColor:colors.primaryGray,
        borderWidth:1,
        borderRadius:10,
        marginTop: 30,
        // alignItems:"center",
    },
    tableInfoCard:{
        width:SCREEN_WIDTH*0.9,
        flex:1,
        borderColor:colors.primaryGray,
        borderWidth:1,
        borderRadius:10,
        marginTop: 10,
    },
    contentText: {
        fontSize:14,
        color:'#555',
        // justifyContent:'flex-end',
        // textAlign:'left',

    },
    auxContainerStyle:{
        flex:1,
        width:"100%",
        // justifyContent:'flex-end',
        // alignItems:'flex-end',
        padding:8,
        flexDirection: 'column'
    },
    auxTextStyle:{
        // flex:1,
        // textAlign: 'right',
        fontWeight:'900',
        fontSize:18
    },
    carTextStyle:{
        fontSize:16
    },
    commitBtnWrapper:{
        width:SCREEN_WIDTH,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    commitBtn: {
        width:200,
        backgroundColor:colors.primaryColor
    },
    addBtn: {
        width:200,
        marginTop:50,
        backgroundColor:colors.primaryColor
    },
    modalbox:{
        justifyContent:'center',
        alignItems:'center',
        height:400,
        // minHeight:400,
        width:SCREEN_WIDTH*0.8,
    },
    listItemStyle:{
        flex:1,
        width:SCREEN_WIDTH*0.8,
        borderBottomWidth: 0.8,
        borderColor: colors.saperatorLine,
    },
    listView:{
        // flex:1,
        height:'auto'
    },
});

const mapStateToProps = (state) => ({
    auth: state.get('auth'),
    username:state.get('auth').get('username'),
    password:state.get('auth').get('password'),
    merchantId:state.get('auth').get('merchantId'),
    mobilePhone:state.get('auth').get('mobilePhone'),
    phoneChecked:state.get('auth').get('phoneChecked'),
    isAgree:state.get('auth').get('isAgree'),
    root: state.get('root'),
    union: state.get('union'),
    orderMinLimit:state.get("union").get("union").orderMinLimit,
    discountScale:state.get("union").get("union").discountScale,
    order: state.get('order'),
    shopping: state.get('shopping'),
    cartInfo:state.get('shopping').get('cartInfo'),
    customerInfo: state.get("auth").get("customerInfo"),
    cartId: state.get("auth").get("cartId"),
});

export default connect(mapStateToProps)(OrderCommit)
