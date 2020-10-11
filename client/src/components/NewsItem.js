import React from 'react';
import {View, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';

export default function NewsItem(props) {
  const {item} = props;
  const {colors} = useTheme();

  return (
    <View>
      <Text style={{color: colors.text}}>{item.title}</Text>
      <Text style={{color: colors.text}}>{item.description}</Text>
      <Text style={{color: colors.text}}>{item.source}</Text>
    </View>
  );
}
