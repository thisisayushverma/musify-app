import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { otpResendHandler, otpVerifyHandle } from "../features/auth";

const OtpPage: React.FC = () => {
  const location = useLocation();
  const { email } = location.state || {};
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(email === null || email === undefined){
      setError("Email not found");
      return;
    }
    if (otp.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }

    const response = await otpVerifyHandle({ email, otp }).catch((error) => {
      setError(error.message);
      console.log(error);
    });

    if(response){
      if (response.status === 201) {
        setSuccess("OTP verified successfully!");
        // navigate("/dashboard");
      } else if (response.status === 401) {
        setError(response.message);
      } else {
        setError(response.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e9d4b] px-4">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#121212] p-8 rounded-xl shadow-2xl w-full max-w-md text-white"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-[#1DB954]">
          OTP Verification
        </h1>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {success && (
          <p className="text-green-500 mb-4 text-center">{success}</p>
        )}

        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={handleChange}
          placeholder="Enter 6-digit OTP"
          className="w-full text-center tracking-widest bg-[#191414] border border-gray-700 p-3 rounded-md text-white mb-6 outline-none focus:ring-2 focus:ring-[#1DB954]"
        />

        <button
          type="submit"
          className="bg-[#1DB954] text-black font-semibold w-full py-3 rounded-lg hover:opacity-90 transition"
        >
          Verify
        </button>

        <p className="text-sm mt-6 text-center text-gray-400">
          Didn't receive OTP?{" "}
          <span className="text-[#1DB954] cursor-pointer hover:underline" onClick={() => {otpResendHandler(email);}}>
            Resend
          </span>
        </p>
      </motion.form>
    </div>
  );
};

export default OtpPage;
