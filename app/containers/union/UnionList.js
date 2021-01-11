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
import Modal from "react-native-modalbox";
import {connect} from "react-redux";
import IconA from 'react-native-vector-icons/AntDesign';
import {TopToolBar,ACTION_SEARCH,ACTION_ALL} from "../../components/TopToolBar";
import {BottomToolBar} from "../../components/BottomToolBar";
import {Avatar, ListItem} from "react-native-elements";
import colors from "../../resources/colors";
import constants from "../../resources/constants";
import strings from "../../resources/strings";
import { SCREEN_WIDTH, showCenterToast,SCREEN_HEIGHT} from "../../utils/tools";
import * as unionActions from "../../actions/union-actions";
import ModalDropdown from 'react-native-modal-dropdown';


let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export class UnionList extends Component {

  constructor(props) {
    super(props);
      this.state = {
          provinceId:null,
          cityName:null,
          provinceName:null,
      };
  }

  componentDidMount(){
      this.props.dispatch(unionActions.getProvinceList());
      this.props.dispatch(unionActions.getUnionList());
      this.props.dispatch(unionActions.getUnionAdvertisementList(1, 0, 5));
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
              <TopToolBar title = {strings.first_page}
                          navigation = {this.props.navigation}
                          rightAction={ACTION_SEARCH}
                          leftAction={ACTION_ALL}
                          _onLeftIconPress={this._onVolumeIconPress}
                          _onRightIconPress={this._onSearchPress}/>
              {this.state.cityName==null?
                  null
                  :
                  <View style={{width:SCREEN_WIDTH,padding:10,alignItems:'center',borderBottomWidth:1,
                      borderColor: colors.baseBlack,}}>
                      {this.state.cityName=='Todo'?
                          <Text style={{fontSize:18}}>{this.state.provinceName}</Text>
                          :
                          <Text style={{fontSize:18}}>{this.state.provinceName} - {this.state.cityName}</Text>
                      }

                  </View>
              }
              {this.props.unions.length>0?
                  this._renderUnionList(unions)
                  :
                  <View style={{flex:1,alignItems:'center',marginTop:SCREEN_HEIGHT*0.3}}>
                      <IconA name="exception1" size={60} color="rgb(114, 135, 191)" />
                      <Text style={styles.emptyText}>Esta zona no está disponible</Text>
                  </View>

              }
              {this.renderSelect()}




              <BottomToolBar
                  navigation = {this.props.navigation}
                  isRoot={true}
              />

          </View>
      );
  }

  _renderUnionList(unions){
      return(
          <View style={styles.listViewWrapper}>
              <ListView
                  style={styles.listView}
                  automaticallyAdjustContentInsets={false}
                  dataSource={ds.cloneWithRows(unions)}
                  renderRow={this._renderItem}
                  enableEmptySections={true}
              />
          </View>
      );
  }
  renderSelect(){
    return(
        <Modal
            style={[styles.modalbox,{backgroundColor:colors.primaryColor}]}
            position={"center"}
            ref={"search"}
            transparent={false}
            animationType={"slide"}
        >
            <View style={{alignItems:'center',justifyContent:'space-around',height:160}}>
                <ModalDropdown
                    defaultValue={'Elegir provincia'}
                    style={{borderWidth:1,minWidth:SCREEN_WIDTH*0.5,width:'auto',padding:8,backgroundColor:colors.baseWhite}}
                    options={this.props.province}
                    renderRow={this.renderProvince}
                    renderButtonText={(rowData) => this.provinceDisplay(rowData)}
                    onSelect={(idx,value)=>this.chooseProvince(idx,value)}
                />
                {this.state.provinceId==null?
                    null
                    :
                    <ModalDropdown
                        defaultValue={'Elegir ciudad'}
                        style={{borderWidth:1,minWidth:SCREEN_WIDTH*0.5,width:'auto',padding:8,backgroundColor:colors.baseWhite}}
                        options={this.props.city}
                        renderRow={this.renderCity}
                        renderButtonText={(rowData) => this.cityDisplay(rowData)}
                        onSelect={(idx,value)=>this.chooseCity(idx,value)}
                    />
                }
            </View>
        </Modal>
    )
  }
  renderProvince(option,index,isSelected){
      return(
          <View style={styles.provinceRow}>
              <Text>{option.provinceName}</Text>
          </View>
      );
  }
    provinceDisplay(rowData){
      return rowData.provinceName
    }
  chooseProvince(idx,value){
      this.setState({provinceId:value.provinceId,provinceName:value.provinceName})
      this.props.dispatch(unionActions.getCityList(value.provinceId));
      console.log(this.props.city)
  }

    renderCity(option,index,isSelected){
        return(
            <View style={styles.provinceRow}>
                <Text>{option.cityName}</Text>
            </View>
        );
    }
    cityDisplay(rowData){
        return rowData.cityName
    }
    chooseCity(idx,value){
        this.setState({cityName:value.cityName})
        this.props.dispatch(unionActions.getUnionListByCityId(value.cityId,this.state.provinceId));
        this.refs.search.close()
        console.log(value.cityId+'value')
    }

    _renderItem = (rowData,sectionId,rowId) => {
      var ts=new Date().getTime();
      const image = rowData.imageUrl && rowData.imageUrl!==undefined?{uri:strings.head+rowData.imageUrl+"?"+ts}:require('../../assets/img/img_logo.png');
        return (
            <ListItem
                leftElement={<Image source={image} style={styles.image} resizeMode={"contain"}/>}
                title={rowData.unionName}
                titleStyle={{marginBottom:8}}
                subtitle={rowData.unionDes}
                style={styles.listItemStyle}

                // chevron
                onPress={()=>this._onUnionPress(rowData)}/>
        );
    };

  _onVolumeIconPress =() =>{
      this.props.dispatch(unionActions.getUnionList());
      this.setState({cityName:null})
  };

  _onSearchPress =() =>{this.refs.search.open()};

  _onUnionPress =(union) =>{
      console.log(union)
      const unionId = union.unionId;
      this.props.dispatch(unionActions.setDefaultUnionAndMerchant(union,null));
      this.props.dispatch(unionActions.getSupnuevoUnionCustomerShoppingCar(unionId));
      this.props.dispatch(unionActions.getUnionAdvertisementList(unionId, 0, 99));

          this.props.navigation.push("RootPage");


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
    },
    provinceRow:{
        width:'auto',
        padding:5,
        height:'auto',
        fontSize:16,
    },
    modalbox:{
        justifyContent:'center',
        alignItems:'center',
        height:300,
        borderRadius:20,
        // minHeight:400,
        width:SCREEN_WIDTH*0.8,
    },
    // noOrder:{
    //     height:SCREEN_HEIGHT*0.3,
    //     // justifyContent:'flex-end',
    //     width:SCREEN_WIDTH,
    //     alignItems:'center',
    //     backgroundColor:colors.baseWhite
    // },
});

const mapStateToProps = (state) => ({
    auth: state.get('auth'),
    root: state.get('root'),
    union: state.get('union'),
    unions:state.get('union').get('unions'),
    province:state.get('union').get('province'),
    city:state.get('union').get('city'),
    username:state.get('auth').get('username'),
});

export default connect(mapStateToProps)(UnionList)
