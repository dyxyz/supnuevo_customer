/**
 * ValidationTextInput used in Login.js
 */

import React, {Component} from "react";
import {View, TextInput, TouchableOpacity, Text} from "react-native";
import FloatLabelTextInput from "react-native-floating-label-text-input";
import Icon from 'react-native-vector-icons/FontAwesome'

export default class FloatingTextInput extends Component {

  constructor(props: {}) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <View style={validationTextStyles.containerStyle}>
            <View style={validationTextStyles.wrapperStyle}>
               <View style={validationTextStyles.iconWrapperStyle}>
                <Icon size={18} name={this.props.iconName} color="#fff"/>
              </View>
              <View style={validationTextStyles.textIndentWrapperStyle}>
                <FloatLabelTextInput
                    style={{backgroundColor:'transparent'}}
                    placeholder={this.props.placeText}
                    value={this.props.textInput}
                    secureTextEntry={this.props.isPassword}
                    selectionColor="#ff5a5d"
                    onChangeTextValue={this.handleTextChange}
                />
              </View>
            </View>
        </View>
    );
  }

  handleTextChange = (text: string) => {
    if (this.props.onChangeText) {
      this.props.onChangeText(text);
    }
  };
}

const validationTextStyles = {
  containerStyle: {
    flexDirection:'row',
    height:45,
    width:300,
    margin:10,
    padding:3,
    borderRadius:5,
    backgroundColor:'rgba(255,255,255,0.2)',
  },
  wrapperStyle: {
    flex: 1,
    flexDirection:'row',
  },
  iconWrapperStyle: {
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    padding:4,
    paddingHorizontal:2
  },
  textIndentWrapperStyle:{
    flex:6,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start'
  }
};

