export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company?: {};
}

export interface UserState {
  users: IUser[];
  error?: boolean;
}

export enum UserActionType {
  GET_USERS = "GET_USERS",
  DELETE_USER_BY_ID = "DELETE_USER_BY_ID",
  ADD_USER = "ADD_USER",
}

interface GetUserAction {
  type: UserActionType.GET_USERS;
  payload: IUser[];
  error: boolean;
}

interface DeleteUserAction {
  type: UserActionType.DELETE_USER_BY_ID;
  payload: { id: number };
}

interface AddUser {
  type: UserActionType.ADD_USER;
  payload: IUser[];
  error: boolean;
}

export type UserAction = GetUserAction | DeleteUserAction | AddUser;