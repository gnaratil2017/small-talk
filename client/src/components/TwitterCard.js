import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Linking} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
import {inject, observer} from 'mobx-react';
import {compact} from 'lodash';

function TwitterCard(props) {
  const {item, leftSide, uiStore, selectedItemStore} = props;
  const {colors} = useTheme();

  const openLink = () => {
    const appUrl = `twitter://search?query=${item.url.substring(
      item.url.indexOf('=') + 1,
    )}`;
    Linking.canOpenURL(appUrl)
      .then((supported) => Linking.openURL(supported ? appUrl : item.url))
      .catch((err) => console.error("Couldn't load page", err));
  };

  const openModal = () => {
    selectedItemStore.setSelectedItem(item, 'twitter');
    uiStore.setModalVisible(true);
  };

  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      activeOpacity={0.8}
      onPress={() => openLink()}
      onLongPress={() => openModal()}>
      <Card
        wrapperStyle={styles.cardWrapper}
        containerStyle={[
          styles.cardContainer,
          leftSide ? styles.leftCard : styles.rightCard,
          {shadowColor: colors.text},
        ]}>
        <Card.Title
          adjustsFontSizeToFit
          numberOfLines={1}
          style={{color: colors.text}}>
          {item.title}
        </Card.Title>
        <View style={styles.seeTweets}>
          <Text style={styles.seeTweetsText}>
            {compact([
              'See',
              item.tweetVolume && item.tweetVolume.toLocaleString(),
              'tweets',
            ]).join(' ')}
          </Text>
          <Icon name="fire" type="font-awesome-5" color="#808080" size={12} />
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
    backgroundColor: '#243447',
    borderColor: '#243447',
    borderRadius: 10,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    marginBottom: 10,
    paddingLeft: 8,
    paddingRight: 8,
  },
  leftCard: {
    marginRight: 10,
  },
  rightCard: {
    marginLeft: 10,
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
  },
});

export default inject('uiStore', 'selectedItemStore')(observer(TwitterCard));
