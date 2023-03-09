import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Alert, Dimensions, View} from 'react-native';
import {Button, Card, IconButton, Text, TextInput} from 'react-native-paper';
import {ClearStorage, StoreStringData} from '../../asyncStorage';
import FormSelect from '../../components/FormComponents/FormSelect';
import TextInputAvoidingView from '../../components/KeyBoardAvoidingView';
import ScreenWrapper from '../../layout/ScreenWrapper';
import {colorWhite, firstColor, thirdColor} from '../../styles/constants';
import MainStyles from '../../styles/mainStyles';
import SpaceStyles from '../../styles/spaceStyles';
import TextStyles from '../../styles/textStyles';
import {calculateOutputData} from './additionalFns';

const shapeArray = ['Streight', 'Dropper', 'Taper', 'Elbow', 'End Piece'];

const outputUnit = {
  Perimeter: 'mm',
  Area: 'sqmt',
  'MS Angle': 'kg',
  '22SWG': 'sqmt',
  '24SWG': 'mqmt',
};

const {height} = Dimensions.get('screen');

export default function DuctChecker() {
  const navigation = useNavigation();

  const [visible, setVisible] = useState<boolean>(false);

  const [sizerData, setSizerData] = useState<any>();
  const [ductData, setDuctData] = useState<any>();

  const [height1, setHeight1] = useState<string>('');
  const [width1, setWidth1] = useState<string>('');
  const [height2, setHeight2] = useState<string>('');
  const [width2, setWidth2] = useState<string>('');
  const [length, setLength] = useState<string>('1200');
  const [shape, setShape] = useState<string>('Straight');
  const [quantity, setQuantity] = useState<string>('1');

  useEffect(() => {
    const d = async () => {
      const val = await AsyncStorage.getItem('data');
      if (val !== null) {
        setSizerData(JSON.parse(val));
      }
    };
    d();
  }, []);

  useEffect(() => {
    if (sizerData) {
      setHeight1(sizerData.mmHeight?.toString());
      setWidth1(sizerData.mmWidth?.toString());
      setHeight2(sizerData.mmHeight?.toString());
      setWidth2(sizerData.mmWidth?.toString());
    }
  }, [sizerData]);

  const handleProceed = async () => {
    if (height1 && height2 && width1 && width2 && length && shape && quantity) {
      StoreStringData('height1', height1);
      StoreStringData('height2', height2);
      StoreStringData('width1', width1);
      StoreStringData('width2', width2);
      StoreStringData('length', length);
      StoreStringData('quantity', quantity);
      StoreStringData('shape', shape);

      const data = calculateOutputData(
        height1,
        height2,
        width1,
        width2,
        length,
        shape,
        quantity,
      );
      setDuctData(data);
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

  const handleClear = () => {
    setSizerData(undefined);
    setVisible(false);
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
                Duct More Details
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

            <View style={[SpaceStyles.px5, SpaceStyles.py2]}>
              <View
                style={[MainStyles.flexRow, {justifyContent: 'space-between'}]}>
                <Text style={TextStyles.colorDark} variant="titleMedium">
                  Input
                </Text>
              </View>
              <View
                style={[MainStyles.flexRow, {justifyContent: 'space-around'}]}>
                <Text style={TextStyles.colorDark} variant="titleMedium">
                  Side 1
                </Text>
                <Text style={TextStyles.colorDark} variant="titleMedium">
                  Side 2
                </Text>
              </View>
              <View
                style={[MainStyles.flexRow, SpaceStyles.mx1, SpaceStyles.my1]}>
                <TextInput
                  keyboardType="numeric"
                  label="Height"
                  dense
                  mode="outlined"
                  value={height1}
                  style={[MainStyles.halfInput, SpaceStyles.mx1]}
                  onChangeText={val => setHeight1(val)}
                  right={<TextInput.Affix text="mm" />}
                />
                <TextInput
                  keyboardType="numeric"
                  label="Height "
                  dense
                  mode="outlined"
                  value={height2}
                  style={[MainStyles.halfInput, SpaceStyles.mx1]}
                  onChangeText={val => setHeight2(val)}
                  right={<TextInput.Affix text="mm" />}
                />
              </View>

              <View
                style={[MainStyles.flexRow, SpaceStyles.mx1, SpaceStyles.my1]}>
                <TextInput
                  keyboardType="numeric"
                  label="Width"
                  dense
                  mode="outlined"
                  value={width1}
                  style={[MainStyles.halfInput, SpaceStyles.mx1]}
                  onChangeText={val => setWidth1(val)}
                  right={<TextInput.Affix text="mm" />}
                />
                <TextInput
                  keyboardType="numeric"
                  label="Width"
                  dense
                  mode="outlined"
                  value={width2}
                  style={[MainStyles.halfInput, SpaceStyles.mx1]}
                  onChangeText={val => setWidth2(val)}
                  right={<TextInput.Affix text="mm" />}
                />
              </View>

              <View style={[SpaceStyles.mx1, SpaceStyles.my1]}>
                <TextInput
                  keyboardType="numeric"
                  label="Length"
                  dense
                  mode="outlined"
                  value={length}
                  onChangeText={val => setLength(val)}
                  right={<TextInput.Affix text="mm" />}
                />
              </View>

              <View style={[SpaceStyles.mx1, SpaceStyles.my1]}>
                <TextInput
                  keyboardType="numeric"
                  label="Quantity"
                  value={quantity}
                  dense
                  mode="outlined"
                  onChangeText={val => setQuantity(val)}
                />
              </View>
              <View style={[SpaceStyles.mx1, SpaceStyles.my1]}>
                <FormSelect
                  data={shapeArray}
                  value={shape}
                  onSelect={val => setShape(val)}
                  elementWidth="100%"
                  defaultButtonText="Shape of piece"
                />
              </View>
            </View>
            <View style={[SpaceStyles.px40, SpaceStyles.py8]}>
              <Button
                compact
                mode="elevated"
                buttonColor={firstColor}
                textColor={colorWhite}
                onPress={() => handleProceed()}>
                Calculate
              </Button>
            </View>
          </View>

          {visible ? (
            <View style={SpaceStyles.p2}>
              <Card style={SpaceStyles.py5}>
                <Text
                  style={[TextStyles.colorDark, SpaceStyles.px5]}
                  variant="titleMedium">
                  Output
                </Text>
                {ductData &&
                  Object.keys(ductData).map(item => (
                    <View style={[SpaceStyles.mx1, SpaceStyles.my1]} key={item}>
                      <TextInput
                        keyboardType="numeric"
                        label={item}
                        value={ductData[item]}
                        dense
                        mode="outlined"
                        editable={false}
                        right={<TextInput.Affix text={outputUnit[item]} />}
                      />
                    </View>
                  ))}
              </Card>
            </View>
          ) : null}
          {visible ? (
            <View style={[SpaceStyles.px40, SpaceStyles.py10]}>
              <Button
                compact
                mode="elevated"
                buttonColor={thirdColor}
                textColor={colorWhite}
                onPress={() => handleClear()}>
                Clear
              </Button>
              <View style={SpaceStyles.py20} />
            </View>
          ) : null}
        </Card>
      </ScreenWrapper>
    </TextInputAvoidingView>
  );
}
