
import _ from 'lodash';
import querystring from 'querystring';
import RequestBody from './RequestBody';
import EventEmitter from 'EventEmitter';

import config from '../../config';



const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};




class Api{

  constructor( config ){
    this.endPoint = config.endPoint;
    this.sessionId = null;
    this.user = null;
    this.appList = [];
    this.emitter = new EventEmitter();
  }

  setSessionData = function ( obj={} ) {
    this.user = obj.user;
    this.sessionId = obj.sessionId;
    if( obj.walkthroughSeen ){
      this.walkthroughSeen = obj.walkthroughSeen;
    }
  }

  isLoggedIn(){
    return this.sessionId && this.user;
  }

  /**
   * Do a web request to any url. A general purpose method.
   *
   * @param {String} url - url
   * @param {String} method - method
   * @param {Object} query - query
   * @param {Object} body - body
   * @param {Object} headers - headers
   * @returns {undefined}
   */
  genericRequest( url, method="GET", query={}, body={}, headers=defaultHeaders ){
    let opts = {
      method: method,
      headers, headers,
      credentials: 'omit',
    };

    if( ['POST', 'PUT', 'PATCH'].indexOf( method) !== -1 ){
      opts.body = body
    }

    // url += '?' + querystring.stringify( query );
    console.log('inside genericRequest fun:- url:-- ', url, 'opts:- ', opts);
    return fetch( url, opts );
  }



  /**
   * Do an Api request.
   *
   * @param {String} path - Api action path. eg `/users/123`
   * @param {String} method - method
   * @param {Object} query - query
   * @param {Object} body - body
   * @param {Object} headers - headers
   * @returns {Object} response body as a json object
   */
  request( path, method="GET", query={}, body={}, headers={} ){
    let url = this.endPoint + path;
    body = new RequestBody( body ) + '';
    console.log('url:--- ', url);
    headers['Accept'] = 'application/json';
    headers['Content-Type'] = 'application/json';
    if(this.sessionId){
      headers['X-Sessionid'] = this.sessionId;
    }
    return this.genericRequest( url, method, query, body, headers )
    .then( ( res ) =>{
      console.log('res:-- ', res);
     return res.text();
   })
    .then( ( text )=>{
      let out = JSON.parse( text );
      if( !out.success ){
        return Promise.reject( new Error( out.message ) );
      }
      return out;
    })
    .catch( (e)=>{
      console.log( 'Api request failed', e, path, method, query, body, headers );
      throw e;
    });
  }


  // TODO: Implement
  /*
   * Do login using agentId and password
   */
  login(email, password){
    return this.request( '/login','POST',{},{
      email: email,
      password: password
    });
  }


  // TODO: Implement
  /*
   * Get Users profile
   */
  getProfile(url='/profile'){
    return this.request(url,'GET');
  }

  updateProfile( data ){
    return this.request('/profile', 'PUT', {}, data );
  }


  // TODO: Implement
  /*
   * Get List of Categories
   */
  getCategories(url='/categories'){
    return this.request(url);
  }
  // TODO: Implement
  /*
   * Get List of Sub Categories
   */
  getSubCategories( parentId ){
    return this.request('/categories', 'GET', { parentId: parentId} );
  }

  getAllCollateral( id ){
    return this.request('/collaterals', 'GET', { collateralId: id} );
  }
  getCollateralImage( id ){
    return this.request('/collaterals/'+id, 'GET' );
  }


  // TODO: Implement
  /*
   * Get list of collaterals of a category
   */
  getCollaterals( CategoryId){
    return this.request('/collaterals', 'GET', { CategoryId: CategoryId} );

  }

  getCreative( creativeId ){
    return this.request('/creatives/' + creativeId );
  }

  getCollateral( creativeId ){
    return this.request('/creatives/' + creativeId );
  }

  getFavourites(){
    return this.request('/starredCollaterals');
  }

  getHelpScreens(){
    return this.request('/');
  }

  addFavourites( agentId, CollateralId ){
    return this.request( '/starredCollaterals','POST',{},{
      AgentId: agentId,
      CollateralId: CollateralId
    });
  }
changeProfilePicture(file){
  return this.request('/changeProfilePicture','POST',{},{
    profilePicture:file.data,
    fileName : file.fileName
  })
}
  registerGcmId( token ){
    return this.request( '/gcmSession', 'POST', {}, {
      clientId: token,
    });
  }

  ChangeNotification( val ){
    return this.request('/changePushNotificationSetting', 'POST', {}, {
      pushNotificationsEnabled: val,
    });
  }

  removeFavourites( id ){
    return this.request('/starredCollaterals/'+id, 'DELETE' );
  }

  getHealthReadStuff( id ){
    return this.request('/SubCategories?categoryId='+id, 'GET');
  }
 deleteNotification(id){
    return this.request('/notification/'+id, 'DELETE');
  }
   updateNotification(id){
    return this.request('/notification/'+id, 'PUT', {}, { isRead: true });
  }
  shareCount(id, txt){
    return this.request('/sharedCollaterals','POST',{},{
      CollateralId: id,
      info: txt
    });
  }
  getActivity(){
    return this.request('/sharedCollaterals', 'GET');
  }

  sentRegistrationOTP( agentId, mobile ){
    return this.request( '/sent-registration-otp', 'POST', {}, {
      agentId: agentId,
      mobile: mobile,
    });
  }

  verifyAgent( agentId ){
    return this.request( '/verify-agent', 'POST', {}, {
      agentId: agentId
    });
  }

  verifyOtp( mobile, otp ){
    return this.request( '/changePassword', 'POST', {}, {
      isVerifying: true,
      mobile: mobile,
      otp: otp
    });
  }

  doRegister( data ){
    return this.request( '/changePassword', 'POST', {}, data );
  }

}

let mApi = new Api( config.api );

export default Api;
export { mApi };
