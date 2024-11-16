
import {  getUnixTime } from "date-fns";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("id_token");
  const expires_in = localStorage.getItem("expires_at");

  if (token && expires_in) {
    const currentDate = getUnixTime(new Date());
    if (currentDate < parseInt(expires_in)) {
      

      return children;
    } else {
      localStorage.removeItem("id_token");
      localStorage.removeItem("expires_at");
      return <Navigate to="/login" />;
    }
  }

  return <Navigate to="/login" />;
}
export default ProtectedRoute;