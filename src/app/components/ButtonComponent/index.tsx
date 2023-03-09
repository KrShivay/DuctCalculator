import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import {colorWhite, secondColor} from '../../../styles/constants';
import SpaceStyles from '../../../styles/spaceStyles';

type ButttonCompProps = {
  handleProceed: () => void;
  handleClear: () => void;
  isData: boolean;
};

export default function ButtonComponent({
  handleProceed,
  handleClear,
  isData,
}: ButttonCompProps) {
  return (
    <View style={[SpaceStyles.py10, SpaceStyles.px40]}>
      {!isData ? (
        <Button
          mode="elevated"
          buttonColor={secondColor}
          textColor={colorWhite}
          onPress={handleProceed}>
          Proceed
        </Button>
      ) : (
        <Button
          mode="elevated"
          buttonColor={secondColor}
          textColor={colorWhite}
          onPress={handleClear}>
          Clear
        </Button>
      )}
    </View>
  );
}
