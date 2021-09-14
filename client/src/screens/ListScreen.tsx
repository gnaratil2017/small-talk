import React, {createRef} from 'react'
import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs'
import {
  View,
  FlatList,
  Dimensions,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
} from 'react-native'
import RatingsModal from '../components/RatingsModal'
// import {getUniqueId} from 'react-native-device-info'
import useFetchNewsItems from '../domains/News/useFetchNewsItems'
import useFetchYoutubeItems from '../domains/Youtube/useFetchYoutubeItems'
import { useRoute } from '@react-navigation/native'
import NewsItem from '../domains/News/NewsItem'
import YoutubeItem from '../domains/Youtube/YoutubeItem'

interface Props {
  route: MaterialTopTabBarProps
}

const ListScreen: React.FC<Props> = () => {
  const flatListRef = createRef<FlatList>()
  // const [flatListRef, setFlatListRef] = useState(null)
  const route = useRoute()
  const { newsItems, isValidating: isNewsValidating, revalidate: revalidateNews } = useFetchNewsItems(route.name)
  const { youtubeItems, isValidating: isYoutubeValidating, revalidate: revalidateYoutube } = useFetchYoutubeItems(route.name)
  // const { twitterItems, isValidating: isTwitterValidating } = useFetchTwitterItems(route.name)

  const onRefresh = () => {
    revalidateNews().catch(() => {})
    revalidateYoutube().catch(() => {})
    // this.props.youtubeStore.fetchFilteredYoutubeItems(route.name);
    // this.props.twitterStore.fetchFilteredTwitterItems(route.name);
  }

  const shuffledData = () => {
    const data: (NewsItem | YoutubeItem)[] = (newsItems as (NewsItem | YoutubeItem)[]).concat(youtubeItems)
    for (let i = data.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [data[i], data[j]] = [data[j], data[i]]
    }

    return data
  }

  if (isNewsValidating || isYoutubeValidating) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="small" />
      </View>
    )
  }

  return (
    <View>
      <FlatList
        data={shuffledData()}
        ref={flatListRef}
        contentContainerStyle={styles.contentContainer}
        renderItem={({item, index} : {item: NewsItem | YoutubeItem, index: number}) => (
          <item.component
            item={item}
            flatListRef={flatListRef}
            index={index}
          />
        )}
        keyExtractor={(item: NewsItem | YoutubeItem) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={isNewsValidating || isYoutubeValidating}
            onRefresh={onRefresh}
          />
        }
      />
      <RatingsModal />
    </View>
  )
}

// @inject('newsStore', 'youtubeStore', 'twitterStore', 'userStore')
// @observer
// export default class ListScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.flatListRef = React.createRef();
//     this.state = {
//       refreshing: false,
//     };
//   }

//   componentDidMount() {
//     const {name} = this.props.route;
//     this.props.userStore.fetchOrCreateUser(getUniqueId());
//     this.props.newsStore.fetchFilteredNewsItems(name);
//     this.props.youtubeStore.fetchFilteredYoutubeItems(name);
//     this.props.twitterStore.fetchFilteredTwitterItems(name);
//   }

//   onRefresh = () => {
//     const {name} = this.props.route;
//     this.setState({refreshing: true});
//     this.props.newsStore.fetchFilteredNewsItems(name);
//     this.props.youtubeStore.fetchFilteredYoutubeItems(name);
//     this.props.twitterStore.fetchFilteredTwitterItems(name);
//     this.setState({refreshing: false});
//   };

//   shuffle(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//     }
//   }

//   render() {
//     const {newsStore, youtubeStore, twitterStore, route} = this.props;
//     const {name} = route;
//     const {refreshing} = this.state;
//     if (!newsStore.loading && !youtubeStore.loading && !twitterStore.loading) {
//       let data = [];
//       const news = newsStore.newsItems.get(name);
//       const youtube = youtubeStore.youtubeItems.get(name);
//       const twitter = twitterStore.twitterItems.get(name);
//       if (news) {
//         data = data.concat(news);
//       }
//       if (youtube) {
//         data = data.concat(youtube);
//       }
//       if (twitter) {
//         data = data.concat(twitter);
//       }
//       this.shuffle(data);
//       return (
//         <View>
//           <FlatList
//             data={data}
//             ref={this.flatListRef}
//             contentContainerStyle={styles.contentContainer}
//             renderItem={({item, index}) => (
//               <item.component
//                 item={item}
//                 flatListRef={this.flatListRef}
//                 index={index}
//               />
//             )}
//             keyExtractor={(item) => item.id}
//             refreshControl={
//               <RefreshControl
//                 refreshing={refreshing}
//                 onRefresh={this.onRefresh}
//               />
//             }
//           />
//           <RatingsModal />
//         </View>
//       );
//     } else {
//       return (
//         <View style={styles.loader}>
//           <ActivityIndicator size="small" />
//         </View>
//       );
//     }
//   }
// }

const styles = StyleSheet.create({
  contentContainer: {
    minHeight: Dimensions.get('window').height - 100,
  },
  loader: {
    paddingTop: 70,
  },
})

export default ListScreen
