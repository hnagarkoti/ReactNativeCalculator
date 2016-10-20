import React, { Component } from 'react';
import { goto, goBack } from '../../libs/routerUtils';

import { StyleSheet, TouchableOpacity, View } from 'react-native';


// TODO: Fix this
let Actions = {};


class Link extends Component {

  constructor() {
    super();
    this.gotoLink = this.gotoLink.bind(this);
  }

  static defaultProps = {
    style: { }
  }

  static contextTypes = {
    store: React.PropTypes.object.isRequired
  }

  gotoLink() {
    let target = this.props.to;
    let params = this.props.params || {};
    goto( this.context.store, target, params );
  }

  render() {
    return (
      <TouchableOpacity onPress={ this.gotoLink } style={this.props.style}>
        { this.props.children }
      </TouchableOpacity>
      );
  }
}


module.exports = Link;
