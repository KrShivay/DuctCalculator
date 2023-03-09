import {StyleSheet} from 'react-native';
import {firstColor, fourthColor, secondColor, thirdColor} from './constants';

const MainStyles = StyleSheet.create({
  flex: {
    display: 'flex',
  },
  flexGrow1: {
    flexGrow: 1,
  },
  flexGrow2: {
    flexGrow: 2,
  },
  flexStretch: {
    display: 'flex',
    alignItems: 'stretch',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  br0: {
    borderRadius: 0,
  },
  br1: {
    borderRadius: 15,
  },
  brb2: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  backgroundDark: {
    backgroundColor: firstColor,
  },
  backgroundMedium: {
    backgroundColor: secondColor,
  },
  backgroundBase: {
    backgroundColor: thirdColor,
  },
  backgroundSmall: {
    backgroundColor: fourthColor,
  },
  fullHeight: {
    minHeight: '100%',
  },
  halfInput: {
    width: '49%',
  },
});

export default MainStyles;
