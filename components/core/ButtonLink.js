import React, { Component } from 'react';
import { Card, Button, Avatar } from 'react-native-material-design';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { goto, goBack } from '../../libs/routerUtils';




class ButtonLink extends Component {

  constructor() {
    super();
    this.gotoButton = this.gotoButton.bind(this);
  }

  static defaultProps = {
    style: { }
  }

  static contextTypes = {
    store: React.PropTypes.object.isRequired
  }

  gotoButton() {
    let target = this.props.to;
    let params = this.props.params || {};
    goto( this.context.store, target, params );
  }

  render() {
    return (
      <Button text={ this.props.name } raised={ true } onPress={ this.gotoButton } />
      );
  }
}

module.exports = ButtonLink;
