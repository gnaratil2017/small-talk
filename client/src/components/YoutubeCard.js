import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Linking} from 'react-native';
import {Card} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
import moment from 'moment';
import StatisticDisplay from './StatisticDisplay';

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

export default function YoutubeCard(props) {
  const {item} = props;
  const {colors} = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        Linking.openURL(
          `https://www.youtube.com/watch?v=${item.id}`,
        ).catch((err) => console.error("Couldn't load page", err))
      }>
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
        {item.thumbnailUrl && (
          <Card.Image style={styles.image} source={{uri: item.thumbnailUrl}} />
        )}
        <Card.Title style={[styles.title, {color: colors.text}]}>
          {item.title}
        </Card.Title>
        <View style={styles.statsRow}>
          <StatisticDisplay iconName="eye" statistic={item.viewCount} />
          <StatisticDisplay iconName="thumbs-up" statistic={item.likeCount} />
          <StatisticDisplay
            iconName="thumbs-down"
            statistic={item.dislikeCount}
          />
          <StatisticDisplay iconName="comment" statistic={item.commentCount} />
        </View>
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
    marginBottom: 10,
  },
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
  statsRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
