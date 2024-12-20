import { StrictMode } from "react";
import { createRoot } from "react-dom/client";


import { RouterProvider } from "react-router-dom";
import Router from "./routers/navRouter.jsx";
import { WorkoutProvider } from "./components/contexts/workoutContext.jsx";

import("tailwindcss").Config;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WorkoutProvider>
      <RouterProvider router={Router} />
    </WorkoutProvider>
  </StrictMode>
);
