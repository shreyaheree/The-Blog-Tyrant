import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("../../pages/home/Home"));
const Login = lazy(() => import("../../pages/login/AdminLogin"));
const NotFound = lazy(() => import("../../pages/404/NotFound.tsx"));

const AdminRoutes = () => {
    return (
            <Route path={"admin/*"}>
            <Route index element={<Login />} />
            <Route path={"home"} element={<Home />} />
            </Route>
    );
}

export default AdminRoutes;