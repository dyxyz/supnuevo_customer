/**
 * UnionMemberList.js
 */

// 组件
import React, {Component} from "react";
import {
    Image,
    ScrollView,
    View,
    StyleSheet,
    ListView,
    Text,
} from "react-native";
import {connect} from "react-redux";
import {ACTION_HELP, TopToolBar} from "../../components/TopToolBar";
import {ACTION_DISCOUNT, ACTION_PRICE, BottomToolBar} from "../../components/BottomToolBar";
import unionMembers from "../../test/unionMembers";
import {Avatar, Icon, ListItem} from "react-native-elements";
import colors from "../../resources/colors";
import {getHeaderHeight, SCREEN_HEIGHT, SCREEN_WIDTH, showCenterToast} from "../../utils/tools";
import {MicrosoftMap} from "../../components/rnMap";
import * as unionActions from "../../actions/union-actions";
import * as authActions from "../../actions/auth-actions";
import constants from "../../resources/constants";
import strings from "../../resources/strings";
import {UnionState} from "./UnionState";

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export class UnionMemberList extends Component {

  constructor(props) {
    super(props);
      this.state = {};
  }

    componentDidMount() {
      const union = this.props.union.get("union");
      this.props.dispatch(unionActions.getUnionMemberList(union.unionId,this.props.username,this.props.password));
      console.log(this.props.union.get("merchants"))
    }

    componentWillReceiveProps(nextProps) {
        const Response = this.props.union.get('dataResponse');
        const nextResponse = nextProps.union.get('dataResponse');

        if (Response === constants.INITIAL && nextResponse === constants.GET_UNION_MEMBER_LIST_SUCCESS) {
            this.props.dispatch(unionActions.resetUnionResponse());
        }else if (Response === constants.INITIAL && nextResponse === constants.GET_UNION_MEMBER_LIST_FAIL){
            showCenterToast(strings.getUnionMemberListFail);
            this.props.dispatch(unionActions.resetUnionResponse());
        }
    }

  render() {

      const union = this.props.union.get("union");
      const merchants = this.props.union.get("merchants");
      const edges = this.props.union.get("edges");

      return (
          <View style={styles.container}>
              <TopToolBar title = {this.props.username+'-'+union.unionName} navigation = {this.props.navigation}
                          rightAction={ACTION_HELP}
                          _onLeftIconPress={this._onVolumeIconPress}
                          _onRightIconPress={this._onHelpIconPress}/>
              {this._renderMap(edges, merchants)}
              {this._renderUnionList(merchants)}
              <BottomToolBar navigation = {this.props.navigation}
                             leftAction = {ACTION_DISCOUNT}
                             _onLeftIconPress = {this._onDiscountPress}
                             rightAction = {ACTION_PRICE}
                             _onRightIconPress = {this._onPricePress}/>
          </View>
      );
  }

  _renderMap(edges, merchants){
      return (
          <MicrosoftMap edges={edges} merchants={merchants}/>
      );
  }

  _renderUnionList(merchants){
      return(
          <View style={styles.listViewWrapper}>
              <ListView
                  style={styles.listView}
                  automaticallyAdjustContentInsets={false}
                  dataSource={ds.cloneWithRows(merchants)}
                  renderRow={this._renderItem}
                  enableEmptySections={true}
              />
          </View>
      );
  }

    _renderItem = (rowData,sectionId,rowId) => {
        const image = rowData.urlAddress && rowData.urlAddress!==undefined?{uri:strings.head+rowData.urlAddress}:require('../../assets/img/img_logo.png');
        const merchantId = this.props.auth.get("merchantId");
        return (
            <ListItem
                leftElement={<Image source={image} style={styles.image} resizeMode={"contain"}/>}
                rightIcon={rowData.merchantId === merchantId?<Icon name='md-checkmark' type='ionicon' color={colors.primaryColor}/>:null}

                subtitle={
                    <View>
                        <View style={{paddingTop: 5, flexDirection: 'row'}}>
                            <Text style={styles.renderText} allowFontScaling={false}>{strings.store_name}：{rowData.shopName}</Text>
                        </View>
                        <View style={{paddingTop: 5, flexDirection: 'row'}}>
                            <Text style={styles.renderText} allowFontScaling={false}>{strings.store_addr}：{rowData.direccion}</Text>
                        </View>
                    </View>
                }
                subtitleStyle={styles.subTitleStyle}
                style={styles.listItemStyle}
                onPress={()=>this._onUnionMember(rowData)}
            />
        );
    };

  _onVolumeIconPress =() =>{};

  _onHelpIconPress =() =>{this.props.navigation.navigate('UnionState')};

  _onDiscountPress =() =>{this.props.navigation.push("UnionDiscount")};

  _onPricePress =() =>{this.props.navigation.push("UnionPrice")};

  _onUnionMember =(member) =>{
      const unionId = this.props.union.get("union").unionId;
      const merchantId = member.merchantId;
      this.props.dispatch(authActions.setCustomerDefaultMerchant(unionId, merchantId));
      this.props.dispatch(unionActions.setDefaultUnionAndMerchant(null,member));

  };

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
    },
    listViewWrapper:{
        width:SCREEN_WIDTH,
        height:SCREEN_HEIGHT/3,
        marginBottom: getHeaderHeight()
    },
    listView:{
        flex:1,
    },
    listItemStyle:{
        flex:1,
        borderBottomWidth: 0.8,
        borderColor: colors.saperatorLine,
    },
    image:{
        width:90,
        height:60,
    },
    subTitleStyle:{
        marginTop:5,
        color:colors.primaryGray
    },
    renderText: {
        fontSize: 18,
        alignItems: 'center'
    },
});

const mapStateToProps = (state) => ({
    auth: state.get('auth'),
    unionId:state.get('auth').get('unionId'),
    username:state.get('auth').get('username'),
    password:state.get('auth').get('password'),
    root: state.get('root'),
    union: state.get('union'),
});

export default connect(mapStateToProps)(UnionMemberList)
