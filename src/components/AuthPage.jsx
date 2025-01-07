import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthPage = ({ setIsLoggedIn }) => {

  const [form, setForm] = useState({ email: "", password: "" });
  const [isSignup, setIsSignup] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isSignup
      ? "https://backendv3-wmen.onrender.com/admin-auth/register"
      : "https://backendv3-wmen.onrender.com/admin-auth/login";

    try {
      const response = await axios.post(url, form);
      if (!isSignup) {
        localStorage.setItem("token", response.data.token);
        setIsLoggedIn(true); // Set login state to true
        navigate("/dashboard"); // Navigate to dashboard on successful login
      } else {
        setMessage("Admin created successfully.");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleSubmit}
          className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
        >
          <h1 className="mb-4 text-xl font-bold text-center">
            {isSignup ? "Sign Up" : "Log In"}
          </h1>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-3 py-2 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-3 py-2 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          >
            {isSignup ? "Sign Up" : "Log In"}
          </button>
          <p
            onClick={() => setIsSignup(!isSignup)}
            className="mt-4 text-sm font-medium text-blue-500 cursor-pointer"
          >
            {isSignup
              ? "Already have an account? Log In"
              : "Don't have an account? Sign Up"}
          </p>
        </form>
        {message && (
          <p className="mt-2 text-sm font-semibold text-center text-red-600">
            {/* {message} */}
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
