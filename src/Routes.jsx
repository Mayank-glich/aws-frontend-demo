import React from "react";
import { Link, Navigate, useRoutes } from "react-router-dom";

import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/user/Profile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/SignUp";
import CreateRepository from "./components/repo/CreateRepository";

import { useAuth } from "./AuthContext";

const ProjectsRoutes = () => {
  const { currentUser } = useAuth();
  const requireAuth = (element) =>
    currentUser ? element : <Navigate to="/auth" replace />;

  return useRoutes([
    {
      path: "/",
      element: requireAuth(<Dashboard />),
    },
    {
      path: "/auth",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/profile",
      element: requireAuth(<Profile />),
    },
    {
      path: "/create",
      element: requireAuth(<CreateRepository />),
    },
    {
      path: "/repo",
      element: requireAuth(<Dashboard />),
    },
    {
      path: "*",
      element: (
        <main>
          <h1>Page not found</h1>
          <Link to="/">Return to the dashboard</Link>
        </main>
      ),
    },
  ]);
};

export default ProjectsRoutes;
