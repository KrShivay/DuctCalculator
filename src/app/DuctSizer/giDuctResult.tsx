import React from 'react';
import {
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {colorBlack, firstColor} from '../../styles/constants';
import MainStyles from '../../styles/mainStyles';
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
    const android_url =
      'https://play.google.com/store/apps/details?id=com.prihoda.calculator';
    const ios_url = 'https://apps.apple.com/in/app/prihoda/id1148389151';
    try {
      Linking.openURL(Platform.OS === 'ios' ? ios_url : android_url);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView
      horizontal
      keyboardShouldPersistTaps="handled"
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
              <TouchableOpacity
                style={styles.touchableStyle}
                onPress={() => handleFabricDetailsOpen()}>
                <Text
                  style={[
                    MainStyles.justifyCenter,
                    {
                      color: firstColor,
                      borderBottomWidth: 1,
                      borderBottomColor: firstColor,
                    },
                  ]}>
                  Click here for Fabric Details
                </Text>
              </TouchableOpacity>
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
      <Text
        style={[SpaceStyles.p2, TextStyles.colorMedium]}
        variant="titleMedium">
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
  touchableStyle: {
    marginVertical: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 5,
  },
});

// <Button
//   textColor="#3498db"
//   mode="outlined"
//   compact
//   style={{marginVertical: 4}}
//   onPress={handleFabricDetailsOpen}>
//   Click here for Fabric Details
// </Button>;
