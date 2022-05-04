import { GET_DATA, GET_ITEM, SET_STAR, SEARCH_DATA } from "./Constant";

const apiMovie = "http://localhost:3000/data";
export const getData = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(apiMovie);
      const datas = await response.json();
      dispatch({
        type: GET_DATA,
        payload: datas,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getItem = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3000/data/?id=${id}`);
      const data = await response.json();
      dispatch({
        type: GET_ITEM,
        payload: data[0],
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const setStar = (payload) => async (dispatch) => {
  // console.log(payload);
  try {
    await fetch(apiMovie + "/" + payload.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    dispatch({
      type: SET_STAR,
    });
  } catch (error) {
    console.log(error);
  }
};

export const setSearchData = (payload) => ({
  type: SEARCH_DATA,
  payload,
});
