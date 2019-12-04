import React from 'react';
import {View, Image, StyleSheet, TextInput, ViewPropTypes, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import colors from '../resources/colors';
import {SCREEN_WIDTH} from "../utils/tools";

export default class Button extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
  };

  render() {

    var {title} = this.props;

    return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.buttonStyle} onPress={this._onPress}>
            <Text style={styles.textStyle}>{title}</Text>
          </TouchableOpacity>
        </View>
    );
  }

  _onPress = () => {this.props.onPress()}

}

const styles = StyleSheet.create({
  container: {
    height:50,
    width:SCREEN_WIDTH,
    justifyContent:'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  buttonStyle:{
    borderRadius:5,
    backgroundColor:colors.primaryColor,
    width: 200,
    height:40,
    justifyContent:'center',
    alignItems:'center',
  },
  textStyle: {
    color:'#fff',
    fontSize:18
  },
});
