import axios from 'axios';

export const FETCH_POST = 'FETCH_POST';
export const IS_FETCHING_POST = 'IS_FETCHING_POST';
export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const DELETE_POST = 'DELETE_POST';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=klj32kljfs83ijkjl;kasdp8rnvadf';

const startFetching = dispatch => dispatch({
    type: IS_FETCHING_POST,
    payload: true
});

const finishFetching = dispatch => dispatch({
    type: IS_FETCHING_POST,
    payload: false
});

export function fetchPosts() {

    const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

    return (dispatch) => {

        startFetching(dispatch);

        request
            .then(({data}) => {

                dispatch({
                    type: FETCH_POSTS,
                    payload: data
                });

                finishFetching(dispatch);
            });

    }

}

export function createPost(props) {

    const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, props);

    return {
        type: CREATE_POST,
        payload: request
    }
}

export function fetchPost(id) {

    const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

    return (dispatch) => {

        startFetching(dispatch);

        request
            .then(({data}) => {

                dispatch({
                    type: FETCH_POST,
                    payload: data
                });

                finishFetching(dispatch);
            });

    };
}

export function deletePost(id) {

    const request = axios.delete(`${ROOT_URL}/posts/${id}{API_KEY}`);

    return {
        type: DELETE_POST,
        payload: request
    }

}