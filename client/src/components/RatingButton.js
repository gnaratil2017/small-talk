import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {inject, observer} from 'mobx-react';

function RatingButton(props) {
  const {
    tag,
    flatListRef,
    index,
    weight,
    text,
    backgroundColor,
    selectedItemStore,
    uiStore,
  } = props;
  const {colors} = useTheme();

  const sendVoteAndSwipe = () => {
    selectedItemStore.sendVoteIfHasNotVoted(tag, weight);
    if (index < 5) {
      flatListRef.current.scrollToIndex({
        animated: true,
        index: index + 1,
        viewPosition: 0,
      });
    } else {
      uiStore.setModalVisible(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => sendVoteAndSwipe()}
      disabled={!selectedItemStore.hasNotVoted[tag]}
      style={[
        styles.rating,
        !selectedItemStore.hasNotVoted[tag] ? styles.disabled : undefined,
        {backgroundColor: backgroundColor},
      ]}>
      <Text style={[styles.ratingText, {color: colors.text}]}>{text}</Text>
    </TouchableOpacity>
  );
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
});

export default inject('selectedItemStore', 'uiStore')(observer(RatingButton));
