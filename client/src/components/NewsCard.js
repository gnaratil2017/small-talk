import React, {useState} from 'react';
import {Dimensions, TouchableOpacity, Text, StyleSheet} from 'react-native';
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

export default function NewsCard(props) {
  const {item, flatListRef, index} = props;
  const {colors} = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const expandOrCollapse = () => {
    flatListRef.scrollToIndex({animated: true, index: index, viewPosition: 0});
    setIsExpanded(!isExpanded);
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => expandOrCollapse()}>
      <Card
        wrapperStyle={[
          styles.wrapper,
          isExpanded
            ? {
                height: Dimensions.get('window').height - 150,
              }
            : {},
        ]}
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
        {item.imageUrl && (
          <Card.Image style={styles.image} source={{uri: item.imageUrl}} />
        )}
        <Card.Title style={[styles.title, {color: colors.text}]}>
          {item.title}
        </Card.Title>
        <Text style={[styles.text, {color: colors.text}]}>
          {isExpanded ? item.content : item.description}
        </Text>
        <Icon
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          type="font-awesome-5"
          size={30}
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
    paddingBottom: 5,
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
  text: {
    paddingBottom: 5,
    flex: 1,
  },
});
