import React,{Component} from 'react';
import {View,Text,ScrollView,StyleSheet} from 'react-native';

import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../utils/tools";
import constants from "../resources/constants";
import colors from "../resources/colors";
import {connect} from "react-redux";
import {TopToolBar} from "../components/TopToolBar";

export class help extends Component {

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

    render(){
        return(
            <View/>
        );
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
    },
});

const mapStateToProps = (state) => ({
    auth: state.get('auth'),
    root: state.get('root'),
    union: state.get('union'),
    unionId: state.get('union').get("union").unionId,
});

export default connect(mapStateToProps)(help)