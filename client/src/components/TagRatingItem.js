import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Card} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
import {inject, observer} from 'mobx-react';

function TagRatingItem(props) {
  const {tag, flatListRef, index, selectedItemStore, uiStore} = props;
  const {colors} = useTheme();

  const sendVotesAndSwipe = (votes) => {
    votes && selectedItemStore.sendVotes(tag, votes);
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
        <TouchableOpacity
          onPress={() => sendVotesAndSwipe()}
          style={[styles.rating, styles.low]}>
          <Text style={[styles.ratingText, {color: colors.text}]}>
            not at all
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => sendVotesAndSwipe(1)}
          style={[styles.rating, styles.medium]}>
          <Text style={[styles.ratingText, {color: colors.text}]}>
            somewhat
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => sendVotesAndSwipe(2)}
          style={[styles.rating, styles.high]}>
          <Text style={[styles.ratingText, {color: colors.text}]}>
            extremely
          </Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
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
  rating: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  low: {
    backgroundColor: '#F80000',
  },
  medium: {
    backgroundColor: '#D00000',
  },
  high: {
    backgroundColor: '#A80000',
  },
  ratingText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default inject('selectedItemStore', 'uiStore')(observer(TagRatingItem));
