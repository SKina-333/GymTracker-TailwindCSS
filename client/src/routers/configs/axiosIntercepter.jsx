
import axios from "axios";
import { getUnixTime } from "date-fns";
import { useNavigate } from "react-router-dom";

// Create an Axios instance
const axiosInstance = axios.create();


// Request Interceptor: Automatically attach the token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("id_token");
  const expiresAt = parseInt(localStorage.getItem("expires_at"), 10);

  // Check token expiration before every request
  const currentDate = getUnixTime(new Date());
  if (token && currentDate < expiresAt) {
    config.headers["Authorization"] = token;
  }
  return config;
});


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token is invalid or expired, clear storage
      localStorage.removeItem("id_token");
      localStorage.removeItem("expires_at");
      const navigate = useNavigate();
      // Redirect to login
      navigate("/login")
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
