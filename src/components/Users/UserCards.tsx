import React from "react";
import { IUser } from "./interfaces";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteUser } from "../../store/action-creator/user";

const UserCards = ({ users }: { users: IUser[] }) => {
  const dispatch = useDispatch();
  const deleteCurrentUser = bindActionCreators(deleteUser, dispatch);
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
                onClick={() => deleteCurrentUser(user.id)}
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
