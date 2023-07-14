import React from 'react';
import {View} from 'react-native';
import {Card, Text, TextInput} from 'react-native-paper';
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
  return (
    <Card.Content>
      <Text
        style={[{color: '#000'}, SpaceStyles.py2, SpaceStyles.px1]}
        variant="titleSmall">
        Circular
      </Text>
      <View style={MainStyles.flexRow}>
        {calMethod === 'frictionRate' ? (
          <View style={[SpaceStyles.m1, MainStyles.halfInput]}>
            <TextInput
              dense
              mode="outlined"
              editable={false}
              label="Circular Duct"
              style={SpaceStyles.mrp}
              value={checkerData?.frictionCircular?.toString() || '0.00'}
              right={
                <TextInput.Affix text={units === 'siUnits' ? 'Pa/m' : 'Pa/m'} />
              }
            />
          </View>
        ) : (
          <View style={[SpaceStyles.m1, MainStyles.halfInput]}>
            <TextInput
              dense
              mode="outlined"
              editable={false}
              label="Circular Duct"
              style={SpaceStyles.mrp}
              value={checkerData?.velocityCircular?.toString() || '0.00'}
              right={
                <TextInput.Affix text={units === 'siUnits' ? 'm/s' : 'fpm'} />
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
            right={<TextInput.Affix text={units === 'siUnits' ? 'm' : 'In'} />}
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
          {calMethod === 'frictionRate' ? (
            <View style={[SpaceStyles.m1]}>
              <TextInput
                dense
                mode="outlined"
                editable={false}
                label="Rectangle Duct"
                style={SpaceStyles.mrp}
                value={checkerData?.frictionRectangular?.toString() || '0.00'}
                right={
                  <TextInput.Affix
                    text={units === 'siUnits' ? 'Pa/m' : 'Pa/m'}
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
                label="Rectangular Duct"
                style={SpaceStyles.mrp}
                value={checkerData?.velocityRectangular?.toString() || '0.00'}
                right={
                  <TextInput.Affix text={units === 'siUnits' ? 'm/s' : 'fpm'} />
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
              value={checkerData?.ductWidth?.toString()}
              right={
                <TextInput.Affix text={units === 'siUnits' ? 'm' : 'In'} />
              }
            />
          </View>
          {console.log('>>>>>>>>>>>>>', {mmHeight: checkerData?.mmHeight})}
          <View style={SpaceStyles.m1}>
            <TextInput
              dense
              mode="outlined"
              editable={false}
              label="Duct Height"
              style={SpaceStyles.mrp}
              value={(checkerData?.mmHeight / 1000)?.toString()}
              right={
                <TextInput.Affix text={units === 'siUnits' ? 'm' : 'In'} />
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
              {(checkerData?.mmHeight / 1000 / checkerData?.ductWidth)?.toFixed(
                2,
              )}{' '}
              : 1
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
