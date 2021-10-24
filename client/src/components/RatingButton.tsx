import React, {RefObject} from 'react'
import {TouchableOpacity, Text, StyleSheet, FlatList} from 'react-native'
import {useTheme} from '@react-navigation/native'
import {inject, observer} from 'mobx-react'
import { ContentItem } from '../screens/ListScreen'
import SelectedItemStore from '../stores/SelectedItemStore'
import UIStore from '../stores/UIStore'

interface Props {
  tag: string
  flatListRef: RefObject<FlatList<ContentItem>>
  index: number
  weight: number
  text: string
  backgroundColor: string
  selectedItemStore?: typeof SelectedItemStore
  uiStore?: typeof UIStore
}

function RatingButton(props: Props) {
  const {
    tag,
    flatListRef,
    index,
    weight,
    text,
    backgroundColor,
    selectedItemStore,
    uiStore,
  } = props
  const {colors} = useTheme()

  const sendVoteAndSwipe = () => {
    selectedItemStore!.sendVoteIfHasNotVoted(tag, weight)
    if (index < 5) {
      flatListRef.current!.scrollToIndex({
        animated: true,
        index: index + 1,
        viewPosition: 0,
      })
    } else {
      uiStore!.setModalVisible(false)
    }
  }

  return (
    <TouchableOpacity
      onPress={() => sendVoteAndSwipe()}
      disabled={!selectedItemStore!.hasNotVoted[tag]}
      style={[
        styles.rating,
        !selectedItemStore!.hasNotVoted[tag] ? styles.disabled : undefined,
        {backgroundColor: backgroundColor},
      ]}>
      <Text style={[styles.ratingText, {color: colors.text}]}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  rating: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.2,
  },
  ratingText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default inject('selectedItemStore', 'uiStore')(observer(RatingButton))
