import React from 'react';
import {View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {colorBlack} from '../../styles/constants';
import SpaceStyles from '../../styles/spaceStyles';

export default function AdditionalResult() {
  return (
    <Card.Content>
      <Text style={[SpaceStyles.p2, {color: colorBlack}]} variant="titleMedium">
        Duct Costing
      </Text>
      <View style={SpaceStyles.my1}>
        <View style={SpaceStyles.m1}>
          <Text
            style={[SpaceStyles.p2, {color: colorBlack}]}
            variant="titleMedium">
            Duct Costing
          </Text>
        </View>
      </View>
    </Card.Content>
  );
}
