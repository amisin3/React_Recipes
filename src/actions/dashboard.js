import {
  CALL_API,
  POST_ERROR,
  RECIPE_DETAIL,
  TOGGLE_LOADING,
  DASHBOARD_VIDEO_ERROR,
  DASHBOARD_VIDEO_API,
} from "./types";
import axios from "axios";

export const getRandomRecipes = (productname) => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${productname}&number=9&apiKey=68dced1293014cada85c2e5c5d3d9b00`
    );

    dispatch({
      type: CALL_API,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err.data,
    });
  }
};

export const getVideo = (recipeName) => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?q=${recipeName}&key=AIzaSyDCy-ar9_4Tdu6oGQZN1VztMxrgE4gUA-Y&part=snippet&maxResults=1`
    );

    dispatch({
      type: DASHBOARD_VIDEO_API,
      payload: res.data.items[0],
    });
  } catch (err) {
    dispatch({
      type: DASHBOARD_VIDEO_ERROR,
      payload: err.data,
    });
  }
};

export const getRecipesDetail = (productId) => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://api.spoonacular.com/recipes/${productId}/information?apiKey=68dced1293014cada85c2e5c5d3d9b00`
    );

    dispatch({
      type: RECIPE_DETAIL,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err.data,
    });
  }
};

export const toggleLoading = () => async (dispatch) => {
  dispatch({
    type: TOGGLE_LOADING,
    payload: true,
  });
};
