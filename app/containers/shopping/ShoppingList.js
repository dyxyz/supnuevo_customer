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
import {ACTION_DISCOUNT, BottomToolBar, ACTION_ORDER, ACTION_RULE,ACTION_CLASS} from "../../components/BottomToolBar";
import {Avatar, Badge, ListItem} from "react-native-elements";
import colors from "../../resources/colors";
import {
    getHeaderHeight, replaceMember, SCREEN_WIDTH, SCREEN_HEIGHT, showCenterToast,
    getTabBarHeight,toDecimal2
} from "../../utils/tools";
import ShoppingCart from "../../components/ShoppingCart";
import {AISearchBar} from "../../components/AIServer";
import IntroDivider from "../../components/IntroDivider";
import constants from "../../resources/constants";
import * as shoppingActions from '../../actions/shopping-actions';
import * as unionActions from '../../actions/union-actions';
import * as rootActions from "../../actions/root-actions";
import * as authActions from "../../actions/auth-actions";
import strings from "../../resources/strings";
import ImageViewer from 'react-native-image-zoom-viewer';
import {SpinnerWrapper} from "../../components/SpinnerLoading";
import NetworkingError from "../union/UnionPrice";
import RefreshListView from "../../components/RefreshListView";
import Modal from "react-native-modalbox";
import SwipeableView from "../../components/SwipeableView";
import {SwipeRow,SwipeListView} from 'react-native-swipe-list-view';
var _SwipeRow: SwipeRow;

import {BigPicture} from "./BigPicture";

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});



const count = constants.PRICE_LIST_PAGE;

