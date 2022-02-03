export function createStore( reducer, initialState ) {
    let state = initialState;
    let listeners = [];
  
    const getState = () => {
      return state;
    }
  
    function dispatch( action ) {
      state = reducer(state, action);
      listeners.forEach(l => {
        l();
      });
    }
  
    function subscribe(listener) {
      listeners.push(listener);
    }
  
    return {
      getState,
      dispatch,
      subscribe
    }
  }