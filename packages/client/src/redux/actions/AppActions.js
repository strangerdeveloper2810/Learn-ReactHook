import {ADD_COMMENTS} from "../types/AppTypes";
export const addCommentAction = userComment => ({
    type: ADD_COMMENTS,
    userComment
});