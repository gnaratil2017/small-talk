import React, {useState} from 'react'
import {Dimensions, TouchableOpacity, Text, StyleSheet} from 'react-native'
import {Card, Icon} from 'react-native-elements'
import {useTheme} from '@react-navigation/native'
import {inject, observer} from 'mobx-react'
import SourceImageTitle from './SourceImageTitle'

function NewsCard({item, flatListRef, index}) {
  const {colors} = useTheme()
  const [isExpanded, setIsExpanded] = useState(false)

  const expandOrCollapse = () => {
    flatListRef.current.scrollToIndex({
      animated: true,
      index: index,
      viewPosition: 0,
    })
    setIsExpanded(!isExpanded)
  }

  // const openModal = () => {
  //   selectedItemStore.setSelectedItem(item, 'news')
  //   uiStore.setModalVisible(true)
  // }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => expandOrCollapse()}
      onLongPress={() => openModal()}>
      <Card
        wrapperStyle={
          isExpanded
            ? {
              height: Dimensions.get('window').height - 150,
            }
            : {}
        }
        containerStyle={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.card,
            shadowColor: colors.text,
          },
        ]}>
        <SourceImageTitle
          source={item.source}
          publishedAt={item.publishedAt}
          imageUrl={item.imageUrl}
          title={item.title}
        />
        <Text style={[styles.text, {color: colors.text}]}>
          {item.description}
          {isExpanded ? '\n\n' + item.content : ''}
        </Text>
        <Icon
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          type="font-awesome-5"
          size={30}
        />
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
    paddingBottom: 5,
    marginBottom: 10,
  },
  text: {
    paddingBottom: 5,
    flex: 1,
  },
})

export default inject('uiStore', 'selectedItemStore')(observer(NewsCard))
