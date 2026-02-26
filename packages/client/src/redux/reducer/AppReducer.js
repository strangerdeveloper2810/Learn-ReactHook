import { ADD_COMMENTS } from "../types/AppTypes";

const initialValue = {
  comments: [],
};

const AppReducer = (state = initialValue, action) => {
  switch (action.type) {
    case ADD_COMMENTS: {
      state.comments = [...state.comments, action.userComment];
      return { ...state };
    }
    default:
      return state;
  }
};

export default AppReducer;
