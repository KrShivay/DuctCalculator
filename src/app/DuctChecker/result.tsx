import React from 'react';
import {View} from 'react-native';
import {Card, Text, TextInput} from 'react-native-paper';
import {getUnitsRate} from '../../data/ductCheckerData';
import MainStyles from '../../styles/mainStyles';
import SpaceStyles from '../../styles/spaceStyles';
import TextStyles from '../../styles/textStyles';

export default function ResultsChecker({
  checkerData,
  calMethod,
  units,
}: {
  checkerData: any | undefined;
  calMethod: string;
  units: string;
}) {
  const checkData = val => {
    if (Number(val)) {
      return val;
    }
    return 1;
  };

  const getHeight = val => {
    console.log({val});
    if (val) {
      if (units === 'siUnits') {
        return (val / 1000)?.toFixed(2);
      } else {
        return ((val * 39.3701) / 1000)?.toFixed(2);
      }
    } else {
      return '1';
    }
  };

  const getRatio = (w, h) => {
    console.log({w, h});
    if (Number(w) > Number(h)) {
      return `${(w / h)?.toFixed(2)} : 1`;
    } else {
      return `1 : ${(h / w)?.toFixed(2)}`;
    }
  };

  console.log({checkerData: checkerData});
  return (
    <Card.Content>
      <Text
        style={[{color: '#000'}, SpaceStyles.py2, SpaceStyles.px1]}
        variant="titleSmall">
        Circular
      </Text>
      <View style={MainStyles.flexRow}>
        {calMethod !== 'frictionRate' ? (
          <View style={[SpaceStyles.m1, MainStyles.halfInput]}>
            <TextInput
              dense
              mode="outlined"
              editable={false}
              label={
                calMethod === 'frictionRate' ? 'Velocity' : 'Friction Rate'
              }
              style={SpaceStyles.mrp}
              value={checkerData?.frictionCircular?.toString()}
              right={
                <TextInput.Affix
                  textStyle={{fontSize: 10}}
                  text={getUnitsRate(calMethod, units)}
                />
              }
            />
          </View>
        ) : (
          <View style={[SpaceStyles.m1, MainStyles.halfInput]}>
            <TextInput
              dense
              mode="outlined"
              editable={false}
              label={
                calMethod === 'frictionRate' ? 'Velocity' : 'Friction Rate'
              }
              style={SpaceStyles.mrp}
              value={checkerData?.velocityCircular?.toString()}
              right={
                <TextInput.Affix
                  textStyle={{fontSize: 10}}
                  text={getUnitsRate(calMethod, units)}
                />
              }
            />
          </View>
        )}
        <View style={[SpaceStyles.m1, MainStyles.halfInput]}>
          <TextInput
            editable={false}
            dense
            mode="outlined"
            label="Diameter"
            style={SpaceStyles.mrp}
            value={checkerData?.ductDiamaeter?.toString()}
            right={
              <TextInput.Affix
                textStyle={{fontSize: 10}}
                text={units === 'siUnits' ? 'm' : 'In'}
              />
            }
          />
        </View>
      </View>
      <Text
        style={[{color: '#000'}, SpaceStyles.py2, SpaceStyles.px1]}
        variant="titleSmall">
        Rectangular
      </Text>
      <View style={MainStyles.flexRow}>
        <View style={MainStyles.halfInput}>
          {calMethod !== 'frictionRate' ? (
            <View style={[SpaceStyles.m1]}>
              <TextInput
                dense
                mode="outlined"
                editable={false}
                label={
                  calMethod === 'frictionRate' ? 'Velocity' : 'Friction Rate'
                }
                style={SpaceStyles.mrp}
                value={checkerData?.frictionRectangular?.toString()}
                right={
                  <TextInput.Affix
                    textStyle={{fontSize: 10}}
                    text={getUnitsRate(calMethod, units)}
                  />
                }
              />
            </View>
          ) : (
            <View style={[SpaceStyles.m1]}>
              <TextInput
                dense
                mode="outlined"
                editable={false}
                label={
                  calMethod === 'frictionRate' ? 'Velocity' : 'Friction Rate'
                }
                style={SpaceStyles.mrp}
                value={checkerData?.velocityRectangular?.toString()}
                right={
                  <TextInput.Affix
                    textStyle={{fontSize: 10}}
                    text={getUnitsRate(calMethod, units)}
                  />
                }
              />
            </View>
          )}
          <View style={SpaceStyles.m1}>
            <TextInput
              dense
              mode="outlined"
              editable={false}
              label="Duct Width"
              style={SpaceStyles.mrp}
              value={checkerData?.mmWidth?.toString()}
              right={
                <TextInput.Affix
                  textStyle={{fontSize: 10}}
                  text={units === 'siUnits' ? 'm' : 'In'}
                />
              }
            />
          </View>
          <View style={SpaceStyles.m1}>
            <TextInput
              dense
              mode="outlined"
              editable={false}
              label="Duct Height"
              style={SpaceStyles.mrp}
              value={getHeight(checkerData?.mmHeight)?.toString()}
              right={
                <TextInput.Affix
                  textStyle={{fontSize: 10}}
                  text={units === 'siUnits' ? 'm' : 'In'}
                />
              }
            />
          </View>
        </View>
        <View style={MainStyles.halfInput}>
          <View style={MainStyles.ratioBox}>
            <Text
              style={[
                TextStyles.colorMedium,
                SpaceStyles.py5,
                SpaceStyles.px1,
                TextStyles.textCenter,
              ]}
              variant="titleSmall">
              Duct Ratio
            </Text>

            <Text
              style={[
                TextStyles.colorMedium,
                SpaceStyles.py2,
                SpaceStyles.px1,
                TextStyles.textCenter,
              ]}
              variant="titleSmall">
              {getRatio(
                getHeight(checkerData?.mmHeight),
                checkData(checkerData?.mmWidth),
              )}
            </Text>
            <Text
              style={[
                TextStyles.colorMedium,
                SpaceStyles.py2,
                SpaceStyles.px1,
                TextStyles.textCenter,
              ]}
              variant="titleSmall">
              Height : Width
            </Text>
          </View>
        </View>
      </View>
    </Card.Content>
  );
}
