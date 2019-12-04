import React from 'react';
import {View, Image, StyleSheet, TextInput, ViewPropTypes, Text} from 'react-native';
import PropTypes from 'prop-types';
import strings from '../resources/strings';
import colors from '../resources/colors';
import {SCREEN_WIDTH} from "../utils/tools";

export default class IntroDivider extends React.PureComponent {
  static propTypes = {
    intro: PropTypes.string,
    dividerStyle: PropTypes.object || null,
  };

  render() {

    var {intro} = this.props;

    return (
        <View style={[styles.container,this.props.dividerStyle]}>
          <Text style={styles.text}>{intro}</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:30,
    width:SCREEN_WIDTH,
    justifyContent:'center',
    textAlign:'left',
    backgroundColor:'#eee',
    paddingHorizontal:10
  },
  text: {
    color:'#666',
    fontSize:13
  },
});
