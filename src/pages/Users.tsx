import React, { useEffect, useState } from "react";
import SearchUsers from "../components/Users/SearchUsers";
import { useSearch } from "../hooks/useSearch";
import UserCards from "../components/Users/UserCards";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import { getAllUsers } from "../store/action-creator/user";
import { useActionCreator } from "../hooks/useActionCreator";
import { IUser } from "../store/types/user";
import AddUser from "../components/Users/AddUser";
import { useToast } from "../components/Toast/ToastProvider";

const Users = () => {
  const { users, error } = useSelector(
    (store: { user: { users: IUser[] , error: false }}) => store.user,
  );
  console.log(error);
  const { getAllUsers } = useActionCreator();
  const { toast } = useToast();
  const [search, setSearch] = useState<string>("");
  const [isShowEdit, setIsShowEdit] = useState<boolean>(false);
  const searchedUsers = useSearch(users, search, "name");
  useEffect(() => {
    getAllUsers();
    if (error) return toast('Error get All users', 'error');
  }, [error]);
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
        {isShowEdit && (
          <AddUser />
        )}
      </div>
      <SearchUsers setSearch={setSearch} />
      {users.length ? <UserCards users={searchedUsers} /> : <Loader />}
    </div>
  );
};

export default Users;
