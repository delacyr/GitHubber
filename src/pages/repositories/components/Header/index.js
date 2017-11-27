/* Core */
import React, { Component } from 'react';

/* Presentational */
import { View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

import styles from './styles';

export default class Header extends Component {
  static propTypes = {
    checkRepository: PropTypes.func.isRequired,
  };

  state = {
    nameRepo: '',
  }

  render() {
    return (
      <View style={styles.superContainer}>
        <View style={styles.container}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            placeholder="Adicionar repositório"
            onChangeText={(nameRepo) => { this.setState({ nameRepo }); }}
          />
          <TouchableOpacity
            onPress={() => { this.props.checkRepository(this.state.nameRepo); }}
          >
            <Icon name="plus" size={16} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
