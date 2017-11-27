/* Core */
import React from 'react';
import PropTypes from 'prop-types';

/* Presentational */
import { View, Text, TouchableOpacity, Linking, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const Issue = ({ issue }) => {
  const {
    title,
    html_url,
    user: { login: user },
    user: { avatar_url: avatarUrl },
  } = issue;

  return (
    <View style={styles.container}>
      <Image
        style={styles.icon}
        source={{ uri: avatarUrl }}
      />
      <View style={styles.issueContainer}>
        <Text numberOfLines={1} style={styles.title}>{title}</Text>
        <Text style={styles.description}>{user}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(html_url).catch(err => console.error('An error occurred', err));
          }}
      >
        <Icon style={styles.button} name="chevron-right" size={20} color="#333" />
      </TouchableOpacity>

    </View>
  );
};

Issue.propTypes = {
  issue: PropTypes.shape({
    title: PropTypes.string,
    html_url: PropTypes.string,
    user: PropTypes.object,
    avatarUrl: PropTypes.string,
  }).isRequired,
};

export default Issue;
