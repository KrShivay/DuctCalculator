import React from 'react';
import {Control, Controller, FieldErrors} from 'react-hook-form';
import {StyleProp} from 'react-native';
import {Text, TextInput} from 'react-native-paper';

type FormInputProps = {
  control: Control<any, any>;
  styles: StyleProp<any>;
  label: string;
  placeholder: string;
  errors: FieldErrors<any>;
  name: string;
};

export default function FormInput({
  control,
  styles,
  label,
  placeholder,
  errors,
  name,
}: FormInputProps) {
  return (
    <>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles ?? {}}
            label={label ?? ''}
            placeholder={placeholder ?? ''}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value ?? ''}
          />
        )}
        name={name}
      />
      {errors[name] && <Text>This is required.</Text>}
    </>
  );
}
