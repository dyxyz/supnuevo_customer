/**
 * DataForm.js
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
    ListView,
    Alert,
} from "react-native";
import {connect} from "react-redux";
import {ACTION_HELP, TopToolBar} from "../../components/TopToolBar";
import {ACTION_DISCOUNT, BottomToolBar,ACTION_ORDER} from "../../components/BottomToolBar";
import {Avatar, Badge, ListItem} from "react-native-elements";
import colors from "../../resources/colors";
import {getHeaderHeight, replaceMember, SCREEN_WIDTH,SCREEN_HEIGHT, showCenterToast} from "../../utils/tools";
import ShoppingCart from "../../components/ShoppingCart";
import {AISearchBar} from "../../components/AIServer";
import IntroDivider from "../../components/IntroDivider";
import constants from "../../resources/constants";
import * as shoppingActions from '../../actions/shopping-actions';
import * as unionActions from '../../actions/union-actions';
import * as rootActions from "../../actions/root-actions";
import * as authActions from "../../actions/auth-actions";
import strings from "../../resources/strings";
import {SpinnerWrapper} from "../../components/SpinnerLoading";
import NetworkingError from "../union/UnionPrice";
import RefreshListView from "../../components/RefreshListView";
import SwipeableView from "../../components/SwipeableView";
import {SwipeRow,SwipeListView} from 'react-native-swipe-list-view';
var _SwipeRow: SwipeRow;

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});



const count = constants.PRICE_LIST_PAGE;

export class ShoppingList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            start: 1,
            searchText: '',
            searchResult: [],
            selectedPrice: null,
            isSearchStatus: false,
            listHeight: 0,
        };
    }

    componentDidMount() {
        this.props.dispatch(rootActions.setLoading(false));
        this.props.dispatch(unionActions.getUnionPriceList(this.props.unionId, 0, count,this.props.cartId));
        this.props.dispatch(shoppingActions.getCartInfo(this.props.cartId,this.props.auth.get("unionId")));
        this.props.dispatch(unionActions.getUnionRegulation(this.props.auth.get("unionId")));
        // this.props.dispatch(authActions.login(this.props.username, this.props.password));
    }

    componentWillReceiveProps(nextProps) {
        const unionResponse = this.props.union.get('dataResponse');
        const nextUnionResponse = nextProps.union.get('dataResponse');

        const shoppingResponse = this.props.shopping.get('dataResponse');
        const nextShoppingResponse = nextProps.shopping.get('dataResponse');

        // 搜索引擎
        if (unionResponse === constants.INITIAL && nextUnionResponse === constants.GET_PRICE_LIST_LUCENE_SUCCESS) {
            this.props.dispatch(unionActions.resetUnionResponse());
        }else if (unionResponse === constants.INITIAL && nextUnionResponse === constants.GET_PRICE_LIST_LUCENE_FAIL){
            showCenterToast(strings.getUnionPriceListLuceneFail);
            this.props.dispatch(unionActions.resetUnionResponse());
        }
        // 获取购物车信息
        if (shoppingResponse === constants.INITIAL && nextShoppingResponse === constants.GET_CART_INFO_SUCCESS) {
            this.props.dispatch(shoppingActions.resetShoppingResponse());
        }else if (shoppingResponse === constants.INITIAL && nextShoppingResponse === constants.GET_CART_INFO_FAIL){
            showCenterToast(strings.getCartInfoFail);
            this.props.dispatch(shoppingActions.resetShoppingResponse());
        }
        // 更改购物车信息
        if (shoppingResponse === constants.INITIAL && nextShoppingResponse === constants.UPDATE_CART_INFO_SUCCESS) {
            this.props.dispatch(shoppingActions.resetShoppingResponse());
        }else if (shoppingResponse === constants.INITIAL && nextShoppingResponse === constants.UPDATE_CART_INFO_FAIL){
            showCenterToast(strings.updateCartInfoFail);
            this.props.dispatch(shoppingActions.resetShoppingResponse());
        }
    }

    onHeaderRefresh = () => {
        if(this.state.isSearchStatus)return;

        this.props.dispatch(unionActions.getUnionPriceList(this.props.unionId, 0, count,this.props.cartId));
        this.setState({start: 1});
    };

    onFooterRefresh = () => {
        if(this.state.isSearchStatus)return;

        let curStart = this.state.start + 1;
        this.props.dispatch(unionActions.getUnionPriceList(this.props.unionId, curStart, count, this.props.cartId));
        this.setState({start: curStart});
    };

    render() {
        const loading = this.props.root.get('loading');
        const {cartInfo} = this.props;
        const cartNumber = cartInfo && cartInfo.length>0?cartInfo.length:0;
        const regulation = this.props.union.get("regulation");

        return (
            <View style={styles.container}>
                <TopToolBar title = {this.props.username+'-'+regulation.unionName} navigation = {this.props.navigation}
                            rightAction={ACTION_HELP}
                            _onLeftIconPress={this._onVolumeIconPress}
                            _onRightIconPress={this._onHelpIconPress}/>
                <IntroDivider intro={strings.car_forth+' '+cartNumber+' '+strings.car_fore} _onClearPress={this._clearCar} flag={'1'} />
                {this._renderShoppingCart(cartInfo)}
                {this._renderSearchBar()}
                {this._renderPriceList()}
                <BottomToolBar navigation = {this.props.navigation}
                               leftAction = {ACTION_ORDER}
                               _onLeftIconPress = {this._onSkipPress}
                />
                <SpinnerWrapper loading={loading} title={strings.searching}/>
            </View>
        );
    }

    _renderShoppingCart(cartInfo){

        return(
            <ShoppingCart
                cartInfo={cartInfo}
                _onUpdateCartCommodity={(type, item, i)=>this._onUpdateCartCommodity(type, item, i)}
                navigateToDetail={(price)=>this.navigateToDetail(price)}
            />
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
            <TouchableOpacity onPress={()=>{this.navigateToDetail(price)}}>
                <View style={styles.listItemStyle}>


                    <View style={{width: SCREEN_WIDTH*0.85, flexDirection:"row",height: SCREEN_HEIGHT*0.1,alignItems:"center",justifyContent:"center",marginTop:10}}>


                        <SwipeRow
                            ref={(SwipeRow) => { _SwipeRow = SwipeRow; }}
                            automaticallyAdjustContentInsets={false}
                            swipeToOpenPercent={100}
                            scrollToEnd={true}
                            onRowOpen={(rowKey, rowMap) => {
                                if (rowKey > 0) {
                                    this._onUpdateCartCommodity(constants.CART_ADD, price,rowKey)
                                }
                                else if (rowKey < 0) {
                                    this._onUpdateCartCommodity(constants.CART_DECLINE, price,rowKey)
                                }
                            }}
                            // onSwipeValueChange={this.onAuxRowDidClose.bind(this)}
                            leftOpenValue={0.5}
                            rightOpenValue={-0.5}
                        >

                            <View style={styles.rowBack}>
                                        <TouchableOpacity onPress={() => {
                                            this._onUpdateCartCommodity(constants.CART_ADD, price)
                                        }}><Text style={{color:"white"}} allowFontScaling={false}>+1</Text></TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            this._onUpdateCartCommodity(constants.CART_DECLINE, price)
                                        }}><Text  style={{color:"white"}} allowFontScaling={false}>-1</Text></TouchableOpacity>
                            </View>

                                <View>
                                    <TouchableOpacity
                                        onPress={()=>{this.navigateToDetail(price)}}
                                        style={{width: SCREEN_WIDTH*0.85, flexDirection:"row",height: SCREEN_HEIGHT*0.1,alignItems:"center",justifyContent:"space-between"}}
                                    >
                                    <View style={{marginLeft:10}}>
                                        <Text allowFontScaling={false}>{price.nombre}</Text>
                                        <Text style={styles.subtitleText} allowFontScaling={false}>{price.codigo}</Text>
                                    </View>
                                    <View style={{marginRight:10,justifyContent:"center"}}>

                                        <Text allowFontScaling={false}>{price.price}</Text>
                                    </View>
                                    </TouchableOpacity>
                                </View>



                        </SwipeRow>
                        <View>
                            {
                                price.amount !=null && price.amount!=undefined?
                                    <Badge value={price.amount} status="error" containerStyle={{ position: 'absolute', top: -SCREEN_HEIGHT*0.07, right: -SCREEN_WIDTH*0.012 }}/>
                                    :
                                    null
                            }
                        </View>


                    </View>
                </View>





            </TouchableOpacity>
        );
    };




    _onSkipPress=() =>{this.props.navigation.push("OrderCommit")};

    _onVolumeIconPress =() =>{};

    _onHelpIconPress =() =>{this.props.navigation.navigate('ShoppingState')};

    _onMicrophonePress = ()=>{
        this.props.dispatch(unionActions.getUnionPriceList(this.props.unionId, 0, count,this.props.cartId));
    };

    _onUpdateCartCommodity = (type, item,rowKey) => {
        if(item.amount==0 || item.amount==undefined || item.amount==null){
            if(rowKey>0) {
                this._onPriceListCommodityPress(item);
            }
        }
        else {
            this.props.dispatch(shoppingActions.updateCartInfo(this._transFromPriceToCartInfo(item, type), this.props.unionId));
        }
        this.props.dispatch(unionActions.getUnionPriceList(this.props.unionId, 0, count,this.props.cartId));
    }

    _searchTextChange = (text) => {
        this.setState({searchText: text});
        if (!text) {
            this._clearSearchInput()
            return;
        }
    };

    _clearCar=()=>{
        this.props.dispatch(shoppingActions.clearCartInfo(this.props.cartId,this.props.unionId));
    }

    _clearSearchInput = () => this.setState({searchText: ''})

    _onSearchPress = () => {
        this.setState({isSearchStatus: true});
        this.props.dispatch(unionActions.getUnionPriceListLucene(this.props.unionId, this.state.searchText,this.props.cartId));
    };

    _onPriceListCommodityPress = (price) => {
        this.props.dispatch(shoppingActions.updateCartInfo(this._transFromPriceToCartInfo(price, constants.CART_CREATE), this.props.unionId));
        this.props.dispatch(unionActions.getUnionPriceList(this.props.unionId, 0, count,this.props.cartId));
    }

    _transFromPriceToCartInfo(price, type){
        var amount =1;
        switch (type) {
            case constants.CART_CREATE:amount=1;break;
            case constants.CART_ADD:amount=price.amount+1;break;
            case constants.CART_DECLINE:amount=price.amount-1;break;
        }
        const carInfo = {itemId: price.itemId, commodityId: price.commodityId, amount: amount,cartId:this.props.cartId};
        return carInfo;
    }

    navigateToDetail=(price)=> {
        this.props.navigation.push("commodityDetail",{price:price});
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
        marginBottom: 40,
    },
    listItemStyle:{
        marginTop:20,
        flex:1,
        width:SCREEN_WIDTH*0.9,
        borderWidth: 1,
        borderColor: colors.saperatorLine,
        borderRadius:SCREEN_WIDTH*0.02,
        alignItems:"center",
        justifyContent:"center",
    },
    image:{
        width:90,
        height:60,
    },
    subtitleText:{
        fontSize:16,
        color: colors.brightRed,
        marginTop:10,
    },
    rowBack: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

const mapStateToProps = (state) => ({
    auth: state.get('auth'),
    username:state.get('auth').get('username'),
    password:state.get('auth').get('password'),
    root: state.get('root'),
    union: state.get("union"),
    unionId: state.get('auth').get("unionId"),
    cartId: state.get("auth").get("cartId"),
    shopping: state.get('shopping'),
    cartInfo: state.get('shopping').get("cartInfo"),
});

export default connect(mapStateToProps)(ShoppingList)
