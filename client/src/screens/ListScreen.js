import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';

export default function ListScreen() {
  const {colors} = useTheme();

  return (
    <View>
      <Text style={{color: colors.text}}>test</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
