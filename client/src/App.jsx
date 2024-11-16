import { useState } from "react";
import { Outlet } from "react-router-dom";

import "./App.css";



import Navbar from "./components/navbar.jsx";

function App() {

  

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
