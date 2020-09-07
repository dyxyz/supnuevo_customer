/**
 * UnionDiscount.js
 */

// 组件
import React, {Component} from "react";
import {
    Image,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    ListView, Alert
} from "react-native";
import {connect} from "react-redux";
import {TopToolBar, ACTION_SKIP, ACTION_HELP} from "../../components/TopToolBar";
import {BottomToolBar, ACTION_BACK, ACTION_ORDER} from "../../components/BottomToolBar";
import {
    SCREEN_HEIGHT,
    SCREEN_WIDTH,
    getHeaderHeight,
    showCenterToast,
    transFromOrderItemToArray, toDecimal2, transFromDiscountItemToArray
} from "../../utils/tools";
import {InputWithCalendar} from '../../components/multiFuncTextInput/index';
import {CheckBox} from "react-native-elements";
import strings from "../../resources/strings";
import TableView from "../../components/TableView";
import constants from "../../resources/constants";
import colors from "../../resources/colors";
import {OrderDropdownCell} from "../../components/modalDropdownBar";
import {InformationItem, TYPE_TEXT} from "../../components/InformationItem";
import * as orderActions from "../../actions/order-actions";
import * as authActions from "../../actions/auth-actions";
import IntroDivider from "../../components/IntroDivider";
import * as shoppingActions from "../../actions/shopping-actions";
import ShoppingList from "../shopping/ShoppingList";
import * as unionActions from "../../actions/union-actions";
import {HistoryCar} from "./HistoryCar";
import {HistoryHelp} from "./HistoryHelp";


const orderStateSubmit = constants.ORDER_STATE_SUBMIT;
const orderStateConfirm = constants.ORDER_STATE_CONFIRM;
const orderStateFinished = constants.ORDER_STATE_FINISHED;
const count = constants.PRICE_LIST_PAGE;

export class OrderHistory extends Component {

  constructor(props) {
    super(props);
      this.state = {
          orderDate:null,
          doneState:1,
      };
  }

    componentDidMount() {
        this.props.dispatch(orderActions.getOrderListOfDate(null,orderStateSubmit));
        // this.setState({orderDate:this.getmyDate()});
        this.props.dispatch(shoppingActions.getCartInfo(this.props.cartId,this.props.auth.get("unionId")));
        this.props.dispatch(orderActions.getHistoryCarList());

    }



    componentWillReceiveProps(nextProps) {
        const orderResponse = this.props.order.get('dataResponse');

        const nextOrderResponse = nextProps.order.get('dataResponse');

        // 获取历史订单
        if (orderResponse === constants.INITIAL && nextOrderResponse === constants.GET_ORDER_LIST_SUCCESS) {
            this.props.dispatch(orderActions.resetOrderResponse());
        } else if (orderResponse === constants.INITIAL && nextOrderResponse === constants.GET_ORDER_LIST_FAIL) {
            showCenterToast(strings.getOrderListFail);
            this.props.dispatch(orderActions.resetOrderResponse());
        }

        // if (orderResponse === constants.INITIAL && nextOrderResponse === constants.RECALL_CAR_SUCCESS) {
        //     this.props.navigation.navigate("ShoppingList")
        //     this.props.dispatch(orderActions.resetOrderResponse());
        // }else if (orderResponse === constants.INITIAL && nextOrderResponse === strings.recallCarFail){
        //     showCenterToast(strings.recallCarFail);
        //     this.props.dispatch(orderActions.resetOrderResponse());
        // }





    }

    getmyDate() {
        var date = new Date();

        var year = date.getFullYear().toString();
        var month = (date.getMonth()+1).toString();
        var day = date.getDate().toString();

        return year+'-'+month+'-'+day;
    };

  switchToUnDone(){
      this.setState({doneState:1})
      this.props.dispatch(orderActions.getOrderListOfDate(null,orderStateSubmit));
  }
  switchToConfirm(){
      this.setState({doneState:2})
      this.props.dispatch(orderActions.getOrderListOfDate(null,orderStateConfirm));
  }

    switchToDone(){
        this.setState({doneState:0})
        this.props.dispatch(orderActions.getOrderListOfDate(this.state.orderDate,orderStateFinished));
    }

