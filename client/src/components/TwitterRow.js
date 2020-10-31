import React from 'react';
import {View, StyleSheet} from 'react-native';
import TwitterCard from './TwitterCard';

export default function TwitterRow(props) {
  const {item} = props;

  return (
    <View style={styles.rowContainer}>
      <TwitterCard item={item[0]} />
      <TwitterCard item={item[1]} />
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});
