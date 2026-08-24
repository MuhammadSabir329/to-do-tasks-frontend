import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "./store/authSlice";

export default function SignIn({ onSwitchToSignUp }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="fixed inset-0 bg-[#1c1c1c] flex items-center justify-center z-50">
      <div className="w-90 bg-[#2d3033] rounded-xl p-5 shadow-2xl flex flex-col gap-3 text-white">
        <div className="text-center flex flex-col gap-1">
          <h2 className="text-xl font-bold text-white">
            Sign in to your account
          </h2>
          <p className="text-xs text-[#9aa0a6]">
            Welcome back! Please enter your details.
          </p>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1 text-left">
            <label
              htmlFor="email"
              className="text-xs font-medium text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#3c4043] text-white px-3 py-2 rounded-t-md border-b-2 border-transparent focus:border-[#a8c7fa] outline-none transition-colors placeholder:text-[#9aa0a6] text-sm"
              required
            />
          </div>
          <div className="flex flex-col gap-1 text-left">
            <label
              htmlFor="password"
              className="text-xs font-medium text-gray-300"
            >
              Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#3c4043] text-white pl-3 pr-10 py-2 rounded-t-md border-b-2 border-transparent focus:border-[#a8c7fa] outline-none transition-colors placeholder:text-[#9aa0a6] text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-[#9aa0a6] hover:text-white transition-colors"
              >
                {showPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.75}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.75}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.75}
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-medium py-2.5 rounded-lg transition-colors duration-150 shadow-md focus:outline-none focus:ring-2 focus:ring-[#a8c7fa] mt-2"
          >
            Sign in
          </button>
        </form>
        <div className="text-center text-xs text-[#9aa0a6] mt-1">
          Don't have an account?{" "}
          <button
            type="button"
            className="text-[#a8c7fa] hover:underline focus:outline-none font-medium"
            onClick={onSwitchToSignUp}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
