import React, {Component, useState, useEffect, useCallback} from 'react';
import {StyleSheet, Text, View, FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import {useTheme} from '@react-navigation/native';
import { inject, observer } from "mobx-react";

import NewsItem from '../components/NewsItem';

@inject('newsStore')
@observer
export default class ListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false,
    }
  }

  componentDidMount() {
    this.props.newsStore.fetchNewsItems();
    this.setState({ loading: false });
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.newsStore.fetchNewsItems();
    this.setState({ refreshing: false });
  };

  render() {
    const { newsStore } = this.props;
    const { loading, refreshing } = this.state;

    if (!loading) {
      return (
        <FlatList
          data={newsStore.newsItems}
          renderItem={({ item }) => <NewsItem item={item} />}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />
          }
        />
      );
    } else {
      return <ActivityIndicator />
    }
  }
}

const styles = StyleSheet.create({});
