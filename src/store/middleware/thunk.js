export function thunk({ getState, dispatch }) {
    return function wrapDispatch(next) {
        return function handleAction(action){
            if(typeof action === "function"){
                return action(dispatch, getState);
            }
            return next(action);
        }
    }
}