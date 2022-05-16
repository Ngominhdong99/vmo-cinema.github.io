import {
  GET_DATA,
  SEARCH_DATA,
  GET_ITEM,
  ADD_STAR,
  SET_STAR,
  CURRENT_RATING,
  GET_USER,
  SET_USER,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  SET_CURRENT_USER,
  PICKED_MOVIE,
  ADD_MOVIE,
  UPDATE_MOVIE,
  DELETE_MOVIE,
  GET_COMMENT,
  ADD_COMMENT,
  DELETE_COMMENT,
} from "./Constant";

const apiUser = "http://localhost:3000/user";
const apiMovie = "http://localhost:3000/data";
const apiComment = "http://localhost:3000/comment";
const apiRate = "http://localhost:3000/rate";
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

export const setPickedMovie = (payload) => ({
  type: PICKED_MOVIE,
  payload,
});

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
// rate
export const addStar = (payload) => async (dispatch) => {
  try {
    await fetch(apiRate, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    dispatch({
      type: ADD_STAR,
    });
  } catch (error) {
    console.log(error);
  }
};

export const setStar = (payload) => async (dispatch) => {
  try {
    await fetch(apiRate + "/" + payload.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    dispatch({
      type: SET_STAR,
      payload,
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

export const setCurrentUser = (user) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3000/user/?id=${user.id}`);
      const data = await response.json();
      dispatch({
        type: SET_CURRENT_USER,
        payload: data[0],
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const setUser = (payload) => ({
  type: SET_USER,
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

export const updateUser = (payload) => async (dispatch) => {
  try {
    await fetch(apiUser + "/" + payload.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    dispatch({
      type: UPDATE_USER,
      payload: payload,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = (payload) => async (dispatch) => {
  try {
    await fetch(apiUser + "/" + payload, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({
      type: DELETE_USER,
      payload: payload,
    });
  } catch (error) {
    console.log(error);
  }
};

// comment

export const getComment = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(apiComment);
      const comments = await response.json();
      dispatch({
        type: GET_COMMENT,
        payload: comments,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addComment = (payload) => async (dispatch) => {
  try {
    await fetch(apiComment, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    dispatch({
      type: ADD_COMMENT,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = (payload) => async (dispatch) => {
  try {
    await fetch(apiComment + "/" + payload, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({
      type: DELETE_COMMENT,
      payload: payload,
    });
  } catch (error) {
    console.log(error);
  }
};
