import { useState } from "react";
import {addDays, getUnixTime} from "date-fns"
import axios from "axios";
import {  useNavigate } from "react-router-dom";


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  
  const navigate = useNavigate();
 
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Username:", username);  // Check if username is correct
    console.log("Password:", password);  // Check if password is correct

    try {
      await axios
        .post("http://localhost:5000/user/login", {username,password}, {withCredentials:true})
        .then((res) => {
          if (res.data.success){
            const token = res.data.token;
            const expiresIn = res.data.expiresIn;

            const currentDate = new Date()
            const expiryDate = getUnixTime(addDays(currentDate, parseInt(expiresIn)))
            


            localStorage.setItem("id_token", token);
            localStorage.setItem("expires_at", expiryDate);

            navigate("/dashboard");
          }
        })
        .catch(err => console.error(err));
    } catch (error) {
      console.log(error)
    }
   
  };
  
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <p className="text-lime-300 text-4xl font-bold text-center">Gym Tracker</p>
          <h2 className="text-lime-300 mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Login Page
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-lime-300"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} 
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-lime-300"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update password state
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-lime-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
