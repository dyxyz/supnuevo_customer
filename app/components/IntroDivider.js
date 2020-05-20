import React from 'react';
import {View, Image, StyleSheet, TextInput, ViewPropTypes, Text,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import strings from '../resources/strings';
import colors from '../resources/colors';
import {SCREEN_WIDTH} from "../utils/tools";

export default class IntroDivider extends React.PureComponent {
  static propTypes = {
    intro: PropTypes.string,
      flag: PropTypes.string,
    dividerStyle: PropTypes.object || null,
  };

  render() {

    var {intro,flag} = this.props;

    return (
        <View style={[styles.container,this.props.dividerStyle]}>
          <View>
              <Text style={styles.text} allowFontScaling={false}>{intro}</Text>
          </View>
            {
              flag=='1'?
                  <TouchableOpacity onPress={this.props._onClearPress}>
                      <View style={styles.clearCar}>
                          <Text style={{color:colors.baseWhite}} allowFontScaling={false}>{strings.clearCar}</Text>
                      </View>
                  </TouchableOpacity>
                  :
                  null

            }

        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:40,
    width:SCREEN_WIDTH,
    justifyContent:'space-between',
      alignItems:"center",
    textAlign:'left',
      flexDirection:'row',
    backgroundColor:'#eee',
    paddingHorizontal:10
  },
  text: {
    color:'#666',
    fontSize:13
  },
    clearCar:{
      height:34,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:colors.baseOrange,
        width:SCREEN_WIDTH*0.25,
        borderRadius:SCREEN_WIDTH*0.02,
    }
});
