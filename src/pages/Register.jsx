import { useState } from "react";
import InputField from "../components/auth/InputField";
import Button from "../components/auth/Button";
import { useNavigate } from "react-router-dom";
import { register } from "../config/services";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("Please fill in all fields before registering.");
      return;
    }
    setLoading(true);
    try {
      const data = await register(form);
      setLoading(false);
      navigate("/");
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  if(loading) {
    return(
      <div className="h-screen flex items-center justify-center bg-linear-to-br from-blue-100 via-white to-blue-50">
         <Loader message={"Registering..."}/>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center bg-linear-to-br from-blue-100 via-white to-blue-50">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-[400px] border border-gray-200">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Create Account
        </h1>

        <InputField
          label="Name"
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
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
          text="Register"
          onClick={handleRegister}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg mt-4 transition-all duration-200"
        />

        <p className="text-gray-600 text-sm mt-6 text-center">
          Already have an account?{" "}
          <span
            className="text-blue-600 hover:underline cursor-pointer font-medium"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
