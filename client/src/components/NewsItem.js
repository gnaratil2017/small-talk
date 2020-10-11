import React from 'react';
import {View, Text} from 'react-native';

export default function NewsItem(props) {
  const {item} = props;
  return (
    <View>
      <Text>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text>{item.source}</Text>
    </View>
  );
}
