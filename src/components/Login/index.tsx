import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {StoreJsonData} from '../../asyncStorage';
import ScreenWrapper from '../../layout/ScreenWrapper';
import MainStyles from '../../styles/mainStyles';
import SpaceStyles from '../../styles/spaceStyles';
import TextStyles from '../../styles/textStyles';
import {loginValidation} from '../../validations/loginValidation';
import FormError from '../FormComponents/FormError';
import TextInputAvoidingView from '../KeyBoardAvoidingView';
import Loader from '../Loader';

export type RootStackParamList = {
  Dashboard: {id: number} | undefined;
};

type LoginForm = {
  userName: string;
  mobileNo: string;
  email?: string;
};

export default function Login() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginForm>({
    defaultValues: {
      userName: '',
      mobileNo: '',
      email: '',
    },
    resolver: yupResolver(loginValidation),
  });

  const onSubmit = (data: LoginForm) => {
    setLoading(true);
    StoreJsonData('userDetails', data);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Dashboard');
    }, 500);
  };

  return (
    <TextInputAvoidingView>
      <ScreenWrapper
        keyboardShouldPersistTaps={'always'}
        removeClippedSubviews={false}>
        <View>
          <View style={[MainStyles.backgroundDark, styles.headerContainer]}>
            <Text
              style={[
                TextStyles.textCenter,
                TextStyles.colorGray,
                SpaceStyles.py5,
              ]}
              variant="headlineLarge">
              Welcome
            </Text>
            <Text
              style={[
                TextStyles.textCenter,
                TextStyles.colorGray,
                SpaceStyles.py5,
              ]}
              variant="titleSmall">
              Provide your details to continue
            </Text>
          </View>
          <View style={[styles.formContainer]}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.inputContainerStyle}
                  label="Username *"
                  placeholder="Enter Username"
                  onBlur={onBlur}
                  mode="outlined"
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="userName"
            />
            <FormError message={errors.userName?.message} />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.inputContainerStyle}
                  keyboardType="numeric"
                  label="Mobile No *"
                  mode="outlined"
                  placeholder="Enter Mobile No"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="mobileNo"
            />
            <FormError message={errors.mobileNo?.message} />
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.inputContainerStyle}
                  label="Email"
                  mode="outlined"
                  placeholder="Enter Email"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="email"
            />
            <FormError message={errors.email?.message} />
          </View>
          <View style={styles.btnContainer}>
            <Button
              mode="contained"
              style={SpaceStyles.py2}
              onPress={handleSubmit(onSubmit)}>
              Proceed
            </Button>
          </View>
        </View>
        {loading ? <Loader /> : null}
      </ScreenWrapper>
    </TextInputAvoidingView>
  );
}

Login.title = 'Login';

const styles = StyleSheet.create({
  helpersWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapper: {
    flex: 1,
  },
  helper: {
    flexShrink: 1,
  },
  counterHelper: {
    textAlign: 'right',
  },
  inputContainerStyle: {
    margin: 8,
  },
  inputContentStyle: {
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  fontSize: {
    fontSize: 32,
  },
  textArea: {
    height: 80,
  },
  noPaddingInput: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
  },
  centeredText: {
    textAlign: 'center',
  },
  fixedHeight: {
    height: 100,
  },

  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 220,
  },
  formContainer: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 16,
  },
  btnContainer: {
    flex: 1,
    paddingVertical: 150,
    paddingHorizontal: 16,
  },
});
