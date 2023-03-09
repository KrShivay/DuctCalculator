/// <reference path="../../index.d.ts" />
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import Pinchable from 'react-native-pinchable';
import {ClearStorage} from '../../asyncStorage';
import TextInputAvoidingView from '../../components/KeyBoardAvoidingView';
import ModalView from '../../components/ModalView';
import ScreenWrapper from '../../layout/ScreenWrapper';
import {colorWhite} from '../../styles/constants';
import MainStyles from '../../styles/mainStyles';
import SpaceStyles from '../../styles/spaceStyles';
import TextStyles from '../../styles/textStyles';

import Page01 from '../../assets/svg/Page01.svg';
import Page02 from '../../assets/svg/Page02.svg';
import Page03 from '../../assets/svg/Page03.svg';
import Page04 from '../../assets/svg/Page04.svg';
import Page05 from '../../assets/svg/Page05.svg';
import Page06 from '../../assets/svg/Page06.svg';
import Page07 from '../../assets/svg/Page07.svg';
import Page08 from '../../assets/svg/Page08.svg';
import Page09 from '../../assets/svg/Page09.svg';
import Page10 from '../../assets/svg/Page10.svg';
import Page11 from '../../assets/svg/Page11.svg';
import Page12 from '../../assets/svg/Page12.svg';
import Page13 from '../../assets/svg/Page13.svg';
import Page14 from '../../assets/svg/Page14.svg';
import Page15 from '../../assets/svg/Page15.svg';
import Page16 from '../../assets/svg/Page16.svg';

const {width, height} = Dimensions.get('window');

const imageArr = [
  {
    component: <Page01 height={width / 1.15} width={width / 2} />,
    key: 'page01',
  },
  {
    component: <Page02 height={width / 1.15} width={width / 2} />,
    key: 'page02',
  },
  {
    component: <Page03 height={width / 1.15} width={width / 2} />,
    key: 'page03',
  },
  {
    component: <Page04 height={width / 1.15} width={width / 2} />,
    key: 'page04',
  },
  {
    component: <Page05 height={width / 1.15} width={width / 2} />,
    key: 'page05',
  },
  {
    component: <Page06 height={width / 1.15} width={width / 2} />,
    key: 'page06',
  },
  {
    component: <Page07 height={width / 1.15} width={width / 2} />,
    key: 'page07',
  },
  {
    component: <Page08 height={width / 1.15} width={width / 2} />,
    key: 'page08',
  },
  {
    component: <Page09 height={width / 1.15} width={width / 2} />,
    key: 'page09',
  },
  {
    component: <Page10 height={width / 1.15} width={width / 2} />,
    key: 'page10',
  },
  {
    component: <Page11 height={width / 1.15} width={width / 2} />,
    key: 'page11',
  },
  {
    component: <Page12 height={width / 1.15} width={width / 2} />,
    key: 'page12',
  },
  {
    component: <Page13 height={width / 1.15} width={width / 2} />,
    key: 'page13',
  },
  {
    component: <Page14 height={width / 1.15} width={width / 2} />,
    key: 'page14',
  },
  {
    component: <Page15 height={width / 1.15} width={width / 2} />,
    key: 'page15',
  },
  {
    component: <Page16 height={width / 1.15} width={width / 2} />,
    key: 'page16',
  },
];

const imageArrs = [
  {component: <Page01 height={height - 120} width={width} />, key: 'page01'},
  {component: <Page02 height={height - 120} width={width} />, key: 'page02'},
  {component: <Page03 height={height - 120} width={width} />, key: 'page03'},
  {component: <Page04 height={height - 120} width={width} />, key: 'page04'},
  {component: <Page05 height={height - 120} width={width} />, key: 'page05'},
  {component: <Page06 height={height - 120} width={width} />, key: 'page06'},
  {component: <Page07 height={height - 120} width={width} />, key: 'page07'},
  {component: <Page08 height={height - 120} width={width} />, key: 'page08'},
  {component: <Page09 height={height - 120} width={width} />, key: 'page09'},
  {component: <Page10 height={height - 120} width={width} />, key: 'page10'},
  {component: <Page11 height={height - 120} width={width} />, key: 'page11'},
  {component: <Page12 height={height - 120} width={width} />, key: 'page12'},
  {component: <Page13 height={height - 120} width={width} />, key: 'page13'},
  {component: <Page14 height={height - 120} width={width} />, key: 'page14'},
  {component: <Page15 height={height - 120} width={width} />, key: 'page15'},
  {component: <Page16 height={height - 120} width={width} />, key: 'page16'},
];

export default function Explore() {
  const navigation = useNavigation();
  const [visible, setVisible] = useState<boolean>(false);
  const [img, setImg] = useState<any>(null);

  const handleOpen = (idx: any) => {
    setImg(idx);
  };

  useEffect(() => {
    if (img) {
      setVisible(true);
    }
  }, [img]);

  const handleClose = () => {
    setVisible(false);
    setImg(null);
  };

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
              Information
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
              {imageArr?.map(item => (
                <View key={item.key} style={{marginVertical: 2}}>
                  <TouchableOpacity onPress={() => handleOpen(item.key)}>
                    {item.component}
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          <ModalView visible={visible} emptyHeight="1%">
            <View style={styles.modal}>
              <View style={styles.touchableView}>
                <TouchableOpacity onPress={() => handleClose()}>
                  <Text style={styles.font24}>X</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Pinchable>
                  {
                    imageArrs
                      .filter(item => item.key === img)
                      .map(j => j.component)[0]
                  }
                </Pinchable>
              </View>
            </View>
          </ModalView>
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
    width: 190,
    height: 190,
    resizeMode: 'cover',
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
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  touchableFlex: {flex: 1, marginVertical: 10},
});
