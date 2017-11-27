/* Core */
import React from 'react';
import PropTypes from 'prop-types';

/* Presentational */
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from 'styles';
import styles from './styles';

const Repository = ({ repository, navigation }) => (
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
      onPress={() => navigation.navigate('Issues', { name: repository.name, organization: repository.organization })}
    >
      <Icon style={styles.button} name="chevron-right" size={20} color={colors.darker} />
    </TouchableOpacity>
  </View>
);

Repository.propTypes = {
  repository: PropTypes.shape({
    name: PropTypes.string,
    organization: PropTypes.string,
    avatarUrl: PropTypes.string,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default Repository;
