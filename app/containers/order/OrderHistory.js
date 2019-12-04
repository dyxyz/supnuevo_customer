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
    ListView
} from "react-native";
import {connect} from "react-redux";
import {TopToolBar} from "../../components/TopToolBar";
import {BottomToolBar, ACTION_BACK} from "../../components/BottomToolBar";
import {
    SCREEN_HEIGHT,
    SCREEN_WIDTH,
    getHeaderHeight,
    showCenterToast,
    transFromOrderItemToArray
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

const orderState = constants.ORDER_STATE;

export class OrderHistory extends Component {

  constructor(props) {
    super(props);
      this.state = {
          orderDate:null,
          doneState:1,
      };
  }

    componentDidMount() {
        this.props.dispatch(orderActions.getOrderListOfDate(null,orderState));
        // this.setState({orderDate:this.getmyDate()});
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
      this.props.dispatch(orderActions.getOrderListOfDate(null,orderState));
  }

    switchToDone(){
        this.setState({doneState:0})
        this.props.dispatch(orderActions.getOrderListOfDate(this.state.orderDate,null));
    }

  render() {
      const orderList = this.props.order.get('orderList');
      const orderListView = [];
      orderList.map((orderItem,i)=>{
          orderListView.push(this._renderOrderItem(orderItem));
      });

      return (
          <View style={styles.container}>
              <TopToolBar title = "历史订单" navigation = {this.props.navigation}
                          _onLeftIconPress={this._onVolumeIconPress}
                          _onRightIconPress={this._onHelpIconPress}/>
              <ScrollView>
              <View style={{width:SCREEN_WIDTH,flexDirection:"row",backgroundColor:'#eee'}}>
                  <CheckBox containerStyle={{width:SCREEN_WIDTH*0.46,height:SCREEN_HEIGHT*0.05,alignItems:"center"}}
                            checkedIcon={<View><View><Text style={{color:"#2874F0"}}>未完成订单</Text></View><View style={styles.bottom}/></View>}
                            uncheckedIcon={<View><Text>未完成订单</Text></View>}
                            checked={this.state.doneState === 1}
                            onPress={() =>this.switchToUnDone() }
                  />
                  <View style={{borderWidth:0.5}}/>
                  <CheckBox containerStyle={{width:SCREEN_WIDTH*0.46,height:SCREEN_HEIGHT*0.05,alignItems:"center"}}
                            checkedIcon={<View><View><Text style={{color:"#2874F0"}}>全部订单</Text></View><View style={styles.bottom}/></View>}
                            uncheckedIcon={<View><Text>全部订单</Text></View>}
                            checked={this.state.doneState === 0}
                            onPress={() =>this.switchToDone()}
                  />
              </View>
                  {
                      this.state.doneState==1?
                          <View style={styles.scrollViewContanier}>
                              {orderListView}
                          </View>
                          :
                          <View style={styles.scrollViewContanier}>
                              <InputWithCalendar
                                  title={strings.orderDate}
                                  date={this.state.orderDate}
                                  onDateChange={(value)=>{
                                      this.setState({orderDate:value});
                                      this.props.dispatch(orderActions.getOrderListOfDate(value,null));
                                  }}/>
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
      const itemList = order.itemList;
      let orderView = this._renderBasicInfo(order);
      let itemView = this._renderOrderItemInfo(itemList);
      let divider = <IntroDivider dividerStyle={{marginTop: 10}} intro={strings.orderNum+": "+order.orderNum}/>;
      let state =
          <View style={styles.containerStyle}>
              <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                  <Text style={styles.contentText}>订单状态：</Text>
              {order.orderState==1?
                    <Text  style={styles.contentText}>已被商家{order.nickName}接单</Text>
              :
                    <Text  style={styles.contentText}>未接单</Text>
              }
              </View>
          </View>
      return ([divider,orderView,itemView,state]);
  }

    _renderBasicInfo(order){
        return(

                order.deliveryType==1?
                    <View style={styles.basicInfoContainer}>
                        <InformationItem key = {0} type = {TYPE_TEXT} title = {strings.orderType} content = {strings.self_delivery}/>
                        <InformationItem key = {1} type = {TYPE_TEXT} title = {strings.customerMobilePhone} content = {this.props.mobilePhone}/>
                        <InformationItem key = {2} type = {TYPE_TEXT} title = {strings.deliverMobilePhone} content = {order.nomroDetelePhono}/>
                        <InformationItem key = {3} type = {TYPE_TEXT} title = {strings.deliverAddress} content = {order.direccion}/>
                    </View>
                    :
                    <View style={styles.basicInfoContainer}>
                        <InformationItem key = {0} type = {TYPE_TEXT} title = {strings.orderType} content = {strings.common_delivery}/>
                        <InformationItem key = {1} type = {TYPE_TEXT} title = {strings.customerMobilePhone} content = {this.props.mobilePhone}/>
                        <InformationItem key = {2} type = {TYPE_TEXT} title = {strings.pickMobilePhone} content = {order.receiverPhone}/>
                        <InformationItem key = {3} type = {TYPE_TEXT} title = {strings.pickName} content = {order.receiverName}/>
                        <InformationItem key = {4} type = {TYPE_TEXT} title = {strings.pickAddress} content = {order.receiverAddr}/>
                    </View>
        );
  }
// <View style={styles.basicInfoContainer}>
// <InformationItem key = {0} type = {TYPE_TEXT} title = {strings.customerMobilePhone} content = {this.props.mobilePhone}/>
// <InformationItem key = {1} type = {TYPE_TEXT} title = {strings.deliverMobilePhone} content = {order.nomroDetelePhono}/>
// <InformationItem key = {2} type = {TYPE_TEXT} title = {strings.deliverAddress} content = {order.direccion}/>
// <InformationItem key = {3} type = {TYPE_TEXT} title = {strings.pickMobilePhone} content = {order.receiverPhone}/>
// <InformationItem key = {4} type = {TYPE_TEXT} title = {strings.pickName} content = {order.receiverName}/>
// </View>

    _renderOrderItemInfo(itemList){
        var itemArray = [];
        if(itemList && itemList.length>0)
            itemList.map((item,i)=>{itemArray.push(transFromOrderItemToArray(item))});

        return(
            itemList && itemList.length>0?
            <View style={styles.tableInfoCard}>
                <TableView title={strings.orderInfo} headerList={constants.cartHeaderList} dataList={itemArray} renderAux={null}/>
            </View>:null
        );
    }

  _onVolumeIconPress =() =>{};

  _onHelpIconPress =() =>{};

  _onBackIconPress=() =>this.props.navigation.pop();
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
        borderBottomWidth:1,
        marginTop:5,
        borderTopWidth:1,
        borderColor:'#eee',
        justifyContent:"center",
        alignItems:"center",
    },
    contentText: {
        fontSize:14,
        color:'#222',
        // justifyContent:'flex-end',
        // textAlign:'left',

    },
    basicInfoContainer:{
        flex:1,
        width: SCREEN_WIDTH,
    },
    scrollViewContanier:{
        alignItems: 'center',
        marginBottom: 100,
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
        backgroundColor:"#2874F0",
        height:SCREEN_HEIGHT*0.008,
        marginTop:SCREEN_HEIGHT*0.01,
        // width:SCREEN_WIDTH*0.46,
    }
});

const mapStateToProps = (state) => ({
    auth: state.get('auth'),
    mobilePhone:state.get('auth').get('mobilePhone'),
    root: state.get('root'),
    order: state.get('order'),
});

export default connect(mapStateToProps)(OrderHistory)
