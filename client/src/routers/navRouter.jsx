import { createBrowserRouter, Navigate } from "react-router-dom";

import App from "../App";
import Dashboard from "../Components/Pages/Dashboard.jsx";
import Progress from "../Components/Pages/Progress.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "progress",
        element: <Progress />,
      },
    ],
  },
]);

export default router;
