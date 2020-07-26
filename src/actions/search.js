import {
  SUCCESS_SEARCH_BY_INGREDIENT_REQUEST,
  POST_ERROR,
  SEARCH_VIDEO_ERROR,
  SEARCH_VIDEO_API,
} from "./types";
import axios from "axios";

export const getRecipesByIngredient = ({ ingridient1 }) => async (dispatch) => {
  try {
    console.log({ ingridient1 });

    const res = await axios.get(
      `https://api.spoonacular.com/recipes/findByIngredients?apiKey=68dced1293014cada85c2e5c5d3d9b00&ingredients=${ingridient1}&number=9`
    );

    dispatch({
      type: SUCCESS_SEARCH_BY_INGREDIENT_REQUEST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err.data,
    });
  }
};

export const getVideoOfIngrdients = (recipeName) => async (dispatch) => {
  try {
    console.log("hello I am here at search action");

    const res = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?q=${recipeName}&key=AIzaSyDCy-ar9_4Tdu6oGQZN1VztMxrgE4gUA-Y&part=snippet&maxResults=1`
    );

    dispatch({
      type: SEARCH_VIDEO_API,
      payload: res.data.items[0],
    });
  } catch (err) {
    dispatch({
      type: SEARCH_VIDEO_ERROR,
      payload: err.data,
    });
  }
};