  render() {
      const orderList = this.props.order.get('orderList');
      const orderListView = [];
      orderList.map((orderItem,i)=>{
          orderListView.push(this._renderOrderItem(orderItem));
      });

      return (
          <View style={styles.container}>
              <TopToolBar title = 'Historial' navigation = {this.props.navigation}
                          _onLeftIconPress={this._onCarPress}
                          leftAction = {ACTION_SKIP}
                          flag={1}
                          rightAction={ACTION_HELP}
                          _onRightIconPress={this._onHelpIconPress}/>
              <ScrollView>
              <View style={{width:SCREEN_WIDTH,flexDirection:"row",backgroundColor:colors.baseWhite,padding:8}}>
                  {/*<CheckBox containerStyle={styles.check}*/}
                            {/*checkedIcon={<View><View><Text style={{color:colors.primaryColor}} allowFontScaling={false}>{strings.order_submit}</Text></View><View style={styles.bottom}/></View>}*/}
                            {/*uncheckedIcon={<View><Text allowFontScaling={false}>{strings.order_submit}</Text></View>}*/}
                            {/*checked={this.state.doneState === 1}*/}
                            {/*onPress={() =>this.switchToUnDone() }*/}
                  {/*/>*/}
                  {/*<View style={{borderWidth:0.5}}/>*/}
                  {/*<CheckBox containerStyle={styles.check}*/}
                            {/*checkedIcon={<View><View><Text style={{color:colors.primaryColor}} allowFontScaling={false}>{strings.order_confirm}</Text></View><View style={styles.bottom}/></View>}*/}
                            {/*uncheckedIcon={<View><Text allowFontScaling={false}>{strings.order_confirm}</Text></View>}*/}
                            {/*checked={this.state.doneState === 2}*/}
                            {/*onPress={() =>this.switchToConfirm()}*/}
                  {/*/>*/}
                  {/*<View style={{borderWidth:0.5}}/>*/}
                  {/*<CheckBox containerStyle={styles.check}*/}
                            {/*checkedIcon={<View><View><Text style={{color:colors.primaryColor}} allowFontScaling={false}>{strings.order_finished}</Text></View><View style={styles.bottom}/></View>}*/}
                            {/*uncheckedIcon={<View><Text allowFontScaling={false}>{strings.order_finished}</Text></View>}*/}
                            {/*checked={this.state.doneState === 0}*/}
                            {/*onPress={() =>this.switchToDone()}*/}
                  {/*/>*/}
                  {
                      this.state.doneState===1?
                          <View style={{width:SCREEN_WIDTH,alignItems:"center"}}>
                              <View style={styles.deliver}>
                                  <TouchableOpacity
                                      onPress={()=>{this.switchToUnDone()}}

                                      style={[styles.selected,{backgroundColor:'rgb(114, 135, 191)'}]}
                                  >
                                      <View>
                                          <Text>{strings.order_submit}</Text>
                                      </View>
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                      onPress={()=>{this.switchToDone()}}
                                      style={styles.selected}
                                  >
                                      <View>
                                          <Text>{strings.order_finished}</Text>
                                      </View>
                                  </TouchableOpacity>
                              </View>
                          </View>
                          :
                          <View style={{width:SCREEN_WIDTH,alignItems:"center"}}>
                              <View  style={styles.deliver}>
                                  <TouchableOpacity
                                      onPress={()=>{this.switchToUnDone()}}
                                      style={styles.selected}
                                  >
                                      <View>
                                          <Text>{strings.order_submit}</Text>
                                      </View>
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                      onPress={()=>{this.switchToDone()}}
                                      style={[styles.selected,{backgroundColor:'rgb(114, 135, 191)'}]}
                                  >
                                      <View>
                                          <Text>{strings.order_finished}</Text>
                                      </View>
                                  </TouchableOpacity>
                              </View>
                          </View>
                  }

              </View>
                  {
                      this.state.doneState==0?

                          <View style={styles.scrollViewContanier}>
                              <InputWithCalendar
                                  title={strings.orderDate}
                                  date={this.state.orderDate}
                                  // style={{marginBottom:8,borderTop:1}}
                                  onDateChange={(value)=>{
                                      this.setState({orderDate:value});
                                      this.props.dispatch(orderActions.getOrderListOfDate(value,null));
                                  }}/>
                              {orderListView}
                          </View>
                          :
                          <View style={styles.scrollViewContanier}>
                              {orderListView}
                          </View>


                  }
              {/*<View style={styles.scrollViewContanier}>*/}
              {/*<InputWithCalendar*/}
                  {/*title={strings.orderDate}*/}
                  {/*date={this.state.orderDate}*/}
                  {/*onDateChange={(value)=>{*/}
                      {/*this.setState({orderDate:value});*/}
                      {/*this.props.dispatch(orderActions.getOrderListOfDate(value,null));*/}
                  {/*}}/>*/}
                  {/*{orderListView}*/}
              {/*</View>*/}
              </ScrollView>
              <BottomToolBar navigation = {this.props.navigation}
              leftAction={ACTION_BACK} _onLeftIconPress={this._onBackIconPress}/>
          </View>);
  }

