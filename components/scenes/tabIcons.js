import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Link from '../core/Link';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { goto, goBack } from '../../libs/routerUtils';

export  function BackOnlyTabbar( store ){
  return [
      {
        icon:{
          name: 'navigate-before',
          size: 42,
          color: '#ffffff',
          onPress: ()=>{ goBack( store )}
        },
      },
    ]
  };
export  function CloseOnlyTabbar( store ){
  return [
      {
        icon:{
          name: 'close',
          size: 30,
          color: '#ffffff',
          onPress: ()=>{ goBack( store )}
        },
      },
    ]
  };

export  function HomePageTabBar( store ){
  return [
      {
        icon:{
          name: 'home',
          size: 30,
          color: '#ffffff',
          onPress: ()=>{ goto(store, 'Welcome')}
        },
      },
      {
        icon:{
          name: 'sms',
          size: 28,
          color: '#ffffff',
          onPress: ()=>{ goto(store, 'alert')}
        },
      },
      {
        icon:{
          name: 'account-box',
          size: 30,
          color: '#ffffff',
          onPress: ()=>{ goto(store, 'profile')}
        },
      },
    ]
  };

export  function ProfileTabBar( store ){
  return [
      {
        icon:{
          name: 'navigate-before',
          size: 42,
          color: '#ffffff',
          onPress: ()=>{ goBack( store )}
        },
      },
      {
        icon:{
          name: 'sms',
          size: 28,
          color: '#ffffff',
          onPress: ()=>{ goto(store, 'alert')}
        },
      },
      {
        icon:{
          name: 'account-box',
          size: 30,
          color: '#ffffff',
          onPress: ()=>{ goto(store, 'profile')}
        },
      },
    ]
  };

export function LoginTabBar ( store ){
  return [
      {
        containerStyle:{
          // backgroundColor: '#ED1C26',
        },
        // icon:{
        //   name: 'lock-open',
        //   text: 'Sign In',
        //   size: 29,
        //   color: '#ffffff',
        //   onPress: ()=>{ goto(store, 'Blogs')}
        // },
        text: 'Sign In',
        textParams: {
          onPress: ()=>{ goto(store, 'SignUp')},
        },
        style: {
          fontSize: 20,
        },
      },
      {
        // icon:{
        //   name: 'person',
        //   text: 'Sign Up',
        //   size: 33,
        //   color: '#ffffff',
        //   justifyContent: 'center',
        //   onPress: ()=>{ goto(store, 'Blogs')}
        // },
        text: 'Sign Up',
        textParams: {
          onPress: ()=>{ goto(store, 'SignUp')},
        },
        style: {
          fontSize: 20,
        },
      }
    ]
  };

const styles = StyleSheet.create({
  profileTabItem1:{
    // flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor: '#fff', borderStyle: 'solid', borderBottomWidth: 1,
  },
  profileTabItem:{
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
    color: '#fff',
  },
  containerStyle:{
    flex: 1,
    backgroundColor: '#ED1C26',
    // borderColor: '#fff', borderStyle: 'solid', borderWidth: 0.4,
  },
  containerStyle1:{
    flex: 1,
    backgroundColor: '#BD1C24',
    // borderColor: '#fff', borderStyle: 'solid', borderWidth: 0.5,
  },
})

export function ProfilePageTabbar ( store ){
  return [
    (
      <View containerStyle={ styles.containerStyle1 }  style={styles.profileTabItem1} >
        <Icon name="timeline" size={25} color="#fff" />
        <Text style={styles.text} >Activity</Text>
      </View>
    ),
    (
    <Link to="favourite" containerStyle={ styles.containerStyle }  >
      <View style={styles.profileTabItem} >
        <Icon name="photo-library" size={25} color="#fff" />
        <Text style={styles.text}>Favourites</Text>
      </View>
    </Link>
    ),
    (
    <Link to="alert"  containerStyle={ styles.containerStyle }>
      <View   style={styles.profileTabItem} >
        <Icon name="error" size={25} color="#fff" />
        <Text style={styles.text}>Alerts</Text>
      </View>
    </Link>
    ),
  ]
};
