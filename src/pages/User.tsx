import React, {useEffect, useState} from 'react';
import http from "../http";
import {useParams} from 'react-router-dom'
import {IUser} from "../components/Users/interfaces";
import Posts from "./Posts";

const User = () => {
    const [user, setUser] = useState<IUser>({
        id: 0,
        name: '',
        username: '',
        phone: '',
        email: '',
        website: ''
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
    }
    const updateUserInfo = async () => {
        const newUser = await http.put(`/users/${userId}`, user);
        setUser(newUser.data);
    }
    console.log(user);
    return (
        <div>
            <h1>I'am single cool User </h1>
            {Object.keys(user).map(field => {
                return <input value={user[field as keyof Omit<IUser, 'address' | 'company'>]}
                              onChange={event => setUser({...user, [field]: event.target.value})}
                />
            })}
            <Posts userId={userId} />
            <button className="btn btn-success" onClick={() => updateUserInfo()}>Update user info</button>
        </div>
    );
};

export default User;