import React, {useEffect, RefObject} from 'react'
import {View, StyleSheet, Dimensions, FlatList} from 'react-native'
import {Card} from 'react-native-elements'
import {useTheme} from '@react-navigation/native'
import {inject, observer} from 'mobx-react'
import RatingButton from './RatingButton'
import SelectedItemStore from '../stores/SelectedItemStore'
import { ContentItem } from '../screens/ListScreen'

interface Props {
  tag: string
  flatListRef: RefObject<FlatList<ContentItem>>
  index: number
  selectedItemStore?: typeof SelectedItemStore
}

const TagRatingItem: React.FC<Props> = (props) => {
  const {tag, flatListRef, index, selectedItemStore} = props
  const {colors} = useTheme()

  useEffect(() => {
    void selectedItemStore!.checkHasNotVoted(tag)
  }, [])

  return (
    <Card
      wrapperStyle={styles.cardWrapper}
      containerStyle={[
        styles.cardContainer,
        {
          backgroundColor: colors.card,
          borderColor: colors.card,
        },
      ]}>
      <Card.Title style={{color: colors.text}}>{tag}</Card.Title>
      <View style={styles.ratingsWrapper}>
        <RatingButton
          tag={tag}
          flatListRef={flatListRef}
          index={index}
          weight={0}
          text={'not at all'}
          backgroundColor={'#F80000'}
        />
        <RatingButton
          tag={tag}
          flatListRef={flatListRef}
          index={index}
          weight={1}
          text={'somewhat'}
          backgroundColor={'#D00000'}
        />
        <RatingButton
          tag={tag}
          flatListRef={flatListRef}
          index={index}
          weight={2}
          text={'extremely'}
          backgroundColor={'#A80000'}
        />
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  cardWrapper: {
    flex: 1,
  },
  cardContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    margin: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    height: 250,
    width: Dimensions.get('window').width,
  },
  ratingsWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export default inject('selectedItemStore')(observer(TagRatingItem))
