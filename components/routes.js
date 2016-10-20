/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
  Text,
  BackAndroid,
  DrawerLayoutAndroid,
  StyleSheet,
  View,
  DeviceEventEmitter,
} from 'react-native';

import { connect } from 'react-redux';
import { goto, goBack } from '../libs/routerUtils';
import { bindActionCreators } from 'redux';
import HomePage from './scenes/HomePage';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { mApi } from '../libs/Api';

import {
  actions as routerActions,
  NavBar,
  Route,
  Router,
  Schema,
  TabBar,
  TabRoute
} from './core/RouterLibrary';


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators( { ...routerActions }, dispatch),
  dispatch,
});
const mapStateToProps = state => ({
  router: state.router,
  // drawer: state.drawer,
});




import ReactCalci from './scenes/ReactCalci';


class AApplication extends Component{

  static contextTypes = {
    store: React.PropTypes.object.isRequired
  };

  static childContextTypes = {
    openDrawer: React.PropTypes.func,
    closeDrawer: React.PropTypes.func
  };

  constructor(){
    super();
  }

  render() {
    return (
      <Router initial="Welcome" {...this.props} ref="router" >

        <Schema name="default" />

        <Route name="Welcome" component={HomePage} title="HomePage" />
        <Route name="MyCalci" component={ReactCalci} title="Calculator"  />


      </Router>
    );
  }
}
// <Route name="GoogleLogin" component={GoogleLogin} title="GoogleLogin" sidebar={sidebar} />

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(AApplication);
