
export function goto( store, name, params={}, isReplace=false ){
  store.dispatch({
    type: isReplace? 'ROUTER_REPLACE' : 'ROUTER_PUSH',
    payload: {
      name: name,
      data: params
    }
  });
}

export function goBack( store ){
  return store.dispatch({
    type: 'ROUTER_POP',
    payload:{}
  });
}

export function reset( store, name ){
  return store.dispatch({
    type: 'ROUTER_RESET',
    payload:{
      name: name
    }
  });
}
