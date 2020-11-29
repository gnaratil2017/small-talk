import React, {Component} from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {inject, observer} from 'mobx-react';
import {chunk} from 'lodash';
import TwitterRow from '../components/TwitterRow';
import RatingsModal from '../components/RatingsModal';
import {getUniqueId} from 'react-native-device-info';

@inject('newsStore', 'youtubeStore', 'twitterStore', 'userStore')
@observer
export default class ListScreen extends Component {
  constructor(props) {
    super(props);
    this.flatListRef = React.createRef();
    this.state = {
      refreshing: false,
    };
  }

  componentDidMount() {
    const {name} = this.props.route;
    this.props.userStore.fetchOrCreateUser(getUniqueId());
    this.props.newsStore.fetchFilteredNewsItems(name);
    this.props.youtubeStore.fetchFilteredYoutubeItems(name);
    this.props.twitterStore.fetchFilteredTwitterItems(name);
  }

  onRefresh = () => {
    const {name} = this.props.route;
    this.setState({refreshing: true});
    this.props.newsStore.fetchFilteredNewsItems(name);
    this.props.youtubeStore.fetchFilteredYoutubeItems(name);
    this.props.twitterStore.fetchFilteredTwitterItems(name);
    this.setState({refreshing: false});
  };

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  render() {
    const {newsStore, youtubeStore, twitterStore, route} = this.props;
    const {name} = route;
    const {refreshing} = this.state;
    if (!newsStore.loading && !youtubeStore.loading && !twitterStore.loading) {
      let data = [];
      const news = newsStore.newsItems.get(name);
      const youtube = youtubeStore.youtubeItems.get(name);
      const twitter = twitterStore.twitterItems.get(name);
      if (news) {
        data = data.concat(news);
      }
      if (youtube) {
        data = data.concat(youtube);
      }
      if (twitter) {
        data = data.concat(chunk(twitter, 2));
      }
      this.shuffle(data);
      return (
        <View>
          <FlatList
            data={data}
            ref={this.flatListRef}
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
          <RatingsModal />
        </View>
      );
    } else {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="small" />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  loader: {
    paddingTop: 70,
  },
});
