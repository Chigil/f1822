import React, {useMemo, useState} from 'react';
import {USERS} from './users';


const UserCards = () => {
    const [users, setUsers] = useState(USERS);
    const [search, setSearch] = useState<string>('');
    const [isShowEdit, setIsShowEdit] = useState<boolean>(false);

    const deleteUser = (id: number) => {
        const confirm = window.confirm('Do you want delete this user?');
        if (confirm) {
            setUsers(users.filter(user => user.id !== id));
        }
    }
    const searchedUsers = useMemo(() => {
        if (search) {
            return users.filter(user => user.username.toLowerCase().includes(search.toLowerCase()));
        }
        return users;
    }, [search, users]);

    return (
        <div className="row row-cols-1 row-cols-md-3 g-4 mt-5">
            <h1 className="text-center w-100">User cards</h1>
            <button className="btn btn-success" onClick={() => setIsShowEdit(!isShowEdit)}>Show Form for Add user
            </button>
            {isShowEdit &&
            <form>
                {/*<div>*/}
                {/*    {Object.keys(USERS[0]).map(field => <input id={field} placeholder={`Input user ${field}`}/>)}*/}
                {/*</div>*/}
                {/*get unique value with help input id!!!*/}
            </form>}
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
                            <p className="card-text">{user.phone}</p>
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