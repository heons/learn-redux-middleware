import { handleActions } from 'redux-actions';
import * as api from '../lib/api';

// 액션 타입들을 선언합니다.
const GET_POST = 'sample/GET_POST';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'sample/GET_POST_FAILURE';

const GET_USERS = 'sample/GET_USERS';
const GET_USERS_SUCCESS = 'sample/GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'sample/GET_USERS_FAILURE';

export const getPost = id => async dispatch => {
    dispatch({ type: GET_POST});
    try {
        const response = await api.getPost(id);
        dispatch({
            type: GET_POST_SUCCESS,
            payload: response.data
        });
    } catch (e) {
        dispatch({
            type: GET_POST_FAILURE,
            payload: e,
            error: true
         });
        throw e;
    }
};

export const getUsers = () => async dispatch => {
    dispatch({ type: GET_USERS});
    try {
        const response = await api.getUsers();
        dispatch({
            type: GET_USERS_SUCCESS,
            payload: response.data
        });
    } catch (e) {
        dispatch({
            type: GET_USERS_FAILURE,
            payload: e,
            error: true
         });
        throw e;
    }
}

// 초기 상태를 선언합니다.
// 요청의 로딩중 상태는 loading 이라는 객체에서 관리합니다.

const initialState = {
    loading: {
        GET_POST: false,
        GET_USERS: false
    },
    post: null,
    users: null
};

const sample = handleActions(
  {
    [GET_POST]: state => ({
        ...state,
        loading: {
            ...state.loading,
            GET_POST: true
        }
    }),
    [GET_POST_SUCCESS]: (state, action) => ({
        ...state,
        loading: {
            ...state.loading,
            GET_POST: false
        },
        post: action.payload
    }),
    [GET_POST_FAILURE]: (state, action) => ({
        ...state,
        loading: {
            ...state.loading,
            GET_POST: false
        },
    }),
    [GET_USERS]: state => ({
        ...state,
        loading: {
            ...state.loading,
            GET_USERS: true
        }
    }),
    [GET_USERS_SUCCESS]: (state, action) => ({
        ...state,
        loading: {
            ...state.loading,
            GET_USERS: false
        },
        users: action.payload
    }),
    [GET_USERS_FAILURE]: (state, action) => ({
        ...state,
        loading: {
            ...state.loading,
            GET_USERS: false
        },
    })
  },
  initialState
);

export default sample;
