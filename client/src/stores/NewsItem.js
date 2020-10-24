import {extendObservable} from 'mobx';
import NewsCard from '../components/NewsCard';

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
      component: NewsCard,
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
