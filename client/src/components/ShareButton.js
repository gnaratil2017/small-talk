import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {inject, observer} from 'mobx-react';

function ShareButton(props) {
  const {uiStore} = props;
  const {colors} = useTheme();

  const onPress = () => {
    uiStore.setModalVisible(false);
  };

  return (
    <TouchableOpacity
      style={styles.shareButton}
      activeOpacity={0.8}
      onPress={() => onPress()}>
      <Text style={[styles.text, {color: colors.text}]}>Share to...</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  shareButton: {
    backgroundColor: 'green',
    width: Dimensions.get('window').width,
    paddingTop: 50,
    paddingBottom: 50,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default inject('uiStore')(observer(ShareButton));
