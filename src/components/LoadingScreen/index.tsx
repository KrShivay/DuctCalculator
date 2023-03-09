import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {firstColor} from '../../styles/constants';

const {height, width} = Dimensions.get('window');

export default function LoadingScreen() {
  return (
    <View style={[styles.fullContainer]}>
      <View style={[styles.flexColContainer]}>
        <View style={styles.emptyView}>
          <Text style={styles.heading}>Ductulator</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    top: 0,
    bottom: 0,
    marginTop: 0,
    padding: 0,
    flex: 1,
  },
  flexColContainer: {
    height: height,
    width: width,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  emptyView: {
    height: 50,
    width: width,
  },
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  image: {
    width: 100,
    height: 100,
  },
  subHeading: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '600',
  },
  heading: {
    color: firstColor,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '500',
  },
});
