/// <reference path="../../index.d.ts" />
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import {ClearStorage} from '../../asyncStorage';
import TextInputAvoidingView from '../../components/KeyBoardAvoidingView';
import ScreenWrapper from '../../layout/ScreenWrapper';
import {colorWhite} from '../../styles/constants';
import MainStyles from '../../styles/mainStyles';
import SpaceStyles from '../../styles/spaceStyles';
import TextStyles from '../../styles/textStyles';

export default function Settings() {
  const navigation = useNavigation();

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
              Material
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
          <View style={styles.touchableFlex}>
            <View style={styles.touchableView1}>
              <Text>Material</Text>
            </View>
          </View>
        </View>
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
