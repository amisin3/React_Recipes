import {
  SUCCESS_SEARCH_BY_INGREDIENT_REQUEST,
  POST_ERROR,
  SEARCH_VIDEO_API,
  SEARCH_VIDEO_ERROR,
} from "../actions/types";

const initialState = {
  data: [],
  video: null,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SUCCESS_SEARCH_BY_INGREDIENT_REQUEST:
      return {
        ...state,
        data: payload,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
      };
    case SEARCH_VIDEO_API:
      return {
        ...state,
        video: payload,
      };
    case SEARCH_VIDEO_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}
