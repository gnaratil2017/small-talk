import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Dimensions} from 'react-native';
import {Card} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';

export default function CategoryRatingItem(props) {
  const {category, flatListRef, index} = props
  const {colors} = useTheme();

  // const goToNext = () => {
  //   flatListRef.current.scrollToIndex({
  //     animated: true,
  //     index: index + 1,
  //     viewPosition: 0,
  //   });
  // };

  return (
    <Card
      containerStyle={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.card,
        },
      ]}>
      <Card.Title
        style={{color: colors.text}}>
        {category}
      </Card.Title>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    margin: 0,
    height: 300,
    width: Dimensions.get('window').width,
  },
  statsRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
