import React, {useState} from 'react';
import {TouchableOpacity, View, StyleSheet, Linking} from 'react-native';
import {Card} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
import {inject, observer} from 'mobx-react';
import RatingsModal from './RatingsModal';
import SourceImageTitle from './SourceImageTitle';
import StatisticDisplay from './StatisticDisplay';

function YoutubeCard(props) {
  const {item, uiStore} = props;
  const {colors} = useTheme();

  return (
    <View>
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        // Linking.openURL(
        //   `https://www.youtube.com/watch?v=${item.id}`,
        // ).catch((err) => console.error("Couldn't load page", err))
        uiStore.setModalVisible(true)
      }>
      <Card
        containerStyle={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.card,
            shadowColor: colors.text,
          },
        ]}>
        <SourceImageTitle
          source={item.source}
          publishedAt={item.publishedAt}
          imageUrl={item.thumbnailUrl}
          title={item.title}
        />
        <View style={styles.statsRow}>
          <StatisticDisplay iconName="eye" statistic={item.viewCount} />
          <StatisticDisplay iconName="thumbs-up" statistic={item.likeCount} />
          <StatisticDisplay
            iconName="thumbs-down"
            statistic={item.dislikeCount}
          />
          <StatisticDisplay iconName="comment" statistic={item.commentCount} />
        </View>
      </Card>
    </TouchableOpacity>
    <RatingsModal />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    paddingTop: 5,
    marginBottom: 10,
  },
  statsRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default inject('uiStore')(observer(YoutubeCard))
