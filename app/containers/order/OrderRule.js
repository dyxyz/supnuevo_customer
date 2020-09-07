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
import {SCREEN_HEIGHT, SCREEN_WIDTH, getHeaderHeight, showCenterToast} from "../../utils/tools";
import constants from '../../resources/constants';
import * as orderActions from "../../actions/order-actions";
import * as unionActions from '../../actions/union-actions';
import strings from "../../resources/strings";

export class OrderRule extends Component {

  constructor(props) {
    super(props);
      this.state = {};
  }

    componentDidMount() {
        this.props.dispatch(unionActions.getUnionRegulation(this.props.unionId));
    }

    componentWillReceiveProps(nextProps) {
        const response = this.props.union.get('dataResponse');
        const nextResponse = nextProps.union.get('dataResponse');

        if (response === constants.INITIAL && nextResponse === constants.GET_UNION_REGULATION_SUCCESS) {
            this.props.dispatch(unionActions.resetUnionResponse());
        } else if (response === constants.INITIAL && nextResponse === constants.GET_UNION_REGULATION_FAIL) {
            showCenterToast(strings.getUnionRegulationFail);
            this.props.dispatch(unionActions.resetUnionResponse());
        }
    }

  render() {
      const regulation = this.props.union.get("regulation");
      return (
          <View style={styles.container}>
              <TopToolBar title = 'Nota' navigation = {this.props.navigation}
                          _onLeftIconPress={this._onVolumeIconPress}
                          _onRightIconPress={this._onHelpIconPress}/>
              {this._renderRulePage(regulation)}
              <BottomToolBar navigation = {this.props.navigation}
              leftAction={ACTION_BACK} _onLeftIconPress={this._onBackIconPress}/>
          </View>
      );
  }

    _renderRulePage(regulation){
      return(
          <View style={{height:SCREEN_HEIGHT-140}}>

              <View style={styles.scrollViewWrapper}>
                  <View >
                    <Text style={[styles.ruleText,{fontSize:25,lineHeight:28}]} allowFontScaling={false}>{regulation.unionName}</Text>
                  </View>

                  <View style={styles.regulation}>
                      <ScrollView>
                          {/*<View>*/}
                              {/*<Text style={styles.ruleText} allowFontScaling={false}>*/}
                                  {/*本店最低购买量为实际购买金额不小于{regulation.orderMinLimit}peso;*/}
                              {/*</Text>*/}
                          {/*</View>*/}
                          {/*<View>*/}
                              {/*<Text style={styles.ruleText} allowFontScaling={false}>*/}
                                  {/*折扣商品不大于总购买量的{regulation.discountScale}%;*/}
                              {/*</Text>*/}
                          {/*</View>*/}

                          <View style={{marginBottom:20,marginTop:25,flex:1}}>
                              <Text style={styles.ruleText} allowFontScaling={false}>
                                  {regulation.regulation}
                              </Text>
                          </View>

                      </ScrollView>
                  </View>


              </View>

          </View>
      );
  }

  _onVolumeIconPress =() =>{};

  _onHelpIconPress =() =>{};

    _onBackIconPress=() =>this.props.navigation.pop();
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent:"center"
        // borderWidth:1,

    },
    scrollViewWrapper:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    ruleText:{
        // flex:1,
        textAlign:'center',
        fontSize:20,
        margin:25,
        lineHeight:24,
    },
    regulation:{
        height:SCREEN_HEIGHT*0.6,
        marginTop:SCREEN_HEIGHT*0.05,
        width:SCREEN_WIDTH*0.9,
        alignItems:"center",
        borderWidth:1,
        borderRadius:SCREEN_WIDTH*0.05,
        borderColor: '#ddd',
    }
});

const mapStateToProps = (state) => ({
    auth: state.get('auth'),
    root: state.get('root'),
    union: state.get("union"),
    unionId: state.get("union").get("union").unionId,
    username:state.get('auth').get('username'),
});

export default connect(mapStateToProps)(OrderRule)
