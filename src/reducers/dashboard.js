import {
  CALL_API,
  POST_ERROR,
  RECIPE_DETAIL,
  TOGGLE_LOADING,
  DASHBOARD_VIDEO_API,
  DASHBOARD_VIDEO_ERROR,
} from "../actions/types";

const initialState = {
  loading: true,
  singleRecipe: null,
  video: null,
  allRecipe: {},
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CALL_API:
      return {
        ...state,
        allRecipe: payload,
        loading: false,
      };
    case RECIPE_DETAIL:
      return {
        ...state,
        singleRecipe: payload,
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case TOGGLE_LOADING:
      return {
        ...state,
        loading: payload,
      };
    case DASHBOARD_VIDEO_API:
      return {
        ...state,
        video: payload,
      };
    case DASHBOARD_VIDEO_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}
