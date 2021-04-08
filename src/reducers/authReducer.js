/* eslint-disable import/no-anonymous-default-export */
import { SIGN_IN, SIGN_OUT} from '../actions/types'

// capitalize syntax is not to modify the instance in any circumsyance
const INITIAL_STATE = {
    isSignedIn: null,
    userId: null
}
// record state of user authentication 
export default (state = INITIAL_STATE, action ) => {
    switch (action.type) {
        case SIGN_IN:
            return {...state, isSignedIn: true, userId: action.payload}
        case SIGN_OUT:
            return {...state, isSignedIn: false, userId: null}
        default:
            return state;
    }
}