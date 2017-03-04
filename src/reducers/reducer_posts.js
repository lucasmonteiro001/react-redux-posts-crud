/**
 * Created by lucas on 3/2/17.
 */
import {FETCH_POSTS, FETCH_POST, IS_FETCHING_POST} from '../actions/index';

const INITIAL_STATE = {all: [], post: null, fetching: false};

// SINGLE FUNCTION TO A REDUCER
export default function(state = INITIAL_STATE, action) {

    switch (action.type) {
        case FETCH_POST:
            return {...state, post: action.payload};
        case FETCH_POSTS:
            return {...state, all: action.payload};
        case IS_FETCHING_POST:
            return {...state, fetching: action.payload};
        default:
            return state;
    }

}
