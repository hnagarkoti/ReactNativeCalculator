// 'use strict';

import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, ListView, Dimensions } from 'react-native';
import { Card, Button, Avatar, Drawer, Divider, Subheader, COLOR, TYPO } from 'react-native-material-design';

import { mApi } from '../../libs/Api';
import Style from './Style';
import InputButton from './InputButton';

const inputButtons = [
  [1, 2, 3, '/'],
  [4, 5, 6, '*'],
  [7, 8, 9, '-'],
  [0, '.', '=', '+'],
  ['CLEAR', 'DEL']
];


class ReactCalci extends React.Component {

  static contextTypes = {
    store: React.PropTypes.object.isRequired,
  };
  constructor(){
    super();
    this.state = {
      previousInputValue: 0,
      inputValue: 0,
      selectedSymbol: null,
      lastInput: []
      // displayFullString: null
    }
  }
  componentDidMount(){

  }
  render() {
    return (
          <View style={Style.rootContainer}>
                <View style={Style.displayContainer}>
                    <Text style={Style.displayText}>{this.state.inputValue}</Text>
                </View>
                <View style={Style.inputContainer}>
                    {this._renderInputButtons()}
                </View>
            </View>
      );
  }

  /**
     * For each row in `inputButtons`, create a row View and add create an InputButton for each input in the row.
     */
    _renderInputButtons() {
        let views = [];

        for (var r = 0; r < inputButtons.length; r ++) {
            let row = inputButtons[r];

            let inputRow = [];
            for (var i = 0; i < row.length; i ++) {
                let input = row[i];

                inputRow.push(
                    <InputButton value={input} highlight={this.state.selectedSymbol === input} onPress={this._onInputButtonPressed.bind(this, input)} key={r + "-" + i} />
                );
            }

            views.push(<View style={Style.inputRow} key={"row-" + r}>{inputRow}</View>)
        }

        return views;
    }
    _onInputButtonPressed(input) {
      switch (typeof input) {
        case 'number':
              this.state.lastInput.push(input);
              return this._handleNumberInput(input);
        case 'string':
              return this._handleStringInput(input);
      }
    }
    _handleNumberInput(num){
      let inputValue = ((this.state.inputValue)* 10) + num;
      this.setState({
        inputValue: inputValue
      })
    }
    _handleStringInput(symbol){
      switch (symbol) {
        case '/':
        case '*':
        case '-':
        case '+':
            this.setState({
              selectedSymbol: symbol,
              previousInputValue: this.state.inputValue,
              inputValue: 0
            });
          break;
        case '=':
          let oldSymbol = this.state.selectedSymbol,
              inputValue = this.state.inputValue,
              previousInputValue = this.state.previousInputValue;
              if(!symbol){
                return;
              }
              this.setState({
                previousInputValue: 0,
                inputValue: eval(previousInputValue + oldSymbol + inputValue),
                selectedSymbol: null
              });
              break;
        case 'CLEAR':
            this.setState({
              previousInputValue: 0,
              inputValue: 0,
              selectedSymbol: null
            });
            break;
        case 'DEL':
            if(!this.state.selectedSymbol){
              alert('In Progress not finished yet');
              // let inputValue = this.state.inputValue;
              // let len = this.state.lastInput.length;
              // let newVal;
              // if(len){
                // let newArray = this.state.lastInput.pop();
                // this.setState({
                //   this.state.lastInput: newArray,
                //   this.state.inputValue: Math.floor(newArray.join(""))
                // });

              // }
              // alert((this.state.inputValue / 10) - );
              // let newInputVal = ( this.state.inputValue - ((this.state.inputValue) * 10));
              // alert(newInputVal);
            }
            break;

      }
    }

    eval
}

module.exports = ReactCalci;
