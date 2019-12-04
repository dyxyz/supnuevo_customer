import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import InfomationText from './TouchableText';
import strings from '../resources/strings';
import colors from '../resources/colors';

const icons = {
  smalling: require('../assets/img/icon_comingsoon.png'),
};

export default class NetworkingError extends React.PureComponent {
  static propTypes = {
    containerStyle: ViewPropTypes.style,
    retry: PropTypes.func,
    language: PropTypes.object,
  };

  static defaultProps = {
    containerStyle: { flex: 1 },
    retry: () => {},
    language: '',
  };

  render() {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <Image source={icons.smalling} style={styles.image} />
        <TextInput editable={false} style={styles.text}>
          {strings.networking_error}
        </TextInput>
        <InfomationText
          containerStyle={styles.button}
          content={strings.retry}
          onPress={this.props.retry}
          textStyle={styles.buttonText}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  image: {
    padding:10,
  },
  text: {
    color: colors.primaryColor,
    marginTop: 7,
    marginBottom: 11,
  },
  button: {
    backgroundColor: colors.primaryColor,
    width: 94,
    height: 28,
    borderRadius: 14,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: 28,
    textAlign: 'center',
    width: 94,
  },
});
