import React, {Component} from 'react';
import {FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import {inject, observer} from 'mobx-react';
import {chunk} from 'lodash';
import TwitterRow from '../components/TwitterRow';

@inject('newsStore', 'youtubeStore', 'twitterStore')
@observer
export default class ListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.props.newsStore.fetchRecentNewsItems();
    this.props.youtubeStore.fetchRecentYoutubeItems();
    this.props.twitterStore.fetchRecentTwitterItems();
    this.setState({loading: false});
  }

  onRefresh = () => {
    this.setState({refreshing: true});
    this.props.newsStore.fetchRecentNewsItems();
    this.props.youtubeStore.fetchRecentYoutubeItems();
    this.props.twitterStore.fetchRecentTwitterItems();
    this.setState({refreshing: false});
  };

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  render() {
    const {newsStore, youtubeStore, twitterStore} = this.props;
    const {loading, refreshing} = this.state;

    if (!loading) {
      const data = [
        ...newsStore.newsItems,
        ...youtubeStore.youtubeItems,
        ...chunk(twitterStore.twitterItems, 2),
      ];
      this.shuffle(data);
      return (
        <FlatList
          data={data}
          ref={(ref) => {
            this.flatListRef = ref;
          }}
          renderItem={({item, index}) =>
            item.length ? (
              <TwitterRow item={item} />
            ) : (
              <item.component
                item={item}
                flatListRef={this.flatListRef}
                index={index}
              />
            )
          }
          keyExtractor={(item) => (item.length ? item[0].id : item.id)}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.onRefresh}
            />
          }
        />
      );
    } else {
      return <ActivityIndicator />;
    }
  }
}
