import React from 'react';
import { View, StyleSheet, ActivityIndicator, Platform, Text } from 'react-native';
import colors from '../../../resources/colors';
import strings from '../../../resources/strings';

export default class CommonLoading extends React.PureComponent {
  render() {
    const { width } = require('Dimensions').get('window');
    return (
      <View style={[styles.common, !this.props.hideBackground ? styles.wrapper : null, { top: this.props.top ? this.props.top : (width * 3) / 4 }]}>
        <ActivityIndicator color={colors.baseWhite} size="large" />
        <Text style={styles.text}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  common: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  wrapper: {
    backgroundColor: colors.baseWhite,
    width: 64,
    height: 64,
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: { h: 5, w: 5 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  text: {
    color:colors.baseWhite,
    marginTop: 10,
    fontSize: 14
  }
});
