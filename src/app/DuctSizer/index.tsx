import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Alert, View} from 'react-native';
import {IconButton, Text, TextInput} from 'react-native-paper';
import {ClearStorage} from '../../asyncStorage';
import FormSelect from '../../components/FormComponents/FormSelect';

import TextInputAvoidingView from '../../components/KeyBoardAvoidingView';
import ModalView from '../../components/ModalView';
import {UNIT_ARR} from '../../data/ductSizerData';
import ScreenWrapper from '../../layout/ScreenWrapper';
import {colorWhite} from '../../styles/constants';
import MainStyles from '../../styles/mainStyles';
import SpaceStyles from '../../styles/spaceStyles';
import TextStyles from '../../styles/textStyles';
import ButtonComponent from '../components/ButtonComponent';
import ResultsSizer from './results';
import {calculateCosting, ductTypeArr} from './sizerFns';

export default function DuctSizer() {
  const navigation = useNavigation();
  const [floorArea, setFloorArea] = useState<string>('');
  const [ductType, setDuctType] = useState<string>('Rectangle');
  const [visible, setVisible] = useState<boolean>(false);
  const [unit, setUnit] = useState<string>('SQ.FT');
  const [sizerData, setSizerData] = useState<{
    airFlow: string;
    acLoad: string;
    hvacCosting: {
      ductQnty: string;
    };
    giCosting: {
      rawMaterial: string;
      insulation: string;
      adp: string;
      lps: string;
      totalCost: string;
    };
  }>();

  const handleCalculateCosting = () => {
    if (!floorArea) {
      Alert.alert(
        'Error',
        'Please enter a valid floor area',
        [
          {
            text: 'Ok',
            onPress: () => setFloorArea(''),
          },
        ],
        {
          cancelable: false,
        },
      );
    } else {
      const data = calculateCosting(floorArea, ductType, unit);
      setVisible(true);
      setSizerData(data);
    }
  };

  const handleClear = () => {
    setSizerData(undefined);
    setFloorArea('');
    setVisible(false);
  };

  return (
    <TextInputAvoidingView>
      <ScreenWrapper
        keyboardShouldPersistTaps={'always'}
        removeClippedSubviews={false}>
        <View>
          <View
            style={[
              MainStyles.flexRow,
              {justifyContent: 'space-between'},
              MainStyles.backgroundDark,
              SpaceStyles.py1,
            ]}>
            <Text
              style={[TextStyles.colorGray, SpaceStyles.p5]}
              variant="titleMedium">
              Duct Sizer
            </Text>
            <View>
              <IconButton
                icon="logout"
                iconColor={colorWhite}
                size={20}
                onPress={async () => await ClearStorage(navigation.navigate)}
              />
            </View>
          </View>
          <View style={SpaceStyles.p5}>
            <View style={[SpaceStyles.mx1, SpaceStyles.mt4]}>
              <TextInput
                keyboardType="numeric"
                label="Floor Area"
                value={floorArea}
                dense
                onChangeText={val => setFloorArea(val)}
                right={<TextInput.Affix text={unit} />}
              />
            </View>
            <View style={SpaceStyles.m1}>
              <FormSelect
                onSelect={(val: string) => setDuctType(val)}
                value={ductType}
                data={ductTypeArr}
                elementWidth="100%"
                defaultButtonText={'Duct Shape'}
              />
            </View>
            <View style={SpaceStyles.m1}>
              <FormSelect
                onSelect={(val: string) => setUnit(val)}
                value={unit}
                data={UNIT_ARR}
                elementWidth="100%"
                defaultButtonText={'Unit'}
              />
            </View>
            <ButtonComponent
              handleProceed={handleCalculateCosting}
              handleClear={() => {
                setSizerData(undefined);
              }}
              isData={!!sizerData}
            />
            <ModalView visible={visible} emptyHeight="15%">
              <ResultsSizer
                sizerData={sizerData}
                handleClear={handleClear}
                ductType={ductType}
                unit={unit}
              />
            </ModalView>
          </View>
        </View>
      </ScreenWrapper>
    </TextInputAvoidingView>
  );
}
