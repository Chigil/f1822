import React, { useEffect, useState } from "react";
import SearchUsers from "../components/Users/SearchUsers";
import { useSearch } from "../hooks/useSearch";
import { IUser } from "../components/Users/interfaces";
import UserCards from "../components/Users/UserCards";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import { getAllUsers } from "../store/action-creator/user";
import { useActionCreator } from "../hooks/useActionCreator";

const Users = () => {
  // const [users, setUsers] = useState<IUser[]>([]);
  const { users } = useSelector(
    (store: { user: { users: IUser[] } }) => store.user,
  );
  const { getAllUsers } = useActionCreator();
  const [search, setSearch] = useState<string>("");
  const [isShowEdit, setIsShowEdit] = useState<boolean>(false);
  const searchedUsers = useSearch(users, search, "name");
  console.log(getAllUsers);
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4 mt-5">
      <h1 className="text-center w-100">Page for all users</h1>
      <div>
        <button
          className="btn btn-success"
          onClick={() => setIsShowEdit(!isShowEdit)}
        >
          Show Form for Add user
        </button>
        {/*{isShowEdit && (*/}
        {/*  <AddUser*/}
        {/*    users={users}*/}
        {/*    setUsers={dispatch({ type: "GET_USERS", payload: users })}*/}
        {/*  />*/}
        {/*)}*/}
      </div>
      <SearchUsers setSearch={setSearch} />
      {users.length ? <UserCards users={searchedUsers} /> : <Loader />}
    </div>
  );
};

export default Users;