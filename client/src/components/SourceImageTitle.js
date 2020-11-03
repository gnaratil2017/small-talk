import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card} from 'react-native-elements';
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

export default function SourceImageTitle(props) {
  const {source, publishedAt, imageUrl, title} = props;
  const {colors} = useTheme();

  return (
    <View>
      <Text style={styles.source}>
        {source}, {moment(publishedAt).fromNow()}
      </Text>
      {imageUrl ? (
        <Card.Image style={styles.image} source={{uri: imageUrl}} />
      ): null}
      <Card.Title style={[styles.title, {color: colors.text}]}>
        {title}
      </Card.Title>
    </View>
  );
}

const styles = StyleSheet.create({
  source: {
    color: '#808080',
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
});
