import {
  SET_LOADING,
  SET_LOADING_AVATAR,
  SET_DIALOG_LOADING,
  SET_LOADING_MESSAGE
} from "./../constants";

export const setLoading = (payload) => ({ type: SET_LOADING, payload });
export const setLoadingAvatar = (payload) => ({
  type: SET_LOADING_AVATAR,
  payload,
});
export const setDialogLoading = (payload) => ({
  type: SET_DIALOG_LOADING,
  payload,
});
export const setLoadingMessage = payload => ({
  type: SET_LOADING_MESSAGE,
  payload
})