import { ADD_COMMENTS } from '../types/AppTypes';

export interface AppState {
  comments: string[];
}

export interface AppAction {
  type: string;
  userComment?: string;
}

const initialValue: AppState = {
  comments: [],
};

const AppReducer = (state = initialValue, action: AppAction): AppState => {
  switch (action.type) {
    case ADD_COMMENTS: {
      return {
        ...state,
        comments: [...state.comments, action.userComment!],
      };
    }
    default:
      return state;
  }
};

export default AppReducer;
