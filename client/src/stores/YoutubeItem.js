import {extendObservable} from 'mobx';

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
      commentCount
    } = item;

    extendObservable(this, {
      id: _id,
      source,
      title,
      thumbnailUrl,
      publishedAt,
      duration,
      viewCount,
      likeCount,
      dislikeCount,
      commentCount
    });
  }
}
