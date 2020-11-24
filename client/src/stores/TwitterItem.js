import {extendObservable} from 'mobx';

export default class TwitterItem {
  constructor(item) {
    const {_id, title, url, tweetVolume} = item;

    extendObservable(this, {
      id: _id,
      title,
      url,
      tweetVolume,
    });
  }
}
