import React, { SetStateAction } from "react";
import { IUser } from "./interfaces";
import http from "../../http";
import { Link } from "react-router-dom";

const UserCards = ({
  users,
  setUsers,
}: {
  users: IUser[];
  setUsers: React.Dispatch<SetStateAction<IUser[]>>;
}) => {
  const deleteUser = async (id: number) => {
    const confirm = window.confirm("Do you want delete this user?");
    if (confirm) {
      const deleteUser = await http.delete(`/users/${id}`);
      if (deleteUser.status === 200) {
        setUsers(users.filter((user) => user.id !== id));
      }
    }
  };
  return (
    <>
      {users.map((user) => (
        <div className="col" key={user.id}>
          <div className="card h-100">
            <div className="card-body">
              <Link to={`/users/${user.id}`}>
                <h5 className="card-title">{user.name}</h5>
              </Link>
              <p className="card-text">{user.username}</p>
              <p className="card-text">{user.email}</p>
              <p className="card-text">{user?.phone}</p>
              <p className="card-text">{user.website}</p>
            </div>
            <div className="card-footer">
              <button
                className="btn btn-danger"
                onClick={() => deleteUser(user.id)}
              >
                Delete this user
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default UserCards;
