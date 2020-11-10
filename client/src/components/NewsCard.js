import React, {useState} from 'react';
import {Dimensions, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
import SourceImageTitle from './SourceImageTitle';

export default function NewsCard(props) {
  const {item, flatListRef, index} = props;
  const {colors} = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const expandOrCollapse = () => {
    flatListRef.current.scrollToIndex({
      animated: true,
      index: index,
      viewPosition: 0,
    });
    setIsExpanded(!isExpanded);
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => expandOrCollapse()}>
      <Card
        wrapperStyle={[
          styles.wrapper,
          isExpanded
            ? {
                height: Dimensions.get('window').height - 150,
              }
            : {},
        ]}
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
          imageUrl={item.imageUrl}
          title={item.title}
        />
        <Text style={[styles.text, {color: colors.text}]}>
          {isExpanded ? item.content : item.description}
        </Text>
        <Icon
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          type="font-awesome-5"
          size={30}
        />
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 10,
  },
  text: {
    paddingBottom: 5,
    flex: 1,
  },
});
