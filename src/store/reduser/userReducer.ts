export const userReducer = (
  state = { users: [] },
  action: { type: string; payload: any },
) => {
  switch (action.type) {
    case "GET_USERS":
      return { users: action.payload };
    case "DELETE_USER_BY_ID":
      return {
        users: state.users.filter(
          (user: { id: number }) => user.id !== action.payload,
        ),
      };
    default:
      return state;
  }
};
