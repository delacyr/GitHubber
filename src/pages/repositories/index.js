/* Core */
import React, { Component } from 'react';
import api from 'services/api';
import PropTypes from 'prop-types';
/* Presentational */
import { View, Text, AsyncStorage, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import Header from 'pages/repositories/components/Header';
import styles from './styles';
import Repository from './components/Repository';


export default class Repositories extends Component {
  static navigationOptions = {
    header: ({ scene }) => (
      <Header checkRepository={nameRepo => scene.route.params.checkRepository(nameRepo)} />
    ),
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      setParams: PropTypes.func,
    }).isRequired,
  }

  state = {
    repositories: [],
    loading: false,
    refreshing: false,
  };

  componentWillMount() {
    // this.clearRepo();
    this.loadRepositories().then(() => {
      this.setState({ loading: false });
    });
  }

  componentDidMount() {
    this.props.navigation.setParams({
      checkRepository: this.checkRepository,
    });
  }

  checkRepository = (nameRepo) => {
    if (nameRepo.length === 0) return;
    this.saveRepository(nameRepo)
      .then(() => { this.loadRepositories(); });
  }

  clearRepo = async () => {
    await AsyncStorage.clear();
  }

  saveRepository = async (nameRepo) => {
    const response = await api.get(`/repos/${nameRepo}`);

    if (!response.ok) throw Error;

    const {
      id,
      name,
      organization: { login: organization },
      organization: { avatar_url: avatarUrl },
    } = response.data;

    const newRepo = {
      id,
      name,
      organization,
      avatarUrl,
    };

    await AsyncStorage.setItem('@githubber:repositories', JSON.stringify([newRepo, ...this.state.repositories]));
  }

  loadRepositories = async () => {
    this.setState({ refreshing: true, loading: true });

    const repositories = await AsyncStorage.getItem('@githubber:repositories')
      .then(response => (response ? JSON.parse(response) : []));

    this.setState({ repositories, refreshing: false, loading: false });
  }

  renderRepositories = () => (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this.loadRepositories}
        />
      }
      data={this.state.repositories}
      extraData={this.state}
      keyExtractor={repository => repository.id}
      renderItem={({ item }) => <Repository repository={item} navigation={this.props.navigation} />}
    />
  );

  renderList = () => (
    // console.tron.log(this.state);
    // return (
    this.state.repositories.length
      ? this.renderRepositories()
      : <Text style={styles.empty}>Nenhum repositório encontrado</Text>
    // );
  )

  render() {
    return (
      <View style={styles.container}>
        { this.state.loading
          ? <ActivityIndicator size="small" color="#999" style={styles.loading} />
          : this.renderList() }

      </View>
    );
  }
}
