import {extendObservable} from 'mobx';
import YoutubeCard from '../components/YoutubeCard';

export default class YoutubeItem {
  constructor(item) {
    const {
      _id,
      source,
      title,
      thumbnailUrl,
      publishedAt,
      duration,
      viewCount,
      likeCount,
      dislikeCount,
      commentCount,
    } = item;

    extendObservable(this, {
      component: YoutubeCard,
      id: _id,
      source,
      title,
      thumbnailUrl,
      publishedAt,
      duration,
      viewCount,
      likeCount,
      dislikeCount,
      commentCount,
    });
  }
}
