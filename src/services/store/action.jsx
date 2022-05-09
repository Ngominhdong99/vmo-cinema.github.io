import {
  GET_DATA,
  GET_ITEM,
  SET_STAR,
  SEARCH_DATA,
  ADD_USER,
  GET_USER,
  SET_CURRENT_USER,
  PICKED_MOVIE,
  ADD_MOVIE,
  UPDATE_MOVIE,
  DELETE_MOVIE,
} from "./Constant";

const apiUser = "http://localhost:3000/user";
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

export const addMovie = (payload) => async (dispatch) => {
  try {
    await fetch(apiMovie, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    dispatch({
      type: ADD_MOVIE,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateMovie = (payload) => async (dispatch) => {
  try {
    await fetch(apiMovie + "/" + payload.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    dispatch({
      type: UPDATE_MOVIE,
      payload: payload,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteMovie = (payload) => async (dispatch) => {
  try {
    await fetch(apiMovie + "/" + payload, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({
      type: DELETE_MOVIE,
      payload: payload,
    });
  } catch (error) {
    console.log(error);
  }
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

// User

export const getUser = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(apiUser);
      const datas = await response.json();
      dispatch({
        type: GET_USER,
        payload: datas,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const setCurrentUser = (payload) => ({
  type: SET_CURRENT_USER,
  payload,
});

export const addUser = (payload) => async (dispatch) => {
  try {
    await fetch(apiUser, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    dispatch({
      type: ADD_USER,
    });
  } catch (error) {
    console.log(error);
  }
};

// movie

export const setPickedMovie = (payload) => ({
  type: PICKED_MOVIE,
  payload,
});
