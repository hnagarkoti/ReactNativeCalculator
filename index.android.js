/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 import React, { Component } from 'react';
 import Routes from './components/routes.js';

 import {
   AppRegistry,
 } from 'react-native';

 import { Provider } from 'react-redux';
 import { reducer as router } from './components/core/RouterLibrary';
 import { drawer } from './libs/reducer.js';
 import { createStore, combineReducers, applyMiddleware } from 'redux';


 const reducer = combineReducers({
   router: router,
   // drawer: drawer,
 });

 let jsonReplacer = (k, v ) =>{
   if( v && v.type == 'ROUTER_CHANGE_TAB' ){
     return 'ROUTER_CHANGE_TAB Event not logged';
   }
   return v;
 }

 const logger = store => next => action => {
   console.log('dispatching', action.type  );
   let result = next(action)
   console.log('next state', store.getState() )
   return result
 }

 const store = createStore(reducer, applyMiddleware( logger ));


export default class ReactCalci extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
      );
  }
}


AppRegistry.registerComponent('ReactCalci', () => ReactCalci);
