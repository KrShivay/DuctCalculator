import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Card, IconButton, Text, TextInput} from 'react-native-paper';
import Pinchable from 'react-native-pinchable';
import {ClearStorage, StoreJsonData, StoreStringData} from '../../asyncStorage';
import FormSelect from '../../components/FormComponents/FormSelect';
import TextInputAvoidingView from '../../components/KeyBoardAvoidingView';
import ModalView from '../../components/ModalView';
import {BRITISH_UNITS, CAL_METHOD, SI_UNITS} from '../../data/ductCheckerData';
import ScreenWrapper from '../../layout/ScreenWrapper';
import {ductSizeScreenInsert} from '../../services';
import {colorWhite, fifthColor, firstColor} from '../../styles/constants';
import MainStyles from '../../styles/mainStyles';
import SpaceStyles from '../../styles/spaceStyles';
import TextStyles from '../../styles/textStyles';
import calculateChecker from '../DuctChecker/checkerFns';
import ResultsChecker from '../DuctChecker/result';
import GiDuctResult from '../DuctSizer/giDuctResult';
import {calculateCosting} from '../DuctSizer/sizerFns';
import CalculationMethod from '../components/CalculationMethods';
import Units from '../components/Units';

const {height} = Dimensions.get('screen');

const unitArr = ['SQ.FT', 'SQ.M'];

