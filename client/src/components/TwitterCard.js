import React from 'react'
import {TouchableOpacity, View, StyleSheet, Linking} from 'react-native'
import {Card} from 'react-native-elements'
import {useTheme} from '@react-navigation/native'
import {inject, observer} from 'mobx-react'
import SourceImageTitle from './SourceImageTitle'
import StatisticDisplay from './StatisticDisplay'

function TwitterCard(props) {
  const {item, uiStore, selectedItemStore} = props
  const {colors} = useTheme()

  const openLink = () => {
    const appUrl = `twitter://search?query=${item.url.substring(
      item.url.indexOf('=') + 1,
    )}`
    Linking.canOpenURL(appUrl)
      .then((supported) => Linking.openURL(supported ? appUrl : item.url))
      .catch((err) => console.error('Couldn\'t load page', err))
  }

  const openModal = () => {
    selectedItemStore.setSelectedItem(item, 'twitter')
    uiStore.setModalVisible(true)
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => openLink()}
      onLongPress={() => openModal()}>
      <Card
        containerStyle={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.card,
            shadowColor: colors.text,
          },
        ]}>
        <SourceImageTitle
          source="Twitter"
          imageUrl={item.imageUrl}
          title={item.title}
        />
        {item.tweetVolume ? (
          <View style={styles.statsRow}>
            <StatisticDisplay iconName="twitter" statistic={item.tweetVolume} />
          </View>
        ) : null}
      </Card>
    </TouchableOpacity>
  )
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
  statsRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default inject('uiStore', 'selectedItemStore')(observer(TwitterCard))
