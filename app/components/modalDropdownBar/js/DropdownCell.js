/**
 * DropdownWrapper.js
 */

import React, {
    Component,
} from 'react';

import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import PropTypes from 'prop-types';
import ModalDropdown from './ModalDropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../../../resources/colors';

export default class DropdownCell extends Component {

    static propTypes = {
        defaultValue: PropTypes.string,
        dataList: PropTypes.array,

        onDropDownSelect: PropTypes.func
    };

    static defaultProps = {
        defaultValue: 'Please select...',
        dataList: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            isDropDown: true,
            dropDownName: this.props.defaultValue,
        };
    }

    render() {
        const {dataList } = this.props;
        const {dropDownName ,isDropDown} = this.state;

        return (
            <ModalDropdown
                style={styles.dropdown_cell}
                textStyle={styles.textstyle}
                dropdownStyle={styles.dropdown_style}
                options={dataList}
                renderRow={this.dropdown_renderRow.bind(this)}
                onSelect={(idx, value) => this.dropdown_onSelect(idx, value)}
                onDropdownWillShow={this.dropdown_willShow.bind(this)}
                onDropdownWillHide={this.dropdown_willHide.bind(this)}
            >
                <View style={styles.dropdown_viewcell}>
                    <Text style={styles.textstyle}>{dropDownName}</Text>
                    {
                        isDropDown?
                            <FontAwesome name={'angle-up'} size={20} color={colors.primaryGray} style={styles.dropdown_image}/>:
                            <FontAwesome name={'angle-down'} size={20} color={colors.primaryGray} style={styles.dropdown_image}/>
                    }
                </View>
            </ModalDropdown>
        );
    }

    dropdown_renderRow(rowData, rowID, highlighted){
        return (
            <TouchableOpacity >
                <View style={[styles.dropdown_row]}>
                    <Text style={[styles.dropdown_row_text, highlighted && {color: 'mediumaquamarine'}]}>
                        {rowData}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    dropdown_onSelect(idx, value) {
        this.setState({ dropDownName:value});
        this.props.onDropDownSelect(idx, value);
    }

    dropdown_willShow() {
        this.setState({isDropDown:true});
    }

    dropdown_willHide() {
        this.setState({isDropDown:false});
    }

}

const styles = StyleSheet.create({
    dropdown_cell: {
        flex:1,
        alignItems:'center',
        flexDirection:'row',
        height:40,
        borderRightColor:'#cdcdcd',
        borderRightWidth:0.5,

    },
    dropdown_viewcell: {
        width:'100%',
        alignItems:'center',
        height:40,
        justifyContent:'center',
        flexDirection:'row',
    },
    textstyle: {
        fontSize: 13,
        textAlign: 'center',
        color:'#646464',
        justifyContent:'center',
    },
    dropdown_style: {
        flex:1,
        height: 100,
        borderColor: '#cdcdcd',
        borderWidth: 0.7,
    },
    dropdown_row: {
        flexDirection: 'row',
        height: 50,
        width: 100,
        alignItems: 'center',
    },
    dropdown_row_text: {
        fontSize: 13,
        color: '#646464',
        textAlignVertical: 'center',
        justifyContent:'center',
        marginLeft: 5,
    },
    dropdown_image: {
        marginLeft: 5
    },
});
