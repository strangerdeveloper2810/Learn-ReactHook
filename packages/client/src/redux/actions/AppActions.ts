import { ADD_COMMENTS } from '../types/AppTypes';

export const addCommentAction = (userComment: string) => ({
  type: ADD_COMMENTS,
  userComment,
});
