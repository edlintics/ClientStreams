import streams from '../api/streams'
import history from '../history'
import { 
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
} from './types'

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
}


export const createStream = formValues =>  async (dispatch, getState) => {
    // when we make a post request, the server response with data of newly created object
    // we need to capture that object and store data
    const {userId} = getState().auth; // since the userId is stored as auth in the redux store, we can use getSate to query the userId from teh auth object

    const response = await streams.post('/streams', {...formValues, userId} );
    // create a new formvalue from the one submited by user  + usedID query from getState

    dispatch({ type: CREATE_STREAM, payload:response.data })
    // Do some programatic navigation to get the user back to the main route if it is able to create the stream
    history.push('/')
}

export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams')

    dispatch({type: FETCH_STREAMS, payload: response.data})
}

export const fetchStream = (id) => async dispatch => {
    const response = await streams.get(`/streams/${id}`);

    dispatch({ type: FETCH_STREAM, payload: response.data });
};

export const editStream = (id, formValues) =>  async dispatch => {
    const response = await streams.patch(`/streams/${id}`, formValues)

    dispatch({type: EDIT_STREAM, payload: response.data})
    history.push('/')
}

export const deleteStream = (id) => async dispatch => {
    // since delete has no response, no response variable
    await streams.delete(`/streams/${id}`)

    dispatch({ type: DELETE_STREAM, payload: id})
    history.push('/')

}