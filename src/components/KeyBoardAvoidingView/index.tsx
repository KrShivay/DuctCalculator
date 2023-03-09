import * as React from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';

type AvoidingViewProps = {
  children: React.ReactNode;
};

const TextInputAvoidingView = ({children}: AvoidingViewProps) => {
  return Platform.OS === 'ios' ? (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior="padding"
      keyboardVerticalOffset={80}>
      {children}
    </KeyboardAvoidingView>
  ) : (
    <>{children}</>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default TextInputAvoidingView;