export default function DuctSizes() {
  const navigation = useNavigation();

  const [floorArea, setFloorArea] = useState<any>();
  const [ductType, setDuctType] = useState<string>('Rectangle');
  const [visible, setVisible] = useState<boolean>(false);
  const [floorVisible, setFloorVisible] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(false);
  const [airVolume, setAirVolume] = useState<string>('');
  //  value={(parseInt(floorArea) * 3).toString()}
  const [velocity, setVelocity] = useState<string>('');
  const [frictionRate, setFrictionRate] = useState<string>('');
  const [ductHeight, setDuctHeight] = useState<string>('');

  const [calMethod, setCalMethod] = useState<string>('velocity');
  const [units, setUnits] = useState<string>('siUnits');
  const [unit, setUnit] = useState<string>('SQ.FT');

  const [cmVisible, setCmVisible] = useState<boolean>(false);
  const [utVisible, setUtVisible] = useState<boolean>(false);

  const [sizerData, setSizerData] = useState<any>();
  const [checkerData, setCheckerData] = useState<any | undefined>();

  const [userData, setUserData] = useState<any | undefined>();

  const getUnitLabel = () => {
    if (units === 'britishUnits') {
      return BRITISH_UNITS;
    } else {
      return SI_UNITS;
    }
  };

  useEffect(() => {
    getData('units', setUnits);
    getData('calMethod', setCalMethod);
    getData('airVolume', setAirVolume);
    getData('velocity', setVelocity);
    getData('frictionRate', setFrictionRate);
    getData('ductHeight', setDuctHeight);
    getData('floorArea', setFloorArea);
    getData('userDetails', setUserData);
  }, []);

  const getData = async (
    str: string,
    setVal: (val: string) => void,
  ): Promise<any> => {
    try {
      const value: string | null = await AsyncStorage.getItem(str);
      if (value) {
        setVal(value);
        return value;
      }
    } catch (e) {
      // error reading value
    }
  };

  const handleProceed = async () => {
    if (airVolume && ductHeight && (frictionRate || velocity) && floorArea) {
      StoreStringData('airVolume', airVolume);
      StoreStringData('velocity', velocity);
      StoreStringData('frictionRate', frictionRate);
      StoreStringData('ductHeight', ductHeight);
      StoreStringData('floorArea', floorArea);
      StoreStringData('calMethod', calMethod);
      StoreStringData('units', units);
      const dT = await getData('ductType', setDuctType);

      const data = calculateChecker(
        units,
        calMethod,
        airVolume,
        frictionRate,
        velocity,
        ductHeight,
      );
      console.log({
        units,
        calMethod,
        airVolume,
        frictionRate,
        velocity,
        ductHeight,
        floorArea,
        unit,
      });

      if (data) {
        StoreJsonData('data', data);
      }
      console.log({data});
      const floorData = calculateCosting(floorArea, dT, unit);
      if (floorData) {
        StoreJsonData('floorData', floorData);
      }
      console.log({floorData, inside: floorData?.giCosting?.Preinsulated});

      const uData = JSON.parse(userData);
      const payload = {
        ...uData,
        email: userData?.email ?? '_',
        airVolume,
        calMethod,
        ductHeight,
        frictionRate,
        units,
        velocity,
        floorArea,
        unit,
      };
      ductSizeScreenInsert(payload);
      setCheckerData(data);
      setSizerData(floorData);
      setVisible(true);
    } else {
      Alert.alert(
        'Error',
        'Please enter all details',
        [
          {
            text: 'Ok',
            onPress: () => handleClear(),
          },
        ],
        {
          cancelable: false,
        },
      );
    }
  };

  const handleFloorArea = async () => {
    if (floorArea) {
      StoreStringData('floorArea', floorArea);
      const dT = await getData('ductType', setDuctType);

      const floorData = calculateCosting(floorArea, dT, unit);
      if (floorData) {
        StoreJsonData('floorData', floorData);
      }
      console.log({floorData, inside: floorData?.giCosting?.Preinsulated});

      const uData = JSON.parse(userData);
      const payload = {
        ...uData,
        email: userData?.email ?? '_',
        airVolume,
        calMethod,
        ductHeight,
        frictionRate,
        units,
        velocity,
        floorArea,
        unit,
      };
      ductSizeScreenInsert(payload);
      // setCheckerData(data);
      setSizerData(floorData);
      setFloorVisible(true);
    } else {
      Alert.alert(
        'Error',
        'Please enter Floor Area',
        [
          {
            text: 'Ok',
            onPress: () => handleClear(),
          },
        ],
        {
          cancelable: false,
        },
      );
    }
  };

  const handleClear = () => {
    setAirVolume('');
    setFloorArea('');
    setVelocity('');
    setFrictionRate('');
    setDuctHeight('');
    setCheckerData(undefined);
    setSizerData(undefined);
    setVisible(false);
    setFloorVisible(false);
  };

  return (
    <TextInputAvoidingView>
      <ScreenWrapper
        keyboardShouldPersistTaps={'always'}
        removeClippedSubviews={false}>
        <Card style={{borderRadius: 0, minHeight: height}}>
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
                Duct Sizes
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
            <View
              style={[
                MainStyles.flexRow,
                SpaceStyles.px5,
                SpaceStyles.py2,
                {justifyContent: 'space-evenly'},
              ]}>
              <Button
                compact
                mode="contained-tonal"
                buttonColor={fifthColor}
                style={SpaceStyles.px5}
                onPress={() => setCmVisible(true)}>
                Calculation Method
              </Button>
              <Button
                mode="contained-tonal"
                buttonColor={fifthColor}
                style={SpaceStyles.px20}
                onPress={() => setUtVisible(true)}>
                Units
              </Button>
            </View>
            <View style={[SpaceStyles.px5]}>
              <View
                style={[MainStyles.flexRow, {justifyContent: 'space-between'}]}>
                <Text
                  style={{...TextStyles.colorDark, paddingTop: 11}}
                  variant="titleMedium">
                  Input
                </Text>
                <IconButton
                  icon="information"
                  iconColor={firstColor}
                  size={20}
                  onPress={() => setOpen(true)}
                />
              </View>

              <View style={[SpaceStyles.mx1, SpaceStyles.my1]}>
                <TextInput
                  keyboardType="numeric"
                  label="Air Volume"
                  dense
                  mode="outlined"
                  value={airVolume}
                  // value={(parseInt(floorArea) * 3).toString()}
                  onChangeText={val => setAirVolume(val)}
                  right={<TextInput.Affix text={getUnitLabel().volume} />}
                />
              </View>
              {calMethod === CAL_METHOD ? (
                <View style={[SpaceStyles.mx1, SpaceStyles.my1]}>
                  <TextInput
                    keyboardType="numeric"
                    label="Velocity"
                    dense
                    mode="outlined"
                    value={velocity}
                    onChangeText={val => setVelocity(val)}
                    right={<TextInput.Affix text={getUnitLabel().velocity} />}
                  />
                </View>
              ) : (
                <View style={[SpaceStyles.mx1, SpaceStyles.my1]}>
                  <TextInput
                    keyboardType="numeric"
                    label="Friction Rate"
                    dense
                    mode="outlined"
                    value={frictionRate}
                    onChangeText={val => setFrictionRate(val)}
                    right={
                      <TextInput.Affix text={getUnitLabel().frictionRate} />
                    }
                  />
                </View>
              )}
              <View style={[SpaceStyles.mx1, SpaceStyles.my1]}>
                <TextInput
                  keyboardType="numeric"
                  label="Duct Height"
                  dense
                  mode="outlined"
                  value={ductHeight}
                  onChangeText={val => setDuctHeight(val)}
                  right={<TextInput.Affix text={getUnitLabel().length} />}
                />
              </View>
            </View>
            <View style={[SpaceStyles.px40, SpaceStyles.py5]}>
              <Button
                compact
                mode="elevated"
                buttonColor={firstColor}
                textColor={colorWhite}
                onPress={handleProceed}>
                Calculate Sizes
              </Button>
            </View>
          </View>
          {visible ? (
            <View style={SpaceStyles.p2}>
              <Card style={SpaceStyles.py2}>
                <Text
                  style={[TextStyles.colorDark, SpaceStyles.px5]}
                  variant="titleMedium">
                  Output -{' '}
                  {calMethod === 'frictionRate' ? 'Velocity' : 'Friction Rate'}
                </Text>
                <ResultsChecker
                  checkerData={checkerData}
                  calMethod={calMethod}
                  units={units}
                />
              </Card>
            </View>
          ) : null}
          {visible ? (
            <>
              <View style={[SpaceStyles.mx7, {marginTop: 40}]}>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <View
                    style={[
                      SpaceStyles.mx1,
                      SpaceStyles.my1,
                      MainStyles.widthTwoThird,
                    ]}>
                    <TextInput
                      keyboardType="numeric"
                      label="Floor Area"
                      value={floorArea}
                      dense
                      mode="outlined"
                      onChangeText={val => setFloorArea(val)}
                      right={<TextInput.Affix text={unit?.toLowerCase()} />}
                    />
                  </View>
                  <View
                    style={[
                      SpaceStyles.mx1,
                      SpaceStyles.mt3,
                      MainStyles.widthOneThird,
                    ]}>
                    <FormSelect
                      data={unitArr}
                      value={unit}
                      onSelect={val => setUnit(val)}
                      elementWidth="100%"
                      defaultButtonText="Unit"
                    />
                  </View>
                </View>
                <View style={[SpaceStyles.px40, SpaceStyles.py5]}>
                  <Button
                    compact
                    mode="elevated"
                    buttonColor={firstColor}
                    textColor={colorWhite}
                    onPress={handleFloorArea}>
                    Calculate Costing
                  </Button>
                </View>
              </View>
              {floorVisible ? (
                <View style={SpaceStyles.p2}>
                  <Card style={SpaceStyles.py2}>
                    <GiDuctResult sizerData={sizerData} />
                  </Card>
                </View>
              ) : null}
            </>
          ) : null}
          {visible && floorVisible ? (
            <View style={[SpaceStyles.px40, SpaceStyles.py10]}>
              <Button
                compact
                mode="elevated"
                buttonColor={firstColor}
                textColor={colorWhite}
                onPress={handleClear}>
                Clear
              </Button>
              <View style={SpaceStyles.py20} />
            </View>
          ) : null}
          <CalculationMethod
            visible={cmVisible}
            calMethod={calMethod}
            setCalMethod={val => {
              setCalMethod(val);
            }}
            handleClose={() => setCmVisible(false)}
          />
          <Units
            visible={utVisible}
            units={units}
            setUnits={val => {
              setUnits(val);
            }}
            handleClose={() => setUtVisible(false)}
          />
          <ModalView visible={open} emptyHeight="20%">
            <View style={styles.modal}>
              <View style={styles.touchableView}>
                <TouchableOpacity onPress={() => setOpen(false)}>
                  <Text style={styles.font24}>X</Text>
                </TouchableOpacity>
              </View>
              <ScrollView horizontal minimumZoomScale={1} maximumZoomScale={5}>
                <Pinchable>
                  <Image
                    source={require('../../assets/ductingStandards1.jpeg')}
                  />
                </Pinchable>
              </ScrollView>
            </View>
          </ModalView>
        </Card>
      </ScreenWrapper>
    </TextInputAvoidingView>
  );
}

const styles = StyleSheet.create({
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
  imageStyles: {
    width: 196,
    height: 195,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  image: {width: '100%', height: '100%', minHeight: 400, resizeMode: 'contain'},
  touchableView: {
    backgroundColor: 'white',
    borderRadius: 15,
    width: 28,
    paddingHorizontal: 7,
    marginVertical: 2,
    display: 'flex',
    alignSelf: 'flex-end',
  },
  font24: {fontSize: 24},
  touchableView1: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  touchableFlex: {flex: 1, marginVertical: 10},
});
