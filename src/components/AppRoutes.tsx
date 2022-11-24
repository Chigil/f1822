import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Users from "../pages/Users";
import Posts from "../pages/Posts";
import Photos from "../pages/Photos";
import User from "../pages/User";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/users" element={<Users />}/>
            <Route path="/users/:id" element={<User />}/>
            <Route path="/posts" element={<Posts />}/>
            <Route path="/photos" element={<Photos />}/>
            {/* Albums*/}
            {/* Todos*/}
            <Route path="*" element={<Users />}/>
        </Routes>
    );
};

export default AppRoutes;