import {
  GET_DATA,
  GET_ITEM,
  SET_STAR,
  CURRENT_RATING,
  SEARCH_DATA,
  GET_USER,
  SET_USER,
  SET_CURRENT_USER,
  PICKED_MOVIE,
  GET_COMMENT,
} from "../store/Constant";

const initState = {
  datas: [],
  currentData: [],
  searchData: [],
  users: [],
  currentUser: [],
  pickedMovie: {
    id: null,
    movie_title: "",
    number_of_chap: "",
    director: "",
    img: "",
    nation: "",
    duration: "",
    rating: "",
    year: "",
    status: "",
    category: "",
    movie_description: "",
    link: "",
    view: {
      week: "",
      month: "",
    },
  },
  userInput: {
    userName: "",
    password: "",
    email: "",
    role: "",
    userImage: "./images/user.png",
  },
};

const movieReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        datas: action.payload,
      };

    case GET_ITEM:
      return {
        ...state,
        currentData: action.payload,
      };
    case PICKED_MOVIE:
      return {
        ...state,
        pickedMovie: action.payload,
      };
    // Rating
    case SET_STAR:
      const updateStar = state.datas.map((data) => {
        if (data.id === action.payload.id) {
          data.rating = action.payload.ratingValue;
        }
        return data;
      });
      return {
        ...state,
        datas: [...updateStar],
      };

    //
    case SEARCH_DATA:
      return {
        ...state,
        searchData: action.payload,
      };

    // USER
    case GET_USER:
      return {
        ...state,
        users: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        userInput: action.payload,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

    // Comment
    case GET_COMMENT:
      return {
        ...state,
        comments: action.payload,
      };
  }
  return state;
};

export default movieReducer;
