import React, {ChangeEvent, FormEvent, useMemo, useState} from 'react';
import {USERS} from './users';
import axios from "axios";
import {IUser} from "./interfaces";


const UserCards = () => {
    const initialValue = {
        name: '',
        username: '',
        phone: '',
        email: '',
        website: ''
    }

    const [users, setUsers] = useState<IUser[]>([]);
    const [userValue, setUserValue] = useState<any>(initialValue);
    const [search, setSearch] = useState<string>('');
    const [isShowEdit, setIsShowEdit] = useState<boolean>(false);
    const [newUserId, setNewUserId] = useState<number>(USERS.length + 1);

    const searchedUsers = useMemo(() => {
        if (search) {
            return users.filter(user => user.username.toLowerCase().includes(search.toLowerCase()));
        }
        return users;
    }, [search, users]);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const field = event.target.id;
        const value = event.target.value;
        setUserValue({...userValue, [field]: value});
    }

    const getAllUsers = async () => {

        // ASYNC AWAIT
        try {
            const responseData = await axios.get('https://jsonplaceholder.typicode.com/users');
            const users = responseData.data;
            setUsers(users);
        } catch (err) {
            alert(err);
        }
        // PROMISE
        // axios.get('https://jsonplaceholder.typicode.com/users').then(res => {
        //     console.log(res.data);
        //     setUsers(res.data)
        // });
    };

    const addUser = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const responseData = await axios.post('https://jsonplaceholder.typicode.com/users', userValue);
        if (responseData.data) {
            setUsers([...users, responseData.data]);
            setUserValue(initialValue);
        }
    }

    const deleteUser = async (id: number) => {
        const confirm = window.confirm('Do you want delete this user?');
        if (confirm) {
            const deleteUser = await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
            if (deleteUser.status === 200) {
                setUsers(users.filter(user => user.id !== id));
            }
        }
    }
    return (
        <div className="row row-cols-1 row-cols-md-3 g-4 mt-5">
            <h1 className="text-center w-100">User cards</h1>
            <button className="btn btn-success" onClick={() => getAllUsers()}>Get All users</button>
            <div>
                <button className="btn btn-success" onClick={() => setIsShowEdit(!isShowEdit)}>Show Form for Add user
                </button>
                {isShowEdit &&
                <form onSubmit={event => addUser(event)}>
                    {Object.keys(USERS[0]).map(field => {
                            if (field === "company" || field === "id" || field === "address") return
                            // Object.keys(USERS[0].company).map(companyField => <input placeholder={companyField}/>)
                            return <input className="form-control mt-2"
                                          key={field}
                                          required
                                          id={field}
                                          type={field === 'email' ? 'email' : 'text'}
                                          value={userValue[field]}
                                          placeholder={`Input user ${field}`}
                                          onChange={event => onChange(event)}
                            />
                        }
                    )}
                    <button className="btn btn-success mt-2" type="submit">Add User</button>
                </form>}
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Search</span>
                <input type="text"
                       className="form-control"
                       placeholder="Input username"
                       aria-label="Username"
                       aria-describedby="basic-addon1"
                       onChange={(event) => setSearch(event.target.value)}
                    // take out
                />
            </div>
            {searchedUsers.map(user =>
                <div className="col" key={user.id}>
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title">{user.name}</h5>
                            <p className="card-text">{user.username}</p>
                            <p className="card-text">{user.email}</p>
                            <p className="card-text">{user?.phone}</p>
                            <p className="card-text">{user.website}</p>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-danger"
                                    onClick={() => deleteUser(user.id)}
                            >
                                Delete this user
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserCards;