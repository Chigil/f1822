import { UserAction, UserActionType, UserState } from "../types/user";

const { GET_USERS, DELETE_USER_BY_ID, ADD_USER } = UserActionType;

export const userReducer = (
  state: UserState = { users: [], error: false },
  action: UserAction,
) => {
  switch (action.type) {
    case GET_USERS:
      return { users: action.payload, error: action.error };
    case ADD_USER:
      return {
        users: [...state.users, action.payload],
        error: action.error
      };
    case DELETE_USER_BY_ID:
      return {
        users: state.users.filter(
          (user: { id: number }) => user.id !== action.payload.id,
        ),
      };
    default:
      return state;
  }
};
