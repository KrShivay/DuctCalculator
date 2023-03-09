import React, {ReactNode} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';

type ModalViewProps = {
  children: ReactNode;
  visible: boolean;
  emptyHeight: string;
};

const ModalView = ({
  children,
  visible,
  emptyHeight,
}: ModalViewProps): JSX.Element => {
  const {width, height} = useWindowDimensions();

  const componentData = [
    {
      component: children,
    },
  ];

  const renderItem = React.useCallback(({item}: any) => {
    return item.component;
  }, []);

  return (
    <Modal
      transparent={true}
      animationType={'slide'}
      visible={visible}
      onRequestClose={() => null}>
      <View
        style={[styles.flex1, styles.viewStyle, {width, maxHeight: height}]}>
        <View style={{height: emptyHeight}} />
        <FlatList
          data={componentData}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </Modal>
  );
};

export default ModalView;

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  height20: {
    height: '15%',
  },
  viewStyle: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
    paddingTop: 10,
    paddingHorizontal: 10,
  },
});
