import React, { useState } from "react";
import { registerHandle } from "../features/auth";
import { useNavigate } from "react-router-dom";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    console.log("Registering user:", formData);
    // TODO: Dispatch register thunk or call API
    const response = await registerHandle(formData).catch((error) => {
      setError(error.message);
      console.log(error);
    });

    if (response) {
      console.log(response);
      if (response.status === 201) {
        setSuccess("Registration successful!");
        navigate("/verify-otp",{state:{email:formData.email}});
      } else if (response.status === 400) {
        setError(response.message);
      } else {
        setError(response.message);
      }
    }

    // Reset form
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e9d4b] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1e1e1e] p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-[#1DB954] mb-6 text-center">
          Sign Up for Musify
        </h2>

        {error && <p className="text-red-600 mb-2">{error}</p>}
        {success && <p className="text-green-600 mb-2">{success}</p>}

        <div className="mb-4">
          <label className="block mb-1 text-[#b3b3b3]">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-[#333] bg-[#121212] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-[#b3b3b3]">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-[#333] bg-[#121212] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-[#b3b3b3]">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-[#333] bg-[#121212] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#1DB954] text-black font-semibold py-2 px-4 rounded hover:bg-[#1ed760] transition"
        >
          Register
        </button>

        <div
          onClick={() => navigate("/login")}
          className="mt-4 text-center text-sm text-white hover:underline cursor-pointer"
        >
          Already have an account? Login
        </div>
      </form>
    </div>
  );
};

export default Register;
