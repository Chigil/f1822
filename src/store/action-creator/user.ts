import http from "../../http";
import { UserAction, UserActionType } from "../types/user";
import { Dispatch } from "redux";

const { GET_USERS, DELETE_USER_BY_ID } = UserActionType;

export const getAllUsers = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const responseData = await http.get("/users");
      const users = responseData.data;
      dispatch({ type: GET_USERS, payload: users });
    } catch (err) {
      alert(err);
    }
  };
};

export const deleteUser = (id: number) => {
  return async (dispatch: Dispatch<UserAction>) => {
    const confirm = window.confirm("Do you want delete this user?");
    if (confirm) {
      const deleteUser = await http.delete(`/users/${id}`);
      if (deleteUser.status === 200) {
        dispatch({ type: DELETE_USER_BY_ID, payload: { id } });
      }
    }
  };
};
