import {action, observable} from 'mobx';

export default class NewsItem {
  @observable id = '';
  @observable source = '';
  @observable title = '';
  @observable description = '';
  @observable url = '';
  @observable imageUrl = '';
  @observable publishedAt = '';
  @observable content = '';
  @observable tags = [];
  @observable isExpanded = false;

  constructor(item) {
    const {_id, source, title, description, url, imageUrl, publishedAt, content, tags} = item;
    this.id = _id;
    this.source = source;
    this.title = title;
    this.description = description;
    this.url = url;
    this.imageUrl = imageUrl;
    this.publishedAt = publishedAt;
    this.content = content;
    this.tags = tags;
  }

  @action toggleIsExpanded = () => {
    this.isExpanded = !this.isExpanded;
    console.log(this.isExpanded);
  };
}
