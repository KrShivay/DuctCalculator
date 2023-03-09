import {StyleSheet} from 'react-native';
import {
  colorGray,
  firstColor,
  fourthColor,
  secondColor,
  thirdColor,
} from './constants';

const TextStyles = StyleSheet.create({
  textCenter: {
    textAlign: 'center',
  },
  colorDark: {
    color: firstColor,
  },
  colorMedium: {
    color: secondColor,
  },
  colorBase: {
    color: thirdColor,
  },
  colorLight: {
    color: fourthColor,
  },
  colorGray: {
    color: colorGray,
  },
});

export default TextStyles;
