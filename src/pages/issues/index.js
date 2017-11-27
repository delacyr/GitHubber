/* Core */
import React, { Component } from 'react';
import api from 'services/api';
import PropTypes from 'prop-types';
/* Presentational */
import { ActivityIndicator, View, Text, FlatList, RefreshControl, TouchableOpacity, AsyncStorage } from 'react-native';
import Issue from './components/Issue';


import styles from './styles';

export default class Issues extends Component {
  static navigationOptions = {
    title: 'GitHubber',
  };

  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.object,
      }).isRequired,
    }).isRequired,
  }

  state = {
    issues: [],
    status: '',
    refreshing: false,
    loading: false,
  }

  componentWillMount() {
    console.tron.log('Ill load');
    this.loadStatus().then(() => { console.tron.log('status loaded will'); this.loadIssues(); });
  }

  loadStatus = async () => {
    console.tron.log('loading status');

    const status = await AsyncStorage.getItem('@githubber:status')
      .then(response => (response ? JSON.parse(response) : 'all'));

    this.setState({ status });
    console.tron.log('status loaded');
  }

  loadIssues = async () => {
    this.setState({ refreshing: true, loading: true });

    const { name, organization } = this.props.navigation.state.params;

    const response = await api.get(`/repos/${organization}/${name}/issues?state=${this.state.status}`);

    if (!response.ok) throw Error;

    this.setState({ issues: response.data, refreshing: false, loading: false });
    // console.tron.log(this.state);
  }

  saveStatus = async (param) => {
    await AsyncStorage.setItem('@githubber:status', JSON.stringify(param));
  }

  activeFilter = async (param) => {
    this.saveStatus(param)
      .then(() => {
        this.setState({ status: param });
        this.loadIssues();
      })
      .catch(() => { console.tron.log('erro'); });
    // console.tron.log(this.state.status);
  };

  renderIssues = () => (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this.loadIssues}
        />
      }
      data={this.state.issues}
      extraData={this.state}
      keyExtractor={issue => issue.id}
      renderItem={({ item }) => <Issue issue={item} />}
    />
  );

  renderList = () => (
    // console.tron.log(this.state);
    this.state.issues.length
      ? this.renderIssues()
      : <Text style={styles.empty}>Nenhuma issue encontrada</Text>
  );

  render() {
    return (
      <View>
        <View style={styles.tab}>
          <TouchableOpacity onPress={() => this.activeFilter('all')}>
            <Text style={[styles.tabFilter, this.state.status === 'all' && styles.active]}>Todas</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.activeFilter('open')}>
            <Text style={[styles.tabFilter, this.state.status === 'open' && styles.active]}>Abertas</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.activeFilter('closed')}>
            <Text style={[styles.tabFilter, this.state.status === 'closed' && styles.active]}>Fechadas</Text>
          </TouchableOpacity>
        </View>
        <View>
          { this.state.loading
            ? <ActivityIndicator size="small" color="#999" style={styles.loading} />
            : this.renderList() }
        </View>
      </View>
    );
  }
}
