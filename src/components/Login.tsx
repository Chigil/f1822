import React, {ChangeEvent, FormEvent, useState} from 'react';
import http from "../http";

const Login = () => {
    const [loginData, setLoginData] = useState<{ username: string; password: string }>({
        username: 'mor_2314',
        password: '83r5^_'
    });

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const field = event.target.id;
        setLoginData({...loginData, [field]: event.target.value})
    }
    const login = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const isLoginData = await http.post('https://fakestoreapi.com/auth/login', loginData);
            if (isLoginData.data) {
                alert('Welcome!');
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <form className="row g-3" onSubmit={login}>
            <div className="col-auto">
                <label htmlFor="username" className="visually-hidden">Login</label>
                <input type="text"
                       className="form-control"
                       placeholder="Login"
                       id="username"
                       value={loginData.username}
                       onChange={onChange}
                />
            </div>
            <div className="col-auto">
                <label htmlFor="password" className="visually-hidden">Password</label>
                <input type="password"
                       className="form-control"
                       id="password"
                       placeholder="Password"
                       value={loginData.password}
                       onChange={onChange}
                />
            </div>
            <div className="col-auto">
                <button type="submit" className="btn btn-primary mb-3">Confirm identity</button>
            </div>
        </form>
    );
};

export default Login;