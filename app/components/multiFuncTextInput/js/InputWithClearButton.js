import React, { PureComponent } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import colors from '../../../resources/colors';
import {SCREEN_WIDTH} from "../../../utils/tools";
import Ionicons from 'react-native-vector-icons/Ionicons';

const componentStyles = StyleSheet.create({
  clearButtonContainer: {
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
  titleStyle:{
    color: '#555',
    fontSize: 14
  },
});

export default class InputWithClearButton extends PureComponent {
  static contextTypes = {
    styles: () => null,
  };

  constructor(props) {
    super(props);
    const { textInputProps: { value = '' } = {} } = this.props;
    this.state = {
      inputValue: value,
      isFocused: false,
    };
  }

  handleChangeText = (text: string) => {
    this.setState({
      inputValue: text,
    });
    try {
      this.props.textInputEvent.onChangeText(text);
    } catch (e) {
      /* todo */
    }
  };

  handleSubmitText = (value) => {
    try {
      this.props.textSubmitEvent.onSubmitText();
    } catch (e) {
      /* todo */
    }
  };

  handleClear = () => {
    this.textInput.clear();
    this.handleChangeText('');
    this.textInput.focus();
  };

  componentDidUpdate(prevProps) {
    if (this.textInput && this.textInput.isFocused()) {this.setState({isFocused:true});}
    else {this.setState({isFocused:false})}
  }

  render() {
    const inputWidth = this.props.hookCanBeCleared ? this.props.textInputwrapperStyle.width - 22 : this.props.wrapperStyle.width;
    const {title} = this.props;

    return (
        <View style={[{ ...this.props.containerStyle }, { flexDirection: 'row' }]}>
          {title && title !== ''?
            <View style={componentStyles.titleWrapperStyle}>
              <Text style={componentStyles.titleStyle}>{title}</Text>
            </View>:
              null
          }
        <View style={[{ ...this.props.textInputwrapperStyle }, { flexDirection: 'row' }]}>
          <TextInput
            style={[{ ...this.props.textInputStyle }, { width: inputWidth, flexGrow: 1, borderWidth: 0 }]}
            {...this.props.textInputEvent}
            {...this.props.textInputProps}
            {...this.props.textSubmitEvent}
            ref={(textInput) => {
              this.textInput = textInput;
            }}
            allowFontScaling={false}
            onChangeText={this.handleChangeText}
            onSubmitEditing={this.handleSubmitText}
          />
          {(this.props.hookCanBeCleared && this.state.inputValue.length > 0 && this.state.isFocused) && (
          <TouchableOpacity onPress={this.handleClear} style={componentStyles.clearButtonContainer}>
            <Ionicons name={'md-close-circle'} size={20} color={colors.primaryGrayLight}/>
          </TouchableOpacity>
          )}
          {this.props.children}
        </View>
        </View>
    );
  }
}

InputWithClearButton.defaultProps = {
  hookCanBeCleared: false,
  textInputwrapperStyle: {
    width: 300,
    height: 44,
    borderBottomWidth: 0.5,
    borderColor: colors.primaryGray,
  },
  textInputEvent: {

  },
  textInputStyle: {},
};
InputWithClearButton.propTypes = {
  hookCanBeCleared: PropTypes.bool,
  textInputwrapperStyle: PropTypes.shape({
    width: PropTypes.number,
  }),
  textInputEvent: PropTypes.object,
  textInputStyle: PropTypes.object,
};
