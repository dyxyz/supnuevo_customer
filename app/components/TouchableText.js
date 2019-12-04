import React from 'react';
import {
  TouchableOpacity,
  View,
  ViewPropTypes,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

export default class TouchableText extends React.PureComponent {
  static propTypes = {
    containerStyle: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
    onPress: PropTypes.func.isRequired,
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  };

  static defaultProps = {
    containerStyle: {},
    textStyle: {},
  };

  render() {
    const {
      containerStyle,
      textStyle,
      content,
      onPress,
    } = this.props;

    return (
      <TouchableOpacity onPress={onPress} style={containerStyle}>
        <View>
          <Text style={textStyle}>
            {content}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
