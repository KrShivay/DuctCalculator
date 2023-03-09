import React from 'react';
import {Linking, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Card, Text} from 'react-native-paper';
import {colorBlack} from '../../styles/constants';
import SpaceStyles from '../../styles/spaceStyles';
import TextStyles from '../../styles/textStyles';

const btnArr = [
  'Spiral',
  'Oval',
  'Rectangle',
  'Preinsulated',
  'Fabric',
  'SS Rectangle',
];

const TabButton = ({sizerData}: {sizerData: any}) => {
  const handleFabricDetailsOpen = () => {
    try {
      Linking.openURL(
        'https://play.google.com/store/apps/details?id=com.prihoda.calculator',
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      {btnArr?.map(label => (
        <React.Fragment key={label}>
          <View style={styles.container}>
            <Text
              style={[SpaceStyles.p2, {color: colorBlack}]}
              variant="titleMedium">
              {label} Duct Type
            </Text>

            {sizerData?.giCosting[label] &&
              Object.keys(sizerData?.giCosting[label]).map(item => (
                <React.Fragment key={item}>
                  <View style={styles.itemContainer}>
                    <View>
                      <Text variant="bodyMedium">{item} : </Text>
                    </View>
                    <View>
                      <Text variant="bodyLarge" style={TextStyles.colorDark}>
                        {sizerData?.giCosting[label][item]}
                      </Text>
                    </View>
                  </View>
                </React.Fragment>
              ))}
            {label === 'Fabric' ? (
              <Button
                textColor="#3498db"
                mode="outlined"
                compact
                style={{marginVertical: 4}}
                onPress={handleFabricDetailsOpen}>
                Click here for Fabric Details
              </Button>
            ) : null}
          </View>
        </React.Fragment>
      ))}
    </ScrollView>
  );
};

export default function GiDuctResult({sizerData}: {sizerData: any}) {
  return (
    <Card.Content>
      <Text style={[SpaceStyles.p2, {color: colorBlack}]} variant="titleMedium">
        Duct Costing
      </Text>
      <View style={SpaceStyles.my1}>
        <View style={SpaceStyles.m1}>
          <TabButton sizerData={sizerData} />
        </View>
      </View>
    </Card.Content>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: 225,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'scroll',
    paddingHorizontal: 10,
    paddingVertical: 7,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
});
