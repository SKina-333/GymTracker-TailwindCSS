import { useState } from "react";
import { Outlet } from "react-router-dom";

import "./App.css";



import Navbar from "./components/navbar.jsx";

function App() {
  const [count, setCount] = useState(0);
  

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
