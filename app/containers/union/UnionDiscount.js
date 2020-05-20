/**
 * UnionDiscount.js
 */

// 组件
import React, {Component} from "react";
import {
    Image,
    Text,
    View,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Modal
} from "react-native";
import {connect} from "react-redux";
import {TopToolBar} from "../../components/TopToolBar";
import {BottomToolBar, ACTION_BACK} from "../../components/BottomToolBar";
import {SCREEN_HEIGHT, SCREEN_WIDTH, getHeaderHeight, showCenterToast} from "../../utils/tools";
import * as unionActions from "../../actions/union-actions";
import constants from "../../resources/constants";
import strings from "../../resources/strings";
import NetworkingError from '../../components/NetworkingError';
import RefreshListView from "../../components/RefreshListView";

const count = constants.DISCOUNT_PAGE;

export class UnionDiscount extends Component {

  constructor(props) {
    super(props);
      this.state = {
          start: 1,
      };
  }

    componentDidMount() {
      this.props.dispatch(unionActions.getUnionAdvertisementList(this.props.unionId, 0, count));
    }

    onHeaderRefresh = () => {
        this.props.dispatch(unionActions.getUnionAdvertisementList(this.props.unionId, 0, count));
        this.setState({ start: 1 });
    };

    onFooterRefresh = () => {
        let curStart = this.state.start + 1;
        this.props.dispatch(unionActions.getUnionAdvertisementList(this.props.unionId, curStart, count));
        this.setState({start:curStart});
    };

  render() {
      const advertisements = this.props.union.get("advertisements");
      const datasError = this.props.union.get('datasError');
      const refreshState = this.props.union.get('refreshState');

      const advertisementsList = advertisements && advertisements.length>0?advertisements:[];

      return (
          <View style={styles.container}>
              <TopToolBar title = {this.props.username+'-'+strings.discount} navigation = {this.props.navigation}
                          _onLeftIconPress={this._onVolumeIconPress}
                          _onRightIconPress={this._onHelpIconPress}/>
              {datasError?
                  <NetworkingError retry={() => this.props.dispatch(unionActions.getUnionAdvertisementList(this.props.unionId,0,count))} />
                  :
                  <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} keyboardVerticalOffset={getHeaderHeight} style={styles.container}>
                      <SafeAreaView style={styles.container}>
                          <RefreshListView
                              data={advertisementsList}
                              footerEmptyDataText={strings.noData}
                              footerFailureText={strings.loadError}
                              footerNoMoreDataText={strings.noMore}
                              footerRefreshingText={strings.loading}
                              ItemSeparatorComponent={() => <View style={styles.separator} />}
                              keyExtractor={(item, index) => `${index}`}
                              onFooterRefresh={this.onFooterRefresh}
                              onHeaderRefresh={this.onHeaderRefresh}
                              refreshState={refreshState}
                              renderItem={this.renderCell}
                              style={styles.listView}
                          />
                      </SafeAreaView>
                  </KeyboardAvoidingView>
              }
              <BottomToolBar navigation = {this.props.navigation}
              leftAction={ACTION_BACK} _onLeftIconPress={this._onBackIconPress}/>
          </View>
      );
  }

    renderCell = ({ item, index }) => {

        const advertisements = this.props.union.get('advertisements');
        const advertisement = advertisements[index];
        const image = advertisement.image?{uri:strings.head+advertisement.image}:require('../../assets/img/img_logo.png');

        return (
            <View style={styles.imageCon}>
                <Image resizeMode="contain" style={styles.image} source={image}/>
            </View>
        );
    };

  _onVolumeIconPress =() =>{};

  _onHelpIconPress =() =>{};

    _onBackIconPress=() =>this.props.navigation.pop();
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    imageWrapper:{
        flex: 1,
    },
    image:{
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT*0.15,
    },
    imageCon:{
        height:SCREEN_HEIGHT*0.2,
        width:SCREEN_WIDTH,
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: 'column',
        marginTop:5,
        borderBottomWidth: 1,
        borderColor: '#ddd'
    },
    separator: {
        height: 0.5,
        backgroundColor: '#D5D5D5',
    },
    listView: {
        flex: 1,
        backgroundColor: 'white',
        marginBottom: 40,
    },
});

const mapStateToProps = (state) => ({
    auth: state.get('auth'),
    root: state.get('root'),
    union: state.get('union'),
    unionId: state.get('union').get("union").unionId,
    username:state.get('auth').get('username'),
});

export default connect(mapStateToProps)(UnionDiscount)
