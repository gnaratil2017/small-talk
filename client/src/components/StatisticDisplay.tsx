import React from 'react'
import {View, Text, Platform, StyleSheet} from 'react-native'
import {Icon} from 'react-native-elements'

interface Props {
  iconName: string
  statistic: string
}

const StatisticDisplay: React.FC<Props> = (props) => {
  const {iconName, statistic} = props

  return (
    <View style={styles.row}>
      <Icon name={iconName} type="font-awesome-5" color="#808080" size={20} />
      <Text style={[styles.text, !statistic ? styles.disabled : undefined]}>
        {!statistic
          ? 'disabled'
          : Platform.OS === 'android'
            ? statistic.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : statistic.toLocaleString()}
      </Text>
    </View>
  )
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
})

export default StatisticDisplay
