import React from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal'
import {inject, observer} from 'mobx-react';
import TagRatingItem from './TagRatingItem';


const tags = [
  'family-friendly',
  'NSFW',
  'humorous',
  'political',
  'entertaining',
  'controversial',
];

function RatingsModal(props) {
  const {uiStore} = props;

  return (
    <Modal
      propagateSwipe
      isVisible={uiStore.modalVisible}
      backdropOpacity={0.85}
      onBackdropPress={() => uiStore.setModalVisible(false)}
      style={styles.modal}
    >
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
      >
        {tags.map(tag => (
          <TagRatingItem tag={tag} key={tag} />
        ))}
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    margin: 0,
    bottom: 0,
  },
});

export default inject('uiStore')(observer(RatingsModal))
