'use strict';

import React from 'react';
import {
  Text,
  Dimensions,
  View,
  TouchableHighlight,
} from 'react-native';
var {width, height} = Dimensions.get('window');
import Button from 'react-native-button';
import ReactCalci from './ReactCalci';

import { goto, goBack } from '../../libs/routerUtils';

var demo_img_url = 'http://www.myfashionlife.com/wp-content/uploads/2015/10/44.jpg';

class HomePage extends React.Component {
  constructor() {
    super();
  };

  _handlePress(calcii) {
    console.log('Pressed', calcii, this.context.store);
    goto( this.context.store, 'MyCalci');
  }


  render(){
    return (
      <View>
        <View style={{justifyContent: 'center', padding: 30}}>
              <Text style={{textAlign: 'center', color: 'red', fontSize: 30,  fontWeight: 'bold', margin: 10}}>Hemant Nagarkoti</Text>
              <Button onPress={this._handlePress.bind(this, 'calcii')}>Open Calculator</Button>
        </View>
      </View>
    )
  }
}

HomePage.contextTypes = {
  store: React.PropTypes.object.isRequired,
};

module.exports = HomePage;
