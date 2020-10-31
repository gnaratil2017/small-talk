import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Linking} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
import {compact} from 'lodash';

export default function TwitterCard(props) {
  const {item} = props;
  const {colors} = useTheme();

  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      activeOpacity={0.8}
      onPress={() =>
        Linking.openURL(
          item.url,
        ).catch((err) => console.error("Couldn't load page", err))
      }>
      <Card
        wrapperStyle={styles.cardWrapper}
        containerStyle={[
          styles.cardContainer,
          {
            backgroundColor: '#243447',
            borderColor: colors.card,
            shadowColor: colors.text,
          },
        ]}>
        <Card.Title style={[styles.name, {color: colors.text}]}>
          {item.name}
        </Card.Title>
        <View style={styles.seeTweets}>
          <Text style={styles.seeTweetsText}>
            {compact(['See', item.tweetVolume && item.tweetVolume.toLocaleString(), 'tweets']).join(' ')}
          </Text>
          <Icon name='chevron-right' type="font-awesome-5" color="#808080" size={12} />
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
  },
  cardWrapper: {
    height: 50,
  },
  cardContainer: {
    borderRadius: 10,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    marginBottom: 10,
  },
  name: {
    flex: 1,
  },
  seeTweets: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  seeTweetsText: {
    color: '#808080',
    paddingRight: 3,
    paddingBottom: 1,
  }
});
