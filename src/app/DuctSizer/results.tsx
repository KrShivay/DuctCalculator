import React from 'react';
import {View} from 'react-native';
import {Card, Text, TextInput} from 'react-native-paper';
import {colorBlack} from '../../styles/constants';
import MainStyles from '../../styles/mainStyles';
import SpaceStyles from '../../styles/spaceStyles';
import {giData, GIDuctLabel, hvacData} from './sizerFns';

export default function ResultsSizer({
  sizerData,
  ductType,
  unit,
}: {
  sizerData: any;
  ductType: string;
  unit: string;
}) {
  return (
    <Card.Content>
      <View style={[SpaceStyles.m1, MainStyles.flexRow]}>
        <TextInput
          editable={false}
          label="Air Flow"
          style={[MainStyles.halfInput, SpaceStyles.mrp]}
          value={sizerData?.airFlow?.toString()}
          right={<TextInput.Affix text="CFM" />}
        />

        <TextInput
          editable={false}
          label="AC Load"
          style={[MainStyles.halfInput, SpaceStyles.mlp]}
          value={sizerData?.acLoad?.toString()}
          right={<TextInput.Affix text="TR" />}
        />
      </View>
      <Text style={[SpaceStyles.p2, {color: colorBlack}]} variant="titleMedium">
        HVAC Duct Costing
      </Text>
      <View style={SpaceStyles.my5}>
        {sizerData?.hvacCosting &&
        Object.keys(sizerData?.hvacCosting)?.length > 0 ? (
          <>
            {Object.keys(sizerData.hvacCosting)?.map((item: string) => (
              <View style={SpaceStyles.m1} key={item}>
                <TextInput
                  editable={false}
                  label={`${ductType} Ducting Quantity`}
                  value={sizerData.hvacCosting[
                    item as keyof hvacData
                  ]?.toString()}
                  right={<TextInput.Affix text={unit} />}
                />
              </View>
            ))}
          </>
        ) : null}
      </View>
      <Text style={[SpaceStyles.p2, {color: colorBlack}]} variant="titleMedium">
        GI Duct Costing
      </Text>
      <View style={SpaceStyles.my5}>
        {sizerData?.giCosting &&
        Object.keys(sizerData?.giCosting)?.length > 0 ? (
          <>
            {Object.keys(sizerData?.giCosting)?.map(
              (item: string, idx: number) => (
                <View style={SpaceStyles.m1} key={item}>
                  <TextInput
                    editable={false}
                    label={GIDuctLabel[idx]?.toString()}
                    value={
                      sizerData?.giCosting[item as keyof giData]
                        ? sizerData?.giCosting[item as keyof giData]?.toString()
                        : ''
                    }
                  />
                </View>
              ),
            )}
          </>
        ) : null}
      </View>
    </Card.Content>
  );
}
