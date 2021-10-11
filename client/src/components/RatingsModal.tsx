import React from 'react'
import {Platform, FlatList, StyleSheet} from 'react-native'
import Modal from 'react-native-modal'
import {inject, observer} from 'mobx-react'
import TagRatingItem from './TagRatingItem'
import ShareButton from './ShareButton'
import { createRef } from 'react'
import UIStore from '../stores/UIStore'

const tags = [
  'family-friendly',
  'NSFW',
  'humorous',
  'political',
  'entertaining',
  'controversial',
]

interface Props {
  uiStore?: typeof UIStore
}

function RatingsModal(props: Props) {
  const {uiStore} = props
  const flatListRef = createRef<FlatList>()

  return (
    <Modal
      propagateSwipe
      isVisible={uiStore!.modalVisible}
      backdropOpacity={Platform.OS === 'android' ? 0.2 : 0.85}
      onBackdropPress={() => uiStore!.setModalVisible(false)}
      style={styles.modal}>
      <ShareButton />
      <FlatList
        data={tags}
        ref={flatListRef}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}: {item: string, index: number}) => (
          <TagRatingItem
            tag={item}
            flatListRef={flatListRef}
            index={index}
          />
        )}
        keyExtractor={(item: string) => item}
      />
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    margin: 0,
    bottom: 0,
  },
})


export default inject('uiStore')(observer(RatingsModal))
