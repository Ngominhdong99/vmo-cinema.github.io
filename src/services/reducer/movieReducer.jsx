import { GET_DATA, GET_ITEM, SET_STAR, SEARCH_DATA } from "../store/Constant";

const initState = {
  datas: [],
  currentData: [],
  searchData: [],
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
    case SET_STAR:
      const updateStar = state.datas.map((data) => {
        if (data.id === action.payload.id) {
          console.log(action.payload);
          data.rating = action.payload.ratingValue;
        }
        return data;
      });
      return {
        ...state,
        datas: [...updateStar],
      };
    case SEARCH_DATA:
      return {
        ...state,
        searchData: action.payload,
      };
  }
  return state;
};

export default movieReducer;
