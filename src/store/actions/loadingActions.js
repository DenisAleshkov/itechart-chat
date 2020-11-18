import { SET_LOADING, SET_LOADING_AVATAR } from "./../constants";

export const setLoading = (payload) => ({ type: SET_LOADING, payload });
export const setLoadingAvatar = (payload) => ({
  type: SET_LOADING_AVATAR,
  payload,
});
