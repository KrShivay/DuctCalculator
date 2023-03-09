/// <reference path="../../../index.d.ts" />
import React from 'react';
import {StyleSheet, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type FormSelectProps = {
  data: string[];
  onSelect: (selectedItem: string, index: number) => void;
  elementWidth: string;
  style?: any;
  value?: string;
  defaultButtonText?: string;
};

const FormSelect = ({
  data,
  onSelect,
  elementWidth,
  style,
  value,
  defaultButtonText,
  ...rest
}: FormSelectProps) => {
  return (
    <View style={styles.viewContainer}>
      <View style={[styles.dropdownsRow, {width: elementWidth, ...style}]}>
        <SelectDropdown
          data={data}
          onSelect={onSelect}
          defaultValue={value}
          buttonTextAfterSelection={(selectedItem: string, _index: number) => {
            return selectedItem;
          }}
          rowTextForSelection={(item: string, _index: number) => {
            return item;
          }}
          onChangeSearchInputText={() => console.log('changed')}
          buttonStyle={styles.dropdown1BtnStyle}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          renderDropdownIcon={isOpened => {
            return (
              <FontAwesome
                name={isOpened ? 'chevron-up' : 'chevron-down'}
                color={'#444'}
                size={18}
              />
            );
          }}
          defaultButtonText={defaultButtonText}
          dropdownIconPosition={'right'}
          dropdownStyle={styles.dropdown1DropdownStyle}
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown1RowTxtStyle}
          {...rest}
        />
      </View>
    </View>
  );
};

export default FormSelect;

const styles = StyleSheet.create({
  saveAreaViewContainer: {flex: 1, backgroundColor: '#FFF'},
  viewContainer: {flex: 1, backgroundColor: '#FFF'},
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '10%',
  },
  dropdownsRow: {flexDirection: 'row'},
  dropdown1BtnStyle: {
    flex: 1,
    height: 42,
    backgroundColor: 'rgba(255, 251, 254, 1)',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: {
    color: '#444',
    textAlign: 'left',
    fontSize: 16,
    marginTop: 2,
  },
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
  labelPosition: {
    position: 'relative',
    zIndex: 9999,
    color: '#48454F',
    top: 20,
    left: 17,
  },
});