  _renderOrderItem(orderItem){
      const order = orderItem.order;
      // console.log(order)
      const itemList = order.itemList;
      const discountItemList = order.discountItemList;
      let orderView = this._renderBasicInfo(order);
      let itemView = this._renderOrderItemInfo(itemList,order.totalFee,order.discountFee,orderItem.orderDiscountFee,order.totalFeeFinal,order.totalDiscount);
      let discountView = this._renderDiscountItemInfo(discountItemList,order.discountFee,order.totalFeeFinal,orderItem.noDiscountTotal,orderItem.orderDiscountFee,orderItem.orderDiscountScale,order.totalDiscount);
      let divider = <IntroDivider
          dividerStyle={{backgroundColor:'#9DD6EB'}}
          intro={strings.orderNum+": "+order.orderNum}/>;
      let state =
          <View style={[styles.containerStyle,{backgroundColor:colors.baseWhite}]}>
              {order.orderState==1?
                  <View style={{flexDirection:"column",justifyContent:"center",alignItems:"center",width:SCREEN_WIDTH,backgroundColor:colors.baseWhite}}>
                      {/*<Text style={styles.contentText} allowFontScaling={false}>{strings.order_state}：</Text>*/}
                      {this.renderState(order.orderState,order.nickName)}
                  </View>
                  :
                  <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",width:SCREEN_WIDTH,backgroundColor:colors.baseWhite}}>
                      {/*<Text style={styles.contentText} allowFontScaling={false}>{strings.order_state}：</Text>*/}
                      {this.renderState(order.orderState,order.nickName,order.isOverdue)}
                      {/*{order.orderState==1?*/}
                      {/*<Text  style={styles.contentText}>已被商家{order.nickName}接单</Text>*/}
                      {/*:*/}
                      {/*<Text  style={styles.contentText}>未接单</Text>*/}
                      {/*}*/}
                  </View>

              }

          </View>;
      let button=
          <View style={{backgroundColor:colors.baseWhite,width:SCREEN_WIDTH,alignItems:'center'}}>
              {
                  this.state.doneState==1 && order.orderState==0?
                  <View style={{height:SCREEN_HEIGHT*0.05,width:SCREEN_WIDTH*0.9,flexDirection:'row',justifyContent:"space-between",alignItems:"center",marginTop:10,marginBottom:20}}>
                      <TouchableOpacity
                          onPress={()=>this.recallCar(order.orderId,itemList,order.totalFee,order.totalFeeFinal,order.discountItemList,order.discountFee,order.unionId,order.cartId,order.isEmpty)}
                      >
                          <View style={styles.button}>
                              <Text style={{color:"white"}} allowFontScaling={false}>{strings.reback_order}</Text>
                          </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                          onPress={()=>this.cancelButton(order.orderId)}
                      >
                          <View style={styles.button}>
                              <Text style={{color:"white"}} allowFontScaling={false}>{strings.cancel_order}</Text>
                          </View>
                      </TouchableOpacity>
                  </View>
                  :
                  null
              }
          </View>
      return ([divider,orderView,itemView,discountView,state,button]);
  }

