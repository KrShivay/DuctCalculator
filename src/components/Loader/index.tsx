import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';

const Loader = () => {
  return (
    <Modal
      transparent={true}
      animationType={'slide'}
      visible={true}
      onRequestClose={() => null}>
      <View style={[styles.flex1, styles.viewStyle]}>
        <ActivityIndicator
          size="large"
          color="#59178a"
          style={[styles.flex1, styles.paddingTwenty]}
        />
        <Text>Loading...</Text>
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  paddingTwenty: {
    padding: 20,
  },
  viewStyle: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});
