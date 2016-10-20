import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';


let styles = StyleSheet.create({
  
  textInput: {
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',   
    
  },
  wrapperStyle: 
  {
    height: 50,
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: '#B9AAAA',
    textAlign: "center",  
  }
  ,
  inputStyle:{
      color: '#bbbbbb',
      textAlign: "center",
  }
});

export default function (props) {

  return (
    <View style={ [styles.wrapperStyle, props.wrapperStyle] }>
      <TextInput underlineColorAndroid="#ffffff00" {...props} style={ styles.inputStyle } />
    </View>
    );
}
