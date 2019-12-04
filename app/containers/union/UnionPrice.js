/**
 * UnionPrice.js
 */

import React, {Component} from "react";
import {Image, View, StyleSheet, ListView, KeyboardAvoidingView, Platform, SafeAreaView} from "react-native";
import {connect} from "react-redux";
import {TopToolBar} from "../../components/TopToolBar";
import {ACTION_BACK, BottomToolBar} from "../../components/BottomToolBar";
import goods from "../../test/goods";
import {Avatar, ListItem} from "react-native-elements";
import colors from "../../resources/colors";
import {getHeaderHeight, SCREEN_HEIGHT, SCREEN_WIDTH, showCenterToast} from "../../utils/tools";
import {AIAnswerBoard, AISearchBar} from '../../components/AIServer/index';
import * as unionActions from "../../actions/union-actions";
import constants from "../../resources/constants";
import NetworkingError from "./UnionDiscount";
import strings from "../../resources/strings";
import RefreshListView from "../../components/RefreshListView";
import {SpinnerWrapper} from "../../components/SpinnerLoading";
import * as rootActions from "../../actions/root-actions";

const count = constants.PRICE_LIST_PAGE;

export class UnionPrice extends Component {

    constructor(props) {
        super(props);
        this.state = {
            start: 1,
            searchText: '',
            searchResult: [],
            selectedPrice: null,
            isSearchStatus: false,
        };
    }

    componentDidMount() {
        this.props.dispatch(rootActions.setLoading(false));
        this.props.dispatch(unionActions.getUnionPriceList(this.props.unionId, 0, count));
    }

    componentWillReceiveProps(nextProps) {
        const Response = this.props.union.get('dataResponse');
        const nextResponse = nextProps.union.get('dataResponse');

        if (Response === constants.INITIAL && nextResponse === constants.GET_PRICE_LIST_LUCENE_SUCCESS) {
            this.props.dispatch(unionActions.resetUnionResponse());
        }else if (Response === constants.INITIAL && nextResponse === constants.GET_PRICE_LIST_LUCENE_FAIL){
            showCenterToast(strings.getUnionPriceListLuceneFail);
            this.props.dispatch(unionActions.resetUnionResponse());
        }
    }

    onHeaderRefresh = () => {
        if(this.state.isSearchStatus)return;

        this.props.dispatch(unionActions.getUnionPriceList(this.props.unionId, 0, count));
        this.setState({start: 1});
    };

    onFooterRefresh = () => {
        if(this.state.isSearchStatus)return;

        let curStart = this.state.start + 1;
        this.props.dispatch(unionActions.getUnionPriceList(this.props.unionId, this.state.searchText, curStart, count));
        this.setState({start: curStart});
    };

    render() {
        const loading = this.props.root.get('loading');

        return (
            <View style={styles.container}>
                <TopToolBar title="价格表" navigation={this.props.navigation}
                            _onLeftIconPress={this._onVolumeIconPress}
                            _onRightIconPress={this._onHelpIconPress}/>
                {this._renderSearchBar()}
                {this._renderPriceList()}
                <BottomToolBar navigation={this.props.navigation}
                               leftAction={ACTION_BACK}
                               _onLeftIconPress={this._onBackIconPress}/>
                <SpinnerWrapper loading={loading} title={'搜索中,请稍候...'}/>
            </View>
        );
    }

    _renderSearchBar() {
        return (
            <AISearchBar
                _onMicrophonePress={this._onMicrophonePress}
                _searchTextChange={(text) => this._searchTextChange(text)}
                _onSearchPress={this._onSearchPress}
                searchResult={this.state.searchResult}
                searchText={this.state.searchText}
            />
        );
    }

    _renderPriceList() {
        const prices = this.props.union.get("priceList");
        const datasError = this.props.union.get('datasError');
        const refreshState = this.props.union.get('refreshState');

        const priceList = prices && prices.length > 0 ? prices : [];

        return (
            datasError ?
                <NetworkingError
                    retry={() => this.props.dispatch(unionActions.getUnionPriceList(this.props.unionId, 0, count))}/>
                :
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}
                                      keyboardVerticalOffset={getHeaderHeight} style={styles.container}>
                    <SafeAreaView style={styles.container}>
                        <RefreshListView
                            data={priceList}
                            footerEmptyDataText={strings.noData}
                            footerFailureText={strings.loadError}
                            footerNoMoreDataText={strings.noMore}
                            footerRefreshingText={strings.loading}
                            ItemSeparatorComponent={() => <View style={styles.separator}/>}
                            keyExtractor={(item, index) => `${index}`}
                            onFooterRefresh={this.onFooterRefresh}
                            onHeaderRefresh={this.onHeaderRefresh}
                            refreshState={refreshState}
                            renderItem={this.renderCell}
                            style={styles.listView}
                        />
                    </SafeAreaView>
                </KeyboardAvoidingView>
        );
    }

    renderCell = ({item, index}) => {
        const priceList = this.props.union.get('priceList');
        const price = priceList[index];

        return (
            <ListItem
                title={price.nombre}
                subtitle={price.codigo}
                rightTitle={price.price}
                style={styles.listItemStyle}
                subtitleStyle={styles.subtitleText}
                rightTitleStyle={styles.rightTitle}
            />
        );
    };

    _onVolumeIconPress = () => {
    };

    _onHelpIconPress = () => {
    };

    _onMicrophonePress = () => {
    };

    _onBackIconPress = () => {
        this.props.navigation.pop()
    };

    _searchTextChange = (text) => {
        this.setState({searchText: text});
        if (!text) {
            this._clearSearchInput()
            return;
        }
    };

    _clearSearchInput = () => this.setState({searchText: ''})

    _onSearchPress = () => {
        this.setState({isSearchStatus: true});
        this.props.dispatch(unionActions.getUnionPriceListLucene(this.props.unionId, this.state.searchText));
    };
}

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
        marginBottom: 40,
    },
    listItemStyle:{
        flex:1,
        width:SCREEN_WIDTH,
        borderBottomWidth: 0.8,
        borderColor: colors.saperatorLine,
    },
    image:{
        width:90,
        height:60,
    },
    subtitleText:{
        fontSize:14,
        color: colors.primaryGray
    },
    imageWrapper:{
        flex: 1,
    },
    separator: {
        height: 0.5,
        backgroundColor: '#D5D5D5',
    },
    rightTitle:{
        fontSize: 20,
        color: colors.brightRed,
    }
});

const mapStateToProps = (state) => ({
    auth: state.get('auth'),
    root: state.get('root'),
    union: state.get('union'),
    unionId: state.get('union').get("union").unionId,
});

export default connect(mapStateToProps)(UnionPrice)
