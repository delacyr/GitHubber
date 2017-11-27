/* Core */
import React, { Component } from 'react';

/* Presentational */
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import styles from './styles';

export default class Repository extends Component {
  static propTypes = {
    repository: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      organization: PropTypes.string,
      avatarUrl: PropTypes.string,
    }).isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      setParams: PropTypes.func,
    }).isRequired,
  };

  render() {
    const { repository } = this.props;

    return (
      <View style={styles.container}>
        <Image
          style={styles.icon}
          source={{ uri: repository.avatarUrl }}
        />
        <View style={styles.repoContainer}>
          <Text style={styles.title}>{repository.name}</Text>
          <Text style={styles.description}>{repository.organization}</Text>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Issues', { name: repository.name, organization: repository.organization })}
        >
          <Icon style={styles.button} name="chevron-right" size={20} color="#333" />
        </TouchableOpacity>
      </View>
    );
  }
}
