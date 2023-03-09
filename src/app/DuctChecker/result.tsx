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
        style={[TextStyles.colorMedium, SpaceStyles.py2, SpaceStyles.px1]}
        variant="titleSmall">
        {calMethod === 'frictionRate' ? 'Velocity' : 'Friction Rate'}
      </Text>
      {calMethod === 'frictionRate' ? (
        <View style={MainStyles.flexRow}>
          <View style={[SpaceStyles.m1, MainStyles.halfInput]}>
            <TextInput
              editable={false}
              label="Circular Duct"
              style={SpaceStyles.mrp}
              value={checkerData?.velocityCircular?.toString()}
              right={
                <TextInput.Affix text={units === 'siUnits' ? 'm/s' : 'fpm'} />
              }
            />
          </View>
          <View style={[SpaceStyles.m1, MainStyles.halfInput]}>
            <TextInput
              editable={false}
              label="Rectangular Duct"
              style={SpaceStyles.mrp}
              value={checkerData?.velocityRectangular?.toString()}
              right={
                <TextInput.Affix text={units === 'siUnits' ? 'm/s' : 'fpm'} />
              }
            />
          </View>
        </View>
      ) : (
        <View style={MainStyles.flexRow}>
          <View style={[SpaceStyles.m1, MainStyles.halfInput]}>
            <TextInput
              editable={false}
              label="Circular Duct"
              style={SpaceStyles.mrp}
              value={checkerData?.frictionCircular?.toString()}
              right={
                <TextInput.Affix text={units === 'siUnits' ? 'Pa/m' : 'Pa/m'} />
              }
            />
          </View>
          <View style={[SpaceStyles.m1, MainStyles.halfInput]}>
            <TextInput
              editable={false}
              label="Rectangle Duct"
              style={SpaceStyles.mrp}
              value={checkerData?.frictionRectangular?.toString()}
              right={
                <TextInput.Affix text={units === 'siUnits' ? 'Pa/m' : 'Pa/m'} />
              }
            />
          </View>
        </View>
      )}
      {/* <View style={MainStyles.flexRow}>
        <View style={[SpaceStyles.m1, MainStyles.halfInput]}>
          <TextInput
            editable={false}
            label="Height"
            style={SpaceStyles.mrp}
            value={checkerData?.mmHeight?.toString()}
            right={<TextInput.Affix text="mm" />}
          />
        </View>
        <View style={[SpaceStyles.m1, MainStyles.halfInput]}>
          <TextInput
            editable={false}
            label="Width"
            style={SpaceStyles.mrp}
            value={checkerData?.mmWidth?.toString()}
            right={<TextInput.Affix text="mm" />}
          />
        </View>
      </View> */}
      {/* <View style={MainStyles.flexRow}>
        <View style={[SpaceStyles.m1, MainStyles.halfInput]}>
          <TextInput
            editable={false}
            label="Perimeter"
            style={SpaceStyles.mrp}
            value={checkerData?.perimeter?.toString()}
            right={<TextInput.Affix text="mm" />}
          />
        </View>
        <View style={[SpaceStyles.m1, MainStyles.halfInput]}>
          <TextInput
            editable={false}
            label="Area"
            style={SpaceStyles.mrp}
            value={checkerData?.area?.toString()}
            right={<TextInput.Affix text="sqmt" />}
          />
        </View>
      </View> */}
      <View style={MainStyles.flexRow}>
        <View style={MainStyles.halfInput}>
          <View style={SpaceStyles.m1}>
            <TextInput
              editable={false}
              label="Diameter"
              style={SpaceStyles.mrp}
              value={checkerData?.ductDiamaeter?.toString()}
              right={
                <TextInput.Affix text={units === 'siUnits' ? 'm' : 'In'} />
              }
            />
          </View>
          <View style={SpaceStyles.m1}>
            <TextInput
              editable={false}
              label="Duct Width"
              style={SpaceStyles.mrp}
              value={checkerData?.ductWidth?.toString()}
              right={
                <TextInput.Affix text={units === 'siUnits' ? 'm' : 'In'} />
              }
            />
          </View>
          <View style={SpaceStyles.m1}>
            <TextInput
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
            1.4 : 1
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
    </Card.Content>
  );
}