  renderState(orderState,nickName,isOverdue){
      if(orderState==0){
          var state
          if(isOverdue){
              state=<Text  style={[styles.contentText,{textAlign:'center'}]} allowFontScaling={false}>{strings.skip_order}</Text>;
          }
          else{
              state=<Text  style={[styles.contentText,{textAlign:'center'}]} allowFontScaling={false}>{strings.not_deal}</Text>;
          }

          return state;
      }
      if(orderState==1){
          const submitState=
              <Text  style={[styles.contentText,{textAlign:'center'}]} allowFontScaling={false}>{strings.have_received}</Text>;
          return submitState;
      }
      if(orderState==2){
          const finishState=<Text  style={styles.contentText} allowFontScaling={false}>{strings.have_finished}</Text>;
          return finishState;
      }
  }

    _renderBasicInfo(order){
      if(order.deliveryType==1){
          return(
                  <View style={styles.basicInfoContainer}>
                      <InformationItem key = {0} type = {TYPE_TEXT} title = {strings.union} content = {order.unionName}/>
                      <InformationItem key = {1} type = {TYPE_TEXT} title = {strings.orderType} content = {strings.self_delivery}/>
                      <InformationItem key = {2} type = {TYPE_TEXT} title = {strings.deliverShopName} content = {order.shopName}/>
                      <InformationItem key = {3} type = {TYPE_TEXT} title = {strings.deliverMobilePhone} content = {order.nomroDeTelePhono}/>
                      <InformationItem key = {4} type = {TYPE_TEXT} title = {strings.deliverAddress} content = {order.direccion}/>
                      <InformationItem key = {5} type = {TYPE_TEXT} title = {strings.expectDeliverTime} content = {order.wiseSaleTime}/>
                  </View>

          );
      }
      else{
          if(order.orderState==0){
            return(
                <View style={styles.basicInfoContainer}>
                    <InformationItem key = {0} type = {TYPE_TEXT} title = {strings.union} content = {order.unionName}/>
                    <InformationItem key = {1} type = {TYPE_TEXT} title = {strings.orderType} content = {strings.common_delivery}/>
                    {/*<InformationItem key = {1} type = {TYPE_TEXT} title = {strings.customerMobilePhone} content = {this.props.mobilePhone}/>*/}
                    <InformationItem key = {2} type = {TYPE_TEXT} title = {strings.pickMobilePhone} content = {order.receiverPhone}/>
                    <InformationItem key = {3} type = {TYPE_TEXT} title = {strings.pickName} content = {order.receiverName}/>
                    <InformationItem key = {4} type = {TYPE_TEXT} title = {strings.pickAddress} content = {order.receiverAddr}/>
                    <InformationItem key = {5} type = {TYPE_TEXT} title = {strings.expectFetchTime} content = {order.wiseSaleTime}/>
                </View>
            )
          }
          else{
              return(
                  <View style={styles.basicInfoContainer}>
                      <InformationItem key = {0} type = {TYPE_TEXT} title = {strings.union} content = {order.unionName}/>
                      <InformationItem key = {1} type = {TYPE_TEXT} title = {strings.deliverShopName} content = {order.shopName}/>
                      <InformationItem key = {2} type = {TYPE_TEXT} title = {strings.deliverMobilePhone} content = {order.nomroDeTelePhono}/>
                      <InformationItem key = {3} type = {TYPE_TEXT} title = {strings.deliverAddress} content = {order.direccion}/>
                      <InformationItem key = {4} type = {TYPE_TEXT} title = {strings.orderType} content = {strings.common_delivery}/>
                      {/*<InformationItem key = {1} type = {TYPE_TEXT} title = {strings.customerMobilePhone} content = {this.props.mobilePhone}/>*/}
                      <InformationItem key = {5} type = {TYPE_TEXT} title = {strings.pickMobilePhone} content = {order.receiverPhone}/>
                      <InformationItem key = {6} type = {TYPE_TEXT} title = {strings.pickName} content = {order.receiverName}/>
                      <InformationItem key = {7} type = {TYPE_TEXT} title = {strings.pickAddress} content = {order.receiverAddr}/>
                      <InformationItem key = {8} type = {TYPE_TEXT} title = {strings.expectFetchTime} content = {order.wiseSaleTime}/>

                  </View>
              )
          }
      }

  }
// <View style={styles.basicInfoContainer}>
// <InformationItem key = {0} type = {TYPE_TEXT} title = {strings.customerMobilePhone} content = {this.props.mobilePhone}/>
// <InformationItem key = {1} type = {TYPE_TEXT} title = {strings.deliverMobilePhone} content = {order.nomroDetelePhono}/>
// <InformationItem key = {2} type = {TYPE_TEXT} title = {strings.deliverAddress} content = {order.direccion}/>
// <InformationItem key = {3} type = {TYPE_TEXT} title = {strings.pickMobilePhone} content = {order.receiverPhone}/>
// <InformationItem key = {4} type = {TYPE_TEXT} title = {strings.pickName} content = {order.receiverName}/>
// </View>

