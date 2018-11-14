import { SHOW_LOADING } from '../ActionTypes';

export const showLoading = value => {
    return dispatch => {
        dispatch({
            type: SHOW_LOADING,
            payload: value
        });
    };
};
