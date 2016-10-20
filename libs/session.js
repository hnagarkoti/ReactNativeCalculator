
import {  AsyncStorage, ToastAndroid, NativeModules } from 'react-native';
import { mApi } from './Api';

const { Share } = NativeModules;

async function getSessionData(){
  let result = await AsyncStorage.multiGet(['sessionId', 'user', 'walkthroughSeen' ]);
  let out = {};
  result.forEach((v)=>{ out[v[0]] = v[1]; });
  out.user = JSON.parse( out.user );
  return out;
}

export function setSessionData( data ){
  return Promise.all(
    AsyncStorage.setItem( 'sessionId', data.sessionId ),
    AsyncStorage.setItem( 'user', JSON.stringify( data.user ) )
  );
}

function deleteSessionData(){
  return AsyncStorage.multiRemove( ['sessionId', 'user']);
}

export async function initialize(){
  let data = await getSessionData();
  let appList = await Share.getAppList( 'image/jpeg' );
  let cacheDir = await Share.getCacheDir();
  mApi.cacheDir = cacheDir;
  appList.forEach((v)=> mApi.appList.push(v) );
  mApi.setSessionData(data);
  return data.sessionId;
}

export function login( email, password ){
  return mApi.login(email, password).then(function(result) {
    mApi.setSessionData( result.data );
    ToastAndroid.show('Successfully Logged In',ToastAndroid.SHORT );
    return setSessionData( result.data );
  });
}

export function logout(){
  mApi.setSessionData();
  return deleteSessionData();
}

export function setWalkthroughSeen(){
  return AsyncStorage.setItem( 'walkthroughSeen', 'true' );
}