    _renderOrderItemInfo(itemList,totalFee, discountFee,orderDiscountFee, totalFeeFinal,totalDiscount){
        var itemArray = [];
        var total=0;
        if(itemList && itemList.length>0)
            itemList.map((item,i)=>{total=total+item.total;itemArray.push(transFromOrderItemToArray(item))});

        return(
            itemList && itemList.length>0?
            <View style={[styles.tableInfoCard,{backgroundColor:'#9DD6EB'}]}>
                <TableView title={strings.orderInfo} headerList={strings.cartHeaderList} dataList={itemArray} renderAux={()=>this._renderCartAux(totalFee,totalDiscount,totalFeeFinal,totalDiscount)}/>
            </View>:null
        );
    }

    _renderDiscountItemInfo(itemList, discountFee, totalFeeFinal,noDiscountTotal,orderDiscountFee,orderDiscountScale,totalDiscount){
        var itemArray = [];
        if(itemList && itemList.length>0)
            itemList.map((item,i)=>{itemArray.push(transFromDiscountItemToArray(item))});
        if(Math.abs(orderDiscountFee)>0){
            var array = [];
            array.push(orderDiscountScale);
            array.push(Math.abs(orderDiscountFee));
            array.push('Desc.  '+orderDiscountScale*100+'%:');
            itemArray.push(array)
        }


        return(
            itemList && itemList.length>0?
                <View style={styles.tableInfoCard}>
                    <TableView title={strings.discountInfo} headerList={strings.discountHeaderList} dataList={itemArray} renderAux={()=>this._renderDiscountAux(discountFee,totalDiscount)}/>
                </View>:null
        );
    }

