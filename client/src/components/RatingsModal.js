import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import Modal from 'react-native-modal'
import {inject, observer} from 'mobx-react';
import CategoryRatingItem from './CategoryRatingItem';


const categories = [
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
      backdropOpacity={0.8}
      onBackdropPress={() => uiStore.setModalVisible(false)}
      style={styles.modal}
    >
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
      >
        {categories.map(category => (
          <CategoryRatingItem category={category} key={category} />
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
