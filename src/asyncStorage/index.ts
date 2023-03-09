import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

export async function StoreStringData(key: string, value: string) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log('error reading value StoreStringData', e);
  }
}

export async function StoreJsonData(key: string, value: any) {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log('error reading value StoreJsonData', e);
  }
}

export async function GetStringData(key: string): Promise<string | undefined> {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log('error reading value GetStringData', e);
  }
}

export async function GetJsonData(key: string): Promise<any> {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('error reading value GetJsonData', e);
  }
}

export async function RemoveJsonData(key: string) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log('error reading value RemoveJsonData', e);
  }
}

export async function ClearStorage(navigate: any) {
  try {
    Alert.alert('Warning!', 'You will be logged out! Do you wish to proceed?', [
      {
        text: 'Ok',
        onPress: async () => {
          await AsyncStorage.clear();
          navigate('Login');
        },
      },
      {
        text: 'Cancel',
      },
    ]);
  } catch (e) {
    console.log(e);
  }
}
