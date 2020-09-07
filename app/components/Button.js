import React from 'react';
import {View, Image, StyleSheet, TextInput, ViewPropTypes, Text, TouchableOpacity} from 'react-native';
import IconA from 'react-native-vector-icons/AntDesign';
import PropTypes from 'prop-types';
import colors from '../resources/colors';
import {SCREEN_WIDTH} from "../utils/tools";

export default class Button extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    iconName: PropTypes.string,
  };

  render() {

    var {title} = this.props;

    return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.buttonStyle} onPress={this._onPress}>
            <Text style={styles.textStyle} allowFontScaling={false}>{title}</Text>
            <IconA style={{marginLeft:8}} name={this.props.iconName} color="white" size={25}/>
          </TouchableOpacity>
        </View>
    );
  }

  _onPress = () => {this.props.onPress()}

}

const styles = StyleSheet.create({
  container: {
    height:'auto',
    width:SCREEN_WIDTH,
    justifyContent:'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  buttonStyle:{
    flexDirection:"row",
    borderRadius:5,
    backgroundColor:colors.primaryColor,
    width: SCREEN_WIDTH*0.7,
    height:40,
    justifyContent:'center',
    alignItems:'center',
  },
  textStyle: {
    color:'#fff',
    fontSize:15
  },
});
