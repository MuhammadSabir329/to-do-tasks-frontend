import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "./store/authSlice";

export default function Signup({ onSwitchToSignIn }) {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [fileError, setFileError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const error = useSelector((state) => state.auth.error);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg"];
    if (!allowedTypes.includes(file.type)) {
      setFileError("Only PNG and JPEG images are allowed.");
      return;
    }

    const maxSizeInBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      setFileError("Image must be smaller than 5MB.");
      return;
    }

    setFileError("");

    setPreview(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.onload = () => {
      setProfilePicture(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const isValidPassword = (password) => {
    const hasMinLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return hasMinLength && hasNumber && hasLetter && hasSpecialChar;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidPassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters and include a letter, a number, and a special character.",
      );
      return;
    }
    setPasswordError("");

    dispatch(
      registerUser({ email, password, user_name: name, profilePicture }),
    );
  };

  return (
    <div className="fixed inset-0 bg-[#1c1c1c] flex items-center justify-center z-50">
      <div className="w-90 bg-[#2d3033] rounded-xl p-5 shadow-2xl flex flex-col gap-3 text-white">
        <div className="w-full justify-center flex flex-col">
          <h2 className="flex justify-center text-[22px] font-semibold">
            Create your account
          </h2>
          <p className="flex justify-center text-[14px] text-[#9aa0a6] ">
            Sign up to start managing your tasks.
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <input
            type="file"
            name="profile"
            id="profile"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <div
            onClick={() => fileInputRef.current.click()}
            className="w-18 h-18 rounded-full bg-[#3c4043] flex items-center justify-center cursor-pointer hover:bg-[#4a4e52] transition-colors overflow-hidden border border-[#4a4e52]"
          >
            {preview ? (
              <img
                src={preview}
                alt="Avatar preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                className="w-7 h-7 text-[#9aa0a6]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
          </div>
          {fileError && (
            <p className="text-red-400 text-xs text-center">{fileError}</p>
          )}
          <div className="flex flex-col items-center">
            <label
              htmlFor="profile"
              className="text-xs font-medium"
            >
              Upload photo (optional)
            </label>
            <span className="text-[10px] text-[#9aa0a6]">
              (PNG or JPEG, max 5MB)
            </span>
          </div>
        </div>
        <form
          className="flex flex-col justify-center gap-3"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-1 text-left">
            <label htmlFor="name" className="text-sm font-medium text-gray-200">
              Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              className="w-full bg-[#3c4043] text-white px-3 py-2.5 rounded-t-md border-b-2 border-transparent focus:border-[#a8c7fa] outline-none transition-colors placeholder:text-[#9aa0a6] text-sm"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 text-left">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-200"
            >
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              className="w-full bg-[#3c4043] text-white px-3 py-2.5 rounded-t-md border-b-2 border-transparent focus:border-[#a8c7fa] outline-none transition-colors placeholder:text-[#9aa0a6] text-sm"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 text-left">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-200"
            >
              Password <span className="text-red-400">*</span>
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="••••••••••••"
                className="w-full bg-[#3c4043] text-white pl-3 pr-10 py-2.5 rounded-t-md border-b-2 border-transparent focus:border-[#a8c7fa] outline-none transition-colors placeholder:text-[#9aa0a6] text-sm"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-[#9aa0a6] hover:text-white transition-colors"
              >
                {showPassword ? (
                  <svg
                    className="w-5 h-5 cursor-pointer"
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
                    className="w-5 h-5 cursor-pointer"
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
            {passwordError && (
              <p className="text-red-400 text-xs mt-1">{passwordError}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-medium py-2.5 rounded-lg transition-colors duration-150 shadow-md focus:outline-none focus:ring-2 focus:ring-[#a8c7fa] focus:ring-offset-2 focus:ring-offset-[#2d3033] cursor-pointer"
          >
            Sign up
          </button>
        </form>
        <div className="text-center text-xs text-[#9aa0a6]">
          Already have an account?{" "}
          <button
            type="button"
            className="text-[#a8c7fa] hover:underline focus:outline-none font-medium cursor-pointer"
            onClick={onSwitchToSignIn}
          >
            Sign in
          </button>
        </div>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
      </div>
    </div>
  );
}
