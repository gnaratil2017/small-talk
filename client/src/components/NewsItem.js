import React, {useState} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
import moment from 'moment';

moment.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'seconds',
    ss: '%ss',
    m: 'a minute',
    mm: '%dm',
    h: 'an hour',
    hh: '%dh',
    d: 'a day',
    dd: '%dd',
    M: 'a month',
    MM: '%dM',
    y: 'a year',
    yy: '%dY',
  },
});

export default function NewsItem(props) {
  const {item} = props;
  const {colors} = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => setIsExpanded(!isExpanded)}>
      <Card
        containerStyle={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.card,
            shadowColor: colors.text,
          },
        ]}>
        <Text style={styles.source}>
          {item.source}, {moment(item.publishedAt).fromNow()}
        </Text>
        <Card.Image style={styles.image} source={{uri: item.imageUrl}} />
        <Card.Title style={[styles.title, {color: colors.text}]}>
          {item.title}
        </Card.Title>
        <Text style={[styles.description, {color: colors.text}]}>
          {isExpanded ? item.content : item.description}
        </Text>
        <Icon
          name={isExpanded ? 'expand-less' : 'expand-more'}
          type="material"
          size={50}
        />
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    paddingTop: 5,
    paddingBottom: 0,
    marginBottom: 10,
  },
  source: {
    color: '#a9a9a9',
    paddingBottom: 5,
    fontStyle: 'italic',
    textAlign: 'right',
  },
  image: {
    borderRadius: 5,
    padding: 0,
  },
  title: {
    paddingTop: 10,
  },
  description: {},
});
