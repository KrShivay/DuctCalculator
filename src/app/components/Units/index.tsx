import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Card, Checkbox, Text} from 'react-native-paper';
import ModalView from '../../../components/ModalView';
import MainStyles from '../../../styles/mainStyles';
import SpaceStyles from '../../../styles/spaceStyles';

type UnitsProps = {
  visible: boolean;
  units: string;
  setUnits: (val: string) => void;
  handleClose: () => void;
};

export default function Units({
  visible,
  units,
  setUnits,
  handleClose,
}: UnitsProps) {
  const [checked, setChecked] = React.useState<string>(units);

  const handleSetCalMethod = () => {
    setUnits(checked);
    handleClose();
  };

  return (
    <ModalView visible={visible} emptyHeight="15%">
      <View style={styles.modal}>
        <Card style={styles.widthFull}>
          <Card.Content>
            <View style={SpaceStyles.py5}>
              <Text variant="titleLarge">Units</Text>
            </View>
            <View style={[MainStyles.flexRow, SpaceStyles.m1]}>
              <Checkbox.Android
                status={checked === 'siUnits' ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked('siUnits');
                }}
              />
              <Text variant="bodyLarge" style={styles.mt6}>
                SI Units
              </Text>
            </View>

            <View style={[MainStyles.flexRow, SpaceStyles.m1]}>
              <Checkbox.Android
                status={checked === 'britishUnits' ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked('britishUnits');
                }}
              />
              <Text variant="bodyLarge" style={styles.mt6}>
                British Units
              </Text>
            </View>

            <View style={[SpaceStyles.py10, SpaceStyles.px20]}>
              <Button mode="contained" onPress={() => handleSetCalMethod()}>
                Submit
              </Button>
            </View>
          </Card.Content>
        </Card>
      </View>
    </ModalView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  widthFull: {
    width: '100%',
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  text: {
    color: '#000',
    fontSize: 20,
    textAlign: 'center',
  },
  touchableButton: {
    position: 'absolute',
    backgroundColor: '#fff',
    color: '#000',
    zIndex: 99999999,
    top: 10,
    right: 10,
  },
  mt6: {
    marginTop: 6,
  },
  imageStyles: {width: '100%', height: '100%', resizeMode: 'contain'},
  touchableImageStyle: {width: '100%', height: '100%'},
});
