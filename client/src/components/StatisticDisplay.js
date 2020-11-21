import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

export default function StatisticDisplay(props) {
  const {iconName, statistic} = props;

  return (
    <View style={styles.row}>
      <Icon name={iconName} type="font-awesome-5" color="#808080" size={20} />
      <Text style={[styles.text, !statistic ? styles.disabled : undefined]}>
        {statistic ? statistic.toLocaleString() : 'disabled'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#808080',
    paddingLeft: 2,
  },
  disabled: {
    fontStyle: 'italic',
  },
});
