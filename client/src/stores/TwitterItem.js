import {extendObservable} from 'mobx';

export default class TwitterItem {
  constructor(item) {
    const {
      _id,
      name,
      url,
      tweetVolume
    } = item;

    extendObservable(this, {
      id: _id,
      name,
      url,
      tweetVolume
    });
  }
}