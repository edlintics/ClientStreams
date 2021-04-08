/* eslint-disable import/no-anonymous-default-export */
import _ from 'lodash';
import {
    FETCH_STREAM,
    FETCH_STREAMS,
    CREATE_STREAM,
    EDIT_STREAM,
    DELETE_STREAM
} from '../actions/types';


export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_STREAMS:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        // to under stand the syntax, check key interpolation syntax
        case FETCH_STREAM:
            return {...state, [action.payload.id] : action.payload };
        case CREATE_STREAM:
            return {...state, [action.payload.id] : action.payload};
        case EDIT_STREAM:
            return {...state, [action.payload.id] : action.payload};
        
        //remove an object, check the conventio of create a new object from the documentation of modifying obejcts on redux
        case DELETE_STREAM:
            return _.omit(state, action.payload.id)
        
        default:
            return state;
    }
}