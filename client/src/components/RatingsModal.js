import React, {Component} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
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

@inject('uiStore')
@observer
export default class RatingsModal extends Component {
  constructor(props) {
    super(props);
    this.flatListRef = React.createRef();
  }

  render() {
    const {uiStore} = this.props;

    return (
      <Modal
        propagateSwipe
        isVisible={uiStore.modalVisible}
        backdropOpacity={0.85}
        onBackdropPress={() => uiStore.setModalVisible(false)}
        style={styles.modal}>
        <FlatList
          data={tags}
          ref={this.flatListRef}
          horizontal={true}
          renderItem={({item, index}) => (
            <TagRatingItem
              tag={item}
              flatListRef={this.flatListRef}
              index={index}
            />
          )}
          keyExtractor={(item) => item}
        />
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    margin: 0,
    bottom: 0,
  },
});
