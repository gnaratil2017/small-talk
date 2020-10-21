import {extendObservable} from 'mobx';

export default class NewsItem {
  constructor(item) {
    const {
      _id,
      source,
      title,
      description,
      url,
      imageUrl,
      publishedAt,
      content,
      tags,
    } = item;

    extendObservable(this, {
      id: _id,
      source,
      title,
      description,
      url,
      imageUrl,
      publishedAt,
      content,
      tags,
    });
  }
}
