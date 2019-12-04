/**
 * UnionList.js
 */
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
import {BottomToolBar} from "../../components/BottomToolBar";
import {Avatar, ListItem} from "react-native-elements";
import colors from "../../resources/colors";
import constants from "../../resources/constants";
import strings from "../../resources/strings";
import { SCREEN_WIDTH, showCenterToast} from "../../utils/tools";
import * as unionActions from "../../actions/union-actions";

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export class UnionList extends Component {

  constructor(props) {
    super(props);
      this.state = {
      };
  }

  componentDidMount(){
      this.props.dispatch(unionActions.getUnionList());
  }

    componentWillReceiveProps(nextProps) {
        const Response = this.props.union.get('dataResponse');
        const nextResponse = nextProps.union.get('dataResponse');

        if (Response === constants.INITIAL && nextResponse === constants.GET_UNION_LIST_SUCCESS) {
            this.props.dispatch(unionActions.resetUnionResponse());
        }else if (Response === constants.INITIAL && nextResponse === constants.GET_UNION_LIST_FAIL){
            showCenterToast(strings.getUnionListFail);
            this.props.dispatch(unionActions.resetUnionResponse());
        }
    }

  render() {
      const unions = this.props.union.get("unions");

      return (
          <View style={styles.container}>
              <TopToolBar title = {constants.Title_UnionList}
                          navigation = {this.props.navigation}
                          _onLeftIconPress={this._onVolumeIconPress}
                          _onRightIconPress={this._onHelpIconPress}/>
              {this._renderUnionList(unions)}
              <BottomToolBar navigation = {this.props.navigation}/>
          </View>
      );
  }

  _renderUnionList(unions){
      return(
          unions && unions.length>0?
          <View style={styles.listViewWrapper}>
              <ListView
                  style={styles.listView}
                  automaticallyAdjustContentInsets={false}
                  dataSource={ds.cloneWithRows(unions)}
                  renderRow={this._renderItem}/>
          </View>:null
      );
  }

    _renderItem = (rowData,sectionId,rowId) => {
      const image = rowData.imageUrl && rowData.imageUrl!==undefined?{uri:strings.head+rowData.imageUrl}:require('../../assets/img/img_logo.png');
        return (
            <ListItem
                leftElement={<Image source={image} style={styles.image} resizeMode={"contain"}/>}
                title={rowData.unionName}
                style={styles.listItemStyle}
                chevron
                onPress={()=>this._onUnionPress(rowData)}/>
        );
    };

  _onVolumeIconPress =() =>{};

  _onHelpIconPress =() =>{};

  _onUnionPress =(union) =>{
      const unionId = this.props.union.get("union").unionId;
      this.props.dispatch(unionActions.setDefaultUnionAndMerchant(union,null));
      this.props.dispatch(unionActions.getSupnuevoUnionCustomerShoppingCar(unionId));
      this.props.navigation.push("UnionMemberList");
  }

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
    },
    listViewWrapper:{
        width:SCREEN_WIDTH,
        flex:1,
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
    }
});

const mapStateToProps = (state) => ({
    auth: state.get('auth'),
    root: state.get('root'),
    union: state.get('union'),
});

export default connect(mapStateToProps)(UnionList)
