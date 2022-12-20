import React, { useEffect, useState } from "react";
import http from "../http";
import { useParams } from "react-router-dom";

import Posts from "./Posts";
import { IUser } from "../store/types/user";

const User = () => {
  const [user, setUser] = useState<IUser>({
    id: 0,
    name: "",
    username: "",
    phone: "",
    email: "",
    website: "",
  });
  const params = useParams();
  const userId = params.id ? +params.id : 0;
  useEffect(() => {
    getAllUserDataById();
  }, []);
  const getAllUserDataById = async () => {
    const userData = await http.get(`/users/${userId}`);
    setUser(userData.data);
    //get posts comments
  };
  const updateUserInfo = async () => {
    const newUser = await http.put(`/users/${userId}`, user);
    setUser(newUser.data);
  };
  console.log(user);
  return (
    <div>
      <h1>User: {user.username} user info:</h1>
      <div className="card col-sm-6">
        {Object.keys(user).map((field) => {
          return (
            <input
              className="form-control"
              value={user[field as keyof Omit<IUser, "address" | "company">]}
              onChange={(event) =>
                setUser({ ...user, [field]: event.target.value })
              }
            />
          );
        })}
      </div>
      <button className="btn mt-2 btn-success" onClick={() => updateUserInfo()}>
        Update user info
      </button>
      <Posts userId={userId} />
    </div>
  );
};

export default User;
