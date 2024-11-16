import { createBrowserRouter, Navigate } from "react-router-dom";

import App from "../App";
import Dashboard from "../components/Pages/Dashboard.jsx";
import Progress from "../components/Pages/Progress.jsx";
import Login from "../components/Pages/Login.jsx";

import ProtectedRoute from "./protectedRoute.jsx";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element:(<ProtectedRoute><Navigate to="/dashboard" replace /></ProtectedRoute>),
      },
      {
        path: "dashboard",
        element:(<ProtectedRoute><Dashboard /></ProtectedRoute>) ,
      },
      {
        path: "progress",
        element:(<ProtectedRoute><Progress /></ProtectedRoute>) ,
      },
    ],
  },
  {
    path:'/login',
    element:<Login/>
  }
]);

export default Router;
