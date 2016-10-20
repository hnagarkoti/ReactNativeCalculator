
export function drawer( state={}, action ){

  if( action.type === 'CHANGE_SIDEBAR' ){
    return {
      isActive: true,
      sidebar: action.payload,
    }
  } else if( ['ROUTER_POP', 'ROUTER_PUSH', 'ROUTER_CHANGE_TAB' ].indexOf( action.type ) > -1 ){
    return {
      isActive: false,
    }
  }

  return state;
};
