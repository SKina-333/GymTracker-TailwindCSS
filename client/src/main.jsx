import { StrictMode } from "react";
import { createRoot } from "react-dom/client";


import { RouterProvider } from "react-router-dom";
import router from "./routers/navRouter.jsx";
import { WorkoutProvider } from "./components/contexts/workoutContext.jsx";

import("tailwindcss").Config;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WorkoutProvider>
      <RouterProvider router={router} />
    </WorkoutProvider>
  </StrictMode>
);
