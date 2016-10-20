import _ from 'lodash';

class RequestBody {

  constructor( obj ){
    _.extend( this, obj );
  }

  toString(){
    return JSON.stringify( this );
  }
}

export default RequestBody;