export class ShoppingList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            start: 1,
            searchText:'',
            searchResult: [],
            selectedPrice: null,
            isSearchStatus: false,
            listHeight: 0,
            backTop:0,
            bigPictureVisible:false,
            bigPictureUrl:null,
            leftOpenValue:50,
            rightOpenValue:-50,
            // canLoad:0
            // priceList:this.props.union.get('priceList'),
        };
    }

    componentDidMount() {
        this.props.dispatch(rootActions.setLoading(false));
        this.props.dispatch(unionActions.getUnionPriceList(this.props.unionId, 0, count,this.props.cartId));
        this.props.dispatch(shoppingActions.getCartInfo(this.props.cartId,this.props.unionId));
        this.props.dispatch(unionActions.getUnionRegulation(this.props.unionId));
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
        // this.setState({start: 1});
    };

    onFooterRefresh = () => {
        if(this.state.isSearchStatus)return;

        // let curStart = this.state.start + 1;
        this.props.dispatch(unionActions.getUnionPriceList(this.props.unionId, this.props.start, count, this.props.cartId));
        console.log(this.props.start)
        // this.setState({start: curStart});
    };

    render() {
        const loading = this.props.root.get('loading');
        const {cartInfo} = this.props;
        const cartNumber = cartInfo && cartInfo.length>0?cartInfo.length:0;
        var ts=new Date().getTime();
        const regulation = this.props.union.get("regulation");

        return (
            <View style={styles.container}>
                <TopToolBar
                    title = 'Carrito'
                    navigation = {this.props.navigation}
                            rightAction={ACTION_HELP}
                            leftAction={ACTION_DISCOUNT}
                            _onLeftIconPress={this._onVolumeIconPress}
                            _onRightIconPress={this._onHelpIconPress}/>
                <View
                    style={{marginBottom: Platform.OS=='ios'?8:getHeaderHeight(),flex:1}}
                >
                    <IntroDivider intro={strings.car_forth+' '+this.props.goodsNumber+' '+strings.car_fore+' ,$'+toDecimal2(this.props.goodsPrice)} _onClearPress={this._clearCar} flag={'1'} />
                    {this._renderShoppingCart(cartInfo)}
                    {this._renderSearchBar()}
                    {this._renderPriceList()}

                </View>
                <Modal
                    // visible={this.state.bigPictureVisible}
                    transparent={true}
                    ref={"modal"}
                >

                    <ImageViewer
                        imageUrls={[{url:strings.head+this.state.bigPictureUrl+"?"+ts,props:{}}]}
                        // onClick={()=>this.setState({bigPictureVisible:false})}
                        onClick={()=>{this.refs.modal.close()}}
                    />

                </Modal>
                {/*<View style={{height:getTabBarHeight(),*/}
                    {/*width:SCREEN_WIDTH,*/}
                    {/*paddingTop:15,*/}
                    {/*flexDirection:'row',*/}
                    {/*justifyContent:'center',*/}
                    {/*backgroundColor: colors.primaryColor,}}>*/}
                    {/*<Text>111</Text>*/}
                {/*</View>*/}
                <BottomToolBar navigation = {this.props.navigation}
                               leftAction = {ACTION_ORDER}
                               _onLeftIconPress = {this._onSkipPress}
                               rightAction={ACTION_CLASS}
                               _onRightIconPress={this._onClassPress}
                />
                <SpinnerWrapper loading={loading} title={strings.searching}/>
            </View>
        );
    }



    _renderShoppingCart(cartInfo){


            if(cartInfo.length==0){
                return(
                    <View style={{height:SCREEN_HEIGHT*0.24, width:SCREEN_WIDTH,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{textAlign:'center',fontWeight:'bold',fontSize:16}}>Para agregar deslizá hacia a la derecha. Para quitar hacia la izquierda.</Text>
                    </View>
                );
            }
            else{
                return(
                    <ShoppingCart
                        cartInfo={cartInfo}
                        _onUpdateCartCommodity={(type, item, i)=>this._onUpdateCartCommodity(type, item, i)}
                        navigateToDetail={(price,index,priceList,isPrice)=>this.navigateToDetail(price,index,priceList,isPrice)}
                    />
                );
            }

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
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
                    keyboardVerticalOffset={getHeaderHeight}
                    style={styles.container}>
                    {/*<SafeAreaView style={styles.container}>*/}
                        <RefreshListView
                            data={priceList}
                            footerEmptyDataText={strings.noData}
                            backTop={this.state.backTop}
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
                    {/*</SafeAreaView>*/}
                </KeyboardAvoidingView>
        );
    }

    renderCell = ({item, index}) => {
        // const priceList = this.props.priceList;
        const {priceList} = this.props;
        // console.log(priceList)
        // const priceList=this.state.priceList
        const price = priceList[index];
        // var ts=new Date().getTime();
        // var imageurl ="https://supnuevo.s3.sa-east-1.amazonaws.com/"+ this.state.attachDataUrl+"?"+ts;
        const image = price.imageUrl && price.imageUrl!==undefined?{uri:strings.head+price.imageUrl}:require('../../assets/img/img_logo.png');
        return (
            <TouchableOpacity
                // onPress={()=>{this.navigateToDetail(price)}}
            >
                <View style={styles.listItemStyle}>


                    <View style={{width: SCREEN_WIDTH*0.85, flexDirection:"row",height: SCREEN_HEIGHT*0.12,alignItems:"center",justifyContent:"center",marginTop:10}}>


                        <SwipeRow
                            ref={(SwipeRow) => { _SwipeRow = SwipeRow; }}
                            automaticallyAdjustContentInsets={false}
                            swipeToOpenPercent={100}
                            scrollToEnd={true}
                            preview={this.props.cartInfo.length===0}
                            previewOpenValue={50}
                            // previewDuration={3000}
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
                                        }}>
                                            {/*<View style={{width:30,backgroundColor:'red'}}>*/}
                                            <Text style={{color:"red"}} allowFontScaling={false}>+1</Text>
                                            {/*</View>*/}
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            this._onUpdateCartCommodity(constants.CART_DECLINE, price)
                                        }}><Text  style={{color:"red"}} allowFontScaling={false}>-1</Text></TouchableOpacity>
                            </View>

                                <View>
                                    <TouchableOpacity
                                        onPress={()=>{this.navigateToDetail(price,index,priceList,true)}}
                                        style={{width: SCREEN_WIDTH*0.85, flexDirection:"row",height: SCREEN_HEIGHT*0.1,alignItems:"center",justifyContent:"space-between",backgroundColor:colors.baseWhite}}
                                    >
                                    {price.commodityName==null || price.commodityName==undefined || price.commodityName==''?
                                        <View style={{marginLeft:10,maxWidth:SCREEN_WIDTH*0.65}}>
                                            <Text allowFontScaling={false}>{price.nombre}</Text>
                                            <Text style={styles.priceText} allowFontScaling={false}>$ {price.price}</Text>
                                            {/*<Text allowFontScaling={false}>{image}</Text>*/}
                                            {/*<Text style={styles.subtitleText} allowFontScaling={false}>{price.codigo}</Text>*/}
                                        </View>
                                        :
                                        <View style={{marginLeft:10,maxWidth:SCREEN_WIDTH*0.65}}>
                                            <View>
                                                <Text allowFontScaling={false}>{price.commodityName}</Text>
                                            </View>
                                            <View style={{flexDirection:'row'}}>
                                                <View>
                                                    <Text style={styles.priceText} allowFontScaling={false}>$ {price.price}</Text>
                                                </View>
                                                {price.advertisementUrl==undefined || price.advertisementUrl==null?
                                                    null
                                                    :
                                                    <TouchableOpacity
                                                        // onPress={()=>this.setState({bigPictureVisible:true,bigPictureUrl:price.advertisementUrl,backTop:0})}
                                                        onPress={()=>{this.props.navigation.push("BigPicture",{bigPictureUrl:price.advertisementUrl});this.setState({backTop:0})}}
                                                    >
                                                        <View style={{marginLeft:25}}>
                                                            <Text style={{fontSize:22,color:colors.baseCyan,fontStyle:'italic',fontWeight:'bold'}} allowFontScaling={false}>OFERTAS！</Text>
                                                        </View>
                                                    </TouchableOpacity>

                                                }
                                            </View>
                                            {/*<Text allowFontScaling={false}>{image}</Text>*/}
                                            {/*<Text style={styles.subtitleText} allowFontScaling={false}>{price.codigo}</Text>*/}
                                        </View>
                                    }

                                    <View style={{marginRight:10,justifyContent:"center"}}>
                                        <TouchableOpacity
                                            // onPress={()=>this.setState({bigPictureVisible:true,bigPictureUrl:price.imageUrl})}
                                            // onPress={()=>{this.refs.modal.open();this.setState({bigPictureUrl:price.imageUrl})}}
                                            onPress={()=>{this.props.navigation.push("BigPicture",{bigPictureUrl:price.imageUrl});}}
                                        >
                                            <Image source={image} style={{width:60,height:60}} resizeMode={"contain"}/>
                                        </TouchableOpacity>
                                        {/*<Text allowFontScaling={false}>{price.price}</Text>*/}
                                    </View>
                                    </TouchableOpacity>
                                </View>



                        </SwipeRow>
                        <View>
                            {
                                price.amount !=null && price.amount!=undefined && price.amount !=0?
                                    <Badge value={price.amount} status="error" containerStyle={{ position: 'absolute', top: -SCREEN_HEIGHT*0.085, right: -SCREEN_WIDTH*0.013 }}/>
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

    _onClassPress=() =>{this.props.navigation.push("CommodityClass",{ refresh: () => {
            this.setState({backTop:1});
        }})};

    _onVolumeIconPress =() =>{this.props.navigation.navigate('UnionDiscount')};

    _onHelpIconPress =() =>{this.props.navigation.navigate('ShoppingState')};

    _onMicrophonePress = ()=>{
        this.setState({isSearchStatus: false,searchText:'',backTop:0});
        this.props.dispatch(unionActions.getUnionPriceList(this.props.unionId, 0, count,this.props.cartId));
    };

    _onUpdateCartCommodity = (type, item,rowKey) => {
        this.setState({backTop:0})
        console.log(item)
        if(item.amount==0 || item.amount==undefined || item.amount==null){
            if(rowKey>0) {
                this._onPriceListCommodityPress(item);
            }
        }
        else {
            this.props.dispatch(shoppingActions.updateCartInfo(this._transFromPriceToCartInfo(item, type), this.props.unionId,this.state.searchText,0,this.props.taxId));
        }
        // this.setState({isSearchStatus: false});
        // this.props.dispatch(unionActions.getUnionPriceList(this.props.unionId, 0, count,this.props.cartId));
        // this.props.dispatch(unionActions.getUnionPriceListLucene(this.props.unionId, this.state.searchText,this.props.cartId));
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
        this.setState({isSearchStatus: true,backTop:1});

        this.props.dispatch(unionActions.getUnionPriceListLucene(this.props.unionId, this.state.searchText,this.props.cartId));
        console.log(this.props.union.get('refreshState'))
    };

    _onPriceListCommodityPress = (price) => {
        this.props.dispatch(shoppingActions.updateCartInfo(this._transFromPriceToCartInfo(price, constants.CART_CREATE), this.props.unionId,this.state.searchText,0));
        // this.props.dispatch(unionActions.getUnionPriceList(this.props.unionId, 0, count,this.props.cartId));
        // this.props.dispatch(unionActions.getUnionPriceListLucene(this.props.unionId, this.state.searchText,this.props.cartId));
    }

    _transFromPriceToCartInfo(price, type){
        console.log(price.itemId)
        var amount =1;
        switch (type) {
            case constants.CART_CREATE:amount=1;break;
            case constants.CART_ADD:amount=price.amount+1;break;
            case constants.CART_DECLINE:amount=price.amount-1;break;
        }
        const carInfo = {itemId: price.itemId, commodityId: price.commodityId, amount: amount,cartId:this.props.cartId,advertisementUrl:price.advertisementUrl};
        return carInfo;
    }

    navigateToDetail=(price,index,priceList,isPrice)=> {
        console.log(isPrice)
        this.setState({backTop:0});
        // this.setState({searchText: 'sousuo'})
        // if(isPrice===true){
        //
        //     if(this.state.searchText==null){
        //
        //         console.log(111)
        //     }
        //
        // }

        this.props.navigation.push("commodityDetail",{price:price,index:index,priceList:priceList,searchText:this.state.searchText,isPrice:isPrice});

    }

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent:'center',
        alignItems: 'center',
    },
    listViewWrapper:{
        width:SCREEN_WIDTH,
        flex:1,
    },
    listView:{
        flex:1,
        marginBottom: 40,
        // borderWidth:2,
        // borderColor:'blue'
    },
    listItemStyle:{
        marginTop:20,
        flex:1,
        width:SCREEN_WIDTH*0.9,
        borderWidth: 1,
        backgroundColor:colors.baseWhite,
        borderColor: colors.saperatorLine,
        borderRadius:SCREEN_WIDTH*0.02,
        alignItems:"center",
        justifyContent:"center",
        shadowColor:colors.baseBlack,
        shadowOffset:{h:2,w:2},
        shadowOpacity:0.7,
        marginLeft:4,
        marginRight:4,
        elevation: 8,
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
    priceText:{
        fontSize:20,
        fontWeight:"700",
        color:colors.brightRed,
        // marginLeft:5
    }
});

const mapStateToProps = (state) => ({
    auth: state.get('auth'),
    username:state.get('auth').get('username'),
    password:state.get('auth').get('password'),
    root: state.get('root'),
    union: state.get("union"),
    taxId: state.get('union').get('taxId'),
    backTop: state.get('union').get('backTop'),
    priceList: state.get('union').get('priceList'),
    start: state.get('union').get('start'),
    unionId: state.get('auth').get("unionId"),
    cartId: state.get("auth").get("cartId"),
    shopping: state.get('shopping'),
    cartInfo: state.get('shopping').get("cartInfo"),
    goodsNumber: state.get('shopping').get("goodsNumber"),
    goodsPrice: state.get('shopping').get("goodsPrice"),

});

export default connect(mapStateToProps)(ShoppingList)
