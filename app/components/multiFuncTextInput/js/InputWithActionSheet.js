import React, { PureComponent } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import colors from '../../../resources/colors';
import strings from '../../../resources/strings';
import {SCREEN_WIDTH} from "../../../utils/tools";

import ActionSheet from 'react-native-actionsheet';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 1;

const componentStyles = StyleSheet.create({
  optionButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 22,
    height: '100%',
  },
  containerStyle: {
    width:SCREEN_WIDTH,
    height:44,
  },
  titleWrapperStyle:{
    flex:1,
    height:44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrapperStyle: {
    width: 300,
    height: 44,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: colors.primaryGray,
  },
  titleStyle:{
    color: '#555',
    fontSize: 14
  },
  textStyle:{
    color: 'black',
    fontSize: 14
  }
});


export default class InputWithActionSheet extends PureComponent {
  static contextTypes = {
    styles: () => null,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const inputWidth = 300 - 22;
    const {title, actionSheetOptions, option} = this.props;

    return (
        [
        <View style={[componentStyles.containerStyle, { flexDirection: 'row' }]}>
          <View style={componentStyles.titleWrapperStyle}>
            <Text style={componentStyles.titleStyle}>{title}</Text>
          </View>
          <View style={[componentStyles.textWrapperStyle , { flexDirection: 'row' }]}>
            <Text style={[componentStyles.textStyle, { width: inputWidth, flexGrow: 1, borderWidth: 0 }]} >{option}</Text>
                <TouchableOpacity onPress={this._onPressOptions} style={componentStyles.optionButtonContainer}>
                  <Ionicons name={'md-more'} size={20} color={colors.primaryGrayLight}/>
                </TouchableOpacity>
            {this.props.children}
          </View>
        </View>,
          <ActionSheet
              ref={(p) => {
                this.actionSheet =p;
              }}
              title={strings.action_choose}
              options={actionSheetOptions}
              cancelButtonIndex={CANCEL_INDEX}
              destructiveButtonIndex={DESTRUCTIVE_INDEX}
              onPress={(data)=>{ this.props.handlePress(data); }}
          />
          ]
    );
  }

  _onPressOptions = () => this.actionSheet.show();
}
