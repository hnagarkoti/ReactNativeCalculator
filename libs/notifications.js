import { mApi } from './Api';
import PushNotification from 'react-native-push-notification';

export function configure() {
  PushNotification.configure({

    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function( data) {
      if( mApi.isLoggedIn() ){
        mApi.registerGcmId( data.token )
          .then( ()=>{
            console.log( 'Registered Gcm Id' );
          })
      }
      console.log( 'TOKEN:', data );
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
      if( notification.foreground ){
        PushNotification.localNotification({
          title: notification.title,
          message: notification.message,
          id: notification.id,
          imageUrl: notification.imageUrl,
        });
        mApi.emitter.emit( 'onReceiveNotification', notification );
      } else {
        mApi.updateNotification(notification.id).then(()=>{
          console.log( 'Notification marked as read', notification.id );
        })
      }
      console.log( 'Got Notification:', notification );
    },

    // ANDROID ONLY: (optional) GCM Sender ID.
    senderID: "306715739672",

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

  });
}


