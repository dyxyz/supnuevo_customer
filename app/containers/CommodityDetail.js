import React,{Component} from 'react';
import {View,Text,ScrollView,StyleSheet,TouchableOpacity,Platform,Image,Modal} from 'react-native';

import * as authActions from "../actions/auth-actions";
import * as shoppingActions from '../actions/shopping-actions';
import ImageViewer from 'react-native-image-zoom-viewer';
import {getHeaderHeight, SCREEN_HEIGHT, SCREEN_WIDTH} from "../utils/tools";
import constants from "../resources/constants";
import colors from "../resources/colors";
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from "react-redux";
import {TopToolBar} from "../components/TopToolBar";
import {ACTION_BACK,BottomToolBar} from "../components/BottomToolBar";
import {SwipeRow,SwipeListView} from 'react-native-swipe-list-view';
import strings from "../resources/strings"
import * as unionActions from "../actions/union-actions";

var _SwipeRow: SwipeRow;
const count = constants.PRICE_LIST_PAGE;

export class commodityDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            bigPictureVisible:false,
            bigPictureUrl:null,
            amount:this.props.navigation.state.params.price.amount,
            searchText:this.props.navigation.state.params.searchText,
            detail:this.props.navigation.state.params.price,
            priceList:this.props.navigation.state.params.priceList,
            index:this.props.navigation.state.params.index,
            isPrice:this.props.navigation.state.params.isPrice,
            // page:this.props.navigation.state.params.page,
            direction:null,
            end:false
        };
    }

    render(){
        const index=this.state.index;
        const detail=this.state.priceList[index];
        const imageuri =strings.head+ detail.imageUrl;

        var ts=new Date().getTime();
        return(
            <View style={styles.container}>
                <TopToolBar title = {this.props.union.get("union").unionName} navigation = {this.props.navigation}
                            _onLeftIconPress={this._onVolumeIconPress}
                            _onRightIconPress={this._onHelpIconPress}
                />
                {/*<Modal visible={this.state.bigPictureVisible} transparent={true}>*/}

                    {/*<ImageViewer imageUrls={[{url:imageuri+"?"+ts,props:{}}]} onClick={()=>this.setState({bigPictureVisible:false})}/>*/}

                {/*</Modal>*/}

                <View style={{marginBottom: getHeaderHeight()}}>
                    <View style={{marginTop:SCREEN_HEIGHT*0.05,alignItems:'center',flexDirection:"row",justifyContent:'space-around'}}>
                        <TouchableOpacity onPress={this.lastCommodity}>
                        <Icon name="angle-left" size={SCREEN_WIDTH*0.1} color='rgb(112,112,112)'/>
                        </TouchableOpacity>

                        {
                            detail.imageUrl==null || detail.imageUrl==undefined ?
                                <Icon name="photo" size={SCREEN_HEIGHT*0.28} color='rgb(112,112,112)'/>
                                :
                                <TouchableOpacity
                                    // onPress={()=>this.setState({bigPictureVisible:true,bigPictureUrl:imageuri})}
                                    onPress={()=>{this.props.navigation.push("BigPicture",{bigPictureUrl:detail.imageUrl});}}
                                >
                                    <Image resizeMode="contain" style={{
                                        width: SCREEN_HEIGHT*0.28,
                                        height: SCREEN_HEIGHT*0.28,
                                    }}
                                           source={{uri:imageuri}}
                                    />
                                </TouchableOpacity>
                        }
                        <TouchableOpacity onPress={this.nextCommodity}>
                        <Icon name="angle-right" size={SCREEN_WIDTH*0.1} color='rgb(112,112,112)'/>
                        </TouchableOpacity>

                    </View>
                    {this.state.end?
                        <View style={[styles.detail,{backgroundColor:colors.baseWhite}]}>
                            <Text style={[styles.textStyle,{color:colors.baseBlack}]} allowFontScaling={false}>{strings.reach_end}</Text>
                        </View>
                        :
                        null
                    }
                    {/*{this.state.index==this.state.priceList.length-1 && this.state.isPrice==true && this.state.searchText==''?*/}
                        {/*<TouchableOpacity*/}
                            {/*onPress={this.loadMoreCommodity}*/}
                        {/*>*/}
                            {/*<View style={[styles.detail,{width:'auto',marginTop:10,borderRadius:5}]}>*/}
                                {/*<Text style={styles.textStyle} allowFontScaling={false}>加载更多商品</Text>*/}
                            {/*</View>*/}
                        {/*</TouchableOpacity>*/}

                        {/*:*/}
                        {/*null*/}
                    {/*}*/}

                    {index==0 || index==this.state.priceList.length-1?
                        <View style={[styles.detail,{marginTop:SCREEN_HEIGHT*0.04}]}>
                            <Text style={styles.textStyle} allowFontScaling={false}>{detail.codigo}</Text>
                        </View>
                        :
                        <View style={[styles.detail,{marginTop:SCREEN_HEIGHT*0.1}]}>
                            <Text style={styles.textStyle} allowFontScaling={false}>{detail.codigo}</Text>
                        </View>
                    }

                    {/*<View style={styles.detail}>*/}
                        {/*<Text style={styles.textStyle} allowFontScaling={false}>{strings.goods_sim}：{detail.nombre}</Text>*/}
                    {/*</View>*/}
                    <View style={styles.detail}>
                        <Text style={styles.textStyle} allowFontScaling={false}>{detail.commodityName}{this.state.isPrice}</Text>
                    </View>
                    <View style={styles.detail}>
                        <Text style={styles.textStyle} allowFontScaling={false}>$</Text>
                        <Text style={{fontSize:24,fontWeight:"900",color:colors.brightRed,marginLeft:5}} allowFontScaling={false}>{detail.price}</Text>
                    </View>
                    <View style={[styles.detail,{backgroundColor:colors.baseWhite,marginTop:15}]}>
                        <TouchableOpacity
                            onPress={() => {
                                this._onUpdateCartCommodity(constants.CART_DECLINE, detail)
                            }}
                        >
                            <View style={{width:40,height:35,justifyContent:"center",alignItems:"center",backgroundColor:colors.baseOrange,borderBottomLeftRadius:8,borderTopLeftRadius:8}}><Text style={[styles.textStyle,{fontSize:20}]}>-</Text></View>
                        </TouchableOpacity>
                        {
                            detail.amount==null?
                                <View style={{width:60,height:35,borderBottomWidth:1,borderTopWidth:1,borderColor:colors.primaryGrayLight,justifyContent:"center",alignItems:"center"}}><Text>0</Text></View>
                                :
                                <View style={{width:60,height:35,borderBottomWidth:1,borderTopWidth:1,borderColor:colors.primaryGrayLight,justifyContent:"center",alignItems:"center"}}><Text>{detail.amount}</Text></View>
                        }
                        <TouchableOpacity
                            onPress={() => {
                                this._onUpdateCartCommodity(constants.CART_ADD, detail)
                            }}
                        >
                            <View style={{width:40,height:35,justifyContent:"center",alignItems:"center",backgroundColor:colors.baseOrange,borderBottomRightRadius:8,borderTopRightRadius:8}}><Text style={[styles.textStyle,{fontSize:20}]}>+</Text></View>
                        </TouchableOpacity>
                    </View>
                </View>
                <BottomToolBar navigation={this.props.navigation}
                               leftAction={ACTION_BACK}
                               _onLeftIconPress={this._onBackIconPress}
                />
            </View>
        );
    }

    _onBackIconPress = () => {
        this.props.navigation.pop()
    };

    lastCommodity = () => {
        if(this.state.index>0){
            var i=this.state.index-1
            this.setState({index:i,end:false})
        }
        else{
            this.setState({end:true})
        }
        console.log(this.state.index)
        console.log(this.state.priceList)


    };

    nextCommodity = () => {

        if(this.state.index<this.state.priceList.length-2){
            var i=this.state.index+1
            this.setState({index:i,end:false})
        }
        else if(this.state.index==this.state.priceList.length-2){
            if(this.state.isPrice==true && this.state.searchText==''){
                // let curStart = this.state.page + 1;
                this.props.dispatch(unionActions.getUnionPriceList(this.props.unionId, this.props.start, count, this.props.cartId));
                // this.setState({page:curStart})
                console.log(this.state.priceList)
            }
            var i=this.state.index+1
            this.setState({index:i,end:false})

        }
        else if(this.state.index==this.state.priceList.length-1){
            if(this.state.isPrice==true && this.state.searchText==''){
                this.setState({priceList:this.props.priceList})
                var i=this.state.index+1
                this.setState({index:i,end:false})
            }
            else{
                this.setState({end:true})
            }

        }

        //
        // console.log(this.state.page)
        // console.log(this.state.index)
        console.log(this.state.priceList)
    };
    loadMoreCommodity= () => {
        console.log(this.state.page)
        let curStart = this.state.page + 1;
        this.props.dispatch(unionActions.getUnionPriceList(this.props.unionId, curStart, count, this.props.cartId));
        this.setState({priceList:this.props.priceList})
        console.log(this.state.priceList)
    }


    // _onUpdateCartCommodity = (type, item) => {
    //     if(type==constants.CART_ADD) {
    //         if(this.state.amount==null){
    //             this.state.amount=0
    //         }
    //         this.state.amount=this.state.amount+1
    //     }
    //     else{
    //         if(this.state.amount>0){
    //             this.state.amount=this.state.amount-1
    //         }
    //     }
    //     if(item.amount==0 || item.amount==undefined || item.amount==null){
    //         if(type==constants.CART_ADD) {
    //             this._onPriceListCommodityPress(item);
    //         }
    //     }
    //     else {
    //         this.props.dispatch(shoppingActions.updateCartInfo(this._transFromPriceToCartInfo(item, type), this.props.unionId,this.state.searchText));
    //     }
    //     this.state.detail.amount=this.state.amount
    //
    // }

    _onUpdateCartCommodity = (type, item) => {

        if(item.amount==0 || item.amount==undefined || item.amount==null){
            if(type==constants.CART_ADD) {
                this._onPriceListCommodityPress(item);
            }
        }
        else {
            this.props.dispatch(shoppingActions.updateCartInfo(this._transFromPriceToCartInfo(item, type), this.props.unionId,this.state.searchText,1,this.props.taxId));
        }
        if(type==constants.CART_ADD) {
            console.log('+')
            if(item.amount==null){
                this.state.priceList[this.state.index].amount=0
            }
            this.state.priceList[this.state.index].amount=this.state.priceList[this.state.index].amount+1
            console.log(this.state.priceList[this.state.index].amount)
            // this.state.priceList[this.state.index].amount=item.amount+1
        }
        else{
            console.log('-')
            if(this.state.priceList[this.state.index].amount>0){
                this.state.priceList[this.state.index].amount=this.state.priceList[this.state.index].amount-1
            }
        }
        // this.state.detail.amount=this.state.amount

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

    _onPriceListCommodityPress = (price) => {
        this.props.dispatch(shoppingActions.updateCartInfo(this._transFromPriceToCartInfo(price, constants.CART_CREATE), this.props.unionId,this.state.searchText,1,this.props.taxId));

    }

}

const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    detail:{
        height:SCREEN_HEIGHT*0.06,
        width:"100%",
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:10,
        // borderBottomWidth:2,
        // borderColor:colors.baseWhite,
        marginTop:8,
        backgroundColor:'rgb(236,154,64)',
    },
    textStyle:{
        color:colors.baseWhite,
        fontWeight:"bold",
        fontSize:16,
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
    root: state.get('root'),
    union: state.get('union'),
    username:state.get('auth').get('username'),
    unionId: state.get('auth').get("unionId"),
    cartId: state.get("auth").get("cartId"),
    priceList: state.get('union').get('priceList'),
    taxId: state.get('union').get('taxId'),
    start: state.get('union').get('start'),
});

export default connect(mapStateToProps)(commodityDetail)
