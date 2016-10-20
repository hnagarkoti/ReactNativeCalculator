import React from 'react';
import ReactNative from 'react-native';
const { Component } = React;
const {
  View,
  ProgressBarAndroid
} = ReactNative;

export default function( props ){

  return (
      <View>
        <ProgressBarAndroid
          style={{
            height: 20,
          }}
          styleAttr="Inverse"
          {...props}
        />
      </View>
  );
}
