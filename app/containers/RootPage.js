/**
 * RootPage.js
 */

import React, {Component} from "react";
import {Image, StatusBar, StyleSheet, Text, View,ScrollView} from "react-native";
import {connect} from "react-redux";
import {ACTION_HELP, TopToolBar} from '../components/TopToolBar';
import {BottomToolBar, ACTION_BACK, ACTION_DISCOUNT,ACTION_LOGOUT} from '../components/BottomToolBar';
import * as authActions from "../actions/auth-actions";
import strings from "../resources/strings"
import constants from '../resources/constants';
import Button from "../components/Button";
import {getHeaderHeight} from "../utils/tools";

export class RootPage extends Component {


    constructor(props) {
        super(props);
        this.state={
        };
    }

    // componentWillMount() {
    //     this.props.dispatch(authActions.login(this.props.username, this.props.password));
    // }

  render() {
    const navigator = this.props.navigation;

    return (
        <View style={styles.container}>
            <TopToolBar title = {this.props.username+'-'+strings.first_page} navigation = {this.props.navigation}
                        rightAction={ACTION_HELP}
                        _onLeftIconPress={this._onVolumeIconPress}
                        _onRightIconPress={this._onHelpIconPress}/>
            <View style={{marginBottom: getHeaderHeight(),flex:1}}>
                <View style={styles.buttonWrapper}><Button title={strings.select_shop} iconName={'isv'} onPress={()=>navigator.push('UnionStack')}/></View>
                {this.props.unionId == null || this.props.unionId == undefined?

                        <View style={styles.buttonWrapper}><Button title={strings.shopping} iconName={'shoppingcart'} onPress={() => {alert(strings.shopping_with_union)}}/></View>

                    :

                        <View style={styles.buttonWrapper}><Button title={strings.shopping} iconName={'shoppingcart'} onPress={() => navigator.push('ShoppingStack')}/></View>

                }
                {this.props.unionId == null || this.props.unionId == undefined?

                    <View style={styles.buttonWrapper}><Button title={strings.my_order} iconName={'pay-circle-o1'} onPress={()=>{alert(strings.select_shop)}}/></View>
                    :
                    <View style={styles.buttonWrapper}><Button title={strings.my_order} iconName={'pay-circle-o1'} onPress={()=>navigator.push('OrderStack')}/></View>

                }
            </View>





            <BottomToolBar
                navigation = {this.props.navigation}
                rightAction = {ACTION_LOGOUT}
                _onRightIconPress = {this._onLogOutIconPress}
            />
        </View>
    );
  }



    _onVolumeIconPress =() =>{};
    _onHelpIconPress =() =>{this.props.navigation.navigate('RootState')};
    _onLogOutIconPress=()=>{this.props.dispatch(authActions.logout(1,this.props.username,this.props.password));
        this.props.navigation.navigate('AuthStack');
    }

};

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent: 'center'
    },
    buttonWrapper:{
        flex:1,
        alignItems:'center',
        justifyContent: 'center',
    }
});

const mapStateToProps = (state) => ({
    auth: state.get('auth'),
    unionId:state.get('auth').get('unionId'),
    cartId:state.get('auth').get('cartId'),
    username:state.get('auth').get('username'),
    password:state.get('auth').get('password'),
    root: state.get('root'),
});

export default connect(mapStateToProps)(RootPage)
