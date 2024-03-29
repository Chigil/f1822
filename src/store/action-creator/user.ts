import http from "../../http";
import { IUser, UserAction, UserActionType } from "../types/user";
import { Dispatch } from "redux";

const { GET_USERS, DELETE_USER_BY_ID, ADD_USER } = UserActionType;

export const getAllUsers = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const responseData = await http.get("/users");
      const users = responseData.data;
      dispatch({ type: GET_USERS, payload: users, error: false });
    } catch (err) {
      dispatch({ type: GET_USERS, payload: [], error: true });
      throw "Error get all user";
    }
  };
};

export const addUser = (user: IUser) => {
  return async (dispatch: Dispatch<UserAction>) => {
    const responseData = await http.post("/users", user);
    try {
      dispatch({ type: ADD_USER, payload: responseData.data, error: false });
    } catch (err) {
      console.log(err);
      dispatch({ type: ADD_USER, payload: [], error: true });
      throw "Error for added User";
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
