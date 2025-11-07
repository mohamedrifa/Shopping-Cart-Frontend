import { useState } from "react";
import InputField from "../components/auth/InputField";
import Button from "../components/auth/Button";
import { useNavigate } from "react-router-dom";
import { login } from "../config/services";
import Loader from "../components/Loader";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      alert("Please fill in all fields to login.");
      return;
    }
    setLoading(true);
    try {
      const data = await login(form);
      setLoading(false);
      navigate("/");
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-linear-to-br from-blue-100 via-white to-blue-50">
      { loading && (
        <div className="h-screen flex items-center justify-center absolute">
         <Loader message={"Logging In..."}/>
        </div>
        )
      }
      <div className="bg-white p-10 rounded-2xl shadow-lg w-[400px] border border-gray-200">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Welcome Back
        </h1>

        <InputField
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <InputField
          label="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <Button
          text="Login"
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg mt-4 transition-all duration-200"
        />

        <p className="text-gray-600 text-sm mt-6 text-center">
          New user?{" "}
          <span
            className="text-blue-600 hover:underline cursor-pointer font-medium"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
