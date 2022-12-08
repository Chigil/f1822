import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Context from "../context/context";

const Navigation = () => {
  const { isLogin, setIsLogin } = useContext(Context);
  const [isShow, setIsShow] = useState(false);
  const currentLocation = useLocation();
  const routes = [
    {
      path: "/users",
      name: "Users",
    },
    {
      path: "/posts",
      name: "Posts",
    },
    {
      path: "/photos",
      name: "Photos",
    },
  ];
  const logout = () => {
    localStorage.clear();
    setIsLogin(false);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <div>
          <button
            className="navbar-toggler float-start"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span
              className="navbar-toggler-icon"
              onClick={() => setIsShow(!isShow)}
            />
          </button>
        </div>
        {isLogin ? (
          <>
            <div
              className={`collapse navbar-collapse ${isShow && "show"}`}
              id="navbarNav"
            >
              <ul className="navbar-nav">
                {routes.map((route) => (
                  <li className="nav-item" key={route.path}>
                    <Link
                      className={`nav-link ${
                        route.path === currentLocation.pathname && "active"
                      }`}
                      to={route.path}
                    >
                      {route.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <button
              className="btn btn-outline-secondary"
              type="submit"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="login" className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