    _renderCartAux(totalFee,totalDiscount,totalFeeFinal){
        return(
            <View style={styles.auxContainerStyle}>
                <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
                    <Text style={[styles.carTextStyle,{color:colors.baseBlack}]} allowFontScaling={false}>SUBTOT. SIN DESCUENTOS: </Text>
                    <Text style={styles.carTextStyle} allowFontScaling={false}>{totalFee}</Text>
                </View>

                {totalDiscount!=null && totalDiscount!=undefined && totalDiscount!=0 && totalDiscount!=NaN?
                    <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:5,width:'100%'}}>
                        <Text style={[styles.carTextStyle,{color:colors.baseBlack}]} allowFontScaling={false}>DESCUNTOS: </Text>
                        <Text style={styles.carTextStyle} allowFontScaling={false}>{totalDiscount}</Text>
                    </View>
                    :
                    <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:5,width:'100%'}}>
                        <Text style={[styles.carTextStyle,{color:colors.baseBlack}]} allowFontScaling={false}>DESCUNTOS: </Text>
                        <Text style={styles.carTextStyle} allowFontScaling={false} />
                    </View>

                }


                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:5,width:'100%'}}>
                    <Text style={styles.auxTextStyle} allowFontScaling={false}>TOTAL: </Text>
                    <Text style={styles.auxTextStyle} allowFontScaling={false}>{totalFeeFinal}</Text>
                </View>

            </View>
        );
    }

    _renderDiscountAux(discountFee,totalDiscount){
        return(
            <View style={styles.auxContainerStyle}>
                <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
                    <Text style={styles.auxTextStyle} allowFontScaling={false}>TOT. AHORRO: </Text>
                    <Text style={styles.auxTextStyle} allowFontScaling={false}>{Math.abs(totalDiscount)}</Text>
                </View>
            </View>

        )
    }

  _onCarPress=() =>{
      if(this.props.carList.length===1){
          this.props.navigation.push("ShoppingList")
      }
      else{
          this.props.navigation.push("HistoryCar")
      }

  };

  _onVolumeIconPress =() =>{};

  _onHelpIconPress =() =>{this.props.navigation.push("HistoryHelp")};

  _onBackIconPress=() =>this.props.navigation.pop();

    cancelButton(orderId){
        this.props.dispatch(orderActions.cancelOrder(orderId))
    }

    recallCar(orderId,itemList,totalFee,totalFeeFinal,discountItemList,discountFee,unionId,cartId,isEmpty){
        if(isEmpty){
            this.props.dispatch(orderActions.recallCar(orderId,itemList,totalFee,totalFeeFinal,discountItemList,discountFee,cartId,unionId))
            this.props.navigation.push("ShoppingList")
        }
        else{
            Alert.alert(strings.recallCarFail);
            return;
        }

        // this.props.dispatch(unionActions.getUnionPriceList(this.props.unionId, 0, count,this.props.cartId));
        // this.props.dispatch(shoppingActions.getCartInfo(this.props.cartId,this.props.auth.get("unionId")));
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: SCREEN_WIDTH,
    },
    containerStyle:{
        flexDirection:'row',
        // flex:1,
        width:SCREEN_WIDTH,
        paddingHorizontal:10,
        paddingVertical:10,
        borderBottomWidth:3,
        marginTop:5,
        borderTopWidth:1,
        borderColor:'#9DD6EB',
        justifyContent:"center",
        alignItems:"center",
    },
    contentText: {
        fontSize:16,
        color:'#222',
        fontWeight:'bold'
        // justifyContent:'flex-end',
        // textAlign:'left',

    },
    check:{
        width:SCREEN_WIDTH*0.28,
        height:SCREEN_HEIGHT*0.05,
        alignItems:"center",
        // borderWidth:1,
        // borderColor:"red",
    },
    basicInfoContainer:{
        flex:1,
        width: SCREEN_WIDTH,
    },
    scrollViewContanier:{
        alignItems: 'center',
        marginBottom: 100,
        backgroundColor:'#9DD6EB'
    },
    tableInfoCard:{
        width:SCREEN_WIDTH-40,
        flex:1,
        borderColor:colors.primaryGray,
        borderWidth:1,
        borderRadius:10,
        marginTop: 10,
    },
    bottom:{
        backgroundColor:colors.primaryColor,
        height:SCREEN_HEIGHT*0.008,
        marginTop:SCREEN_HEIGHT*0.01,
        // width:SCREEN_WIDTH*0.46,
    },
    button:{
        // borderWidth:1,
        // borderColor:"white",
        borderRadius:SCREEN_WIDTH*0.02,
        width:SCREEN_WIDTH*0.4,
        // position:"absolute",
        // right:10,
        // top:10,
        alignItems:"center",
        height:SCREEN_HEIGHT*0.05,
        justifyContent:"center",
        backgroundColor:colors.primaryColor,
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
        fontSize:18
    },
    deliver:{
        width:SCREEN_WIDTH*0.9,
        flexDirection:"row",
        height:SCREEN_HEIGHT*0.06,
        borderWidth:2,
        borderColor:'rgb(114, 135, 191)',
        borderRadius:SCREEN_WIDTH*0.5,
    },
    selected:{
        borderRadius:SCREEN_WIDTH*0.2,
        flex:1,
        // borderWidth:1,
        // borderColor:"red",
        alignItems:"center",
        justifyContent:"center",
    },
});

const mapStateToProps = (state) => ({
    auth: state.get('auth'),
    mobilePhone:state.get('auth').get('mobilePhone'),
    root: state.get('root'),
    order: state.get('order'),
    username:state.get('auth').get('username'),
    unionId: state.get('auth').get("unionId"),
    cartId: state.get("auth").get("cartId"),
    cartInfo: state.get('shopping').get("cartInfo"),
    carList:state.get('order').get('carList'),
    union: state.get('union'),
});

export default connect(mapStateToProps)(OrderHistory)
