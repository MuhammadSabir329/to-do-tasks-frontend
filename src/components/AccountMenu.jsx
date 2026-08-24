import { useRef } from "react";

export default function AccountMenu({
  user,
  onClose,
  onSignOut,
  onUpdateAvatar,
}) {
  const fileInputRef = useRef(null);

  // Extract initials if user has no avatar image
  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    const first = parts[0]?.[0] || "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && onUpdateAvatar) {
      onUpdateAvatar(file);
    }
  };

  return (
    <div className="w-[340px] bg-[#2d3033] rounded-2xl p-5 shadow-2xl flex flex-col items-center text-white relative">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-[#9aa0a6] hover:text-white transition-colors"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Email Header */}
      <span className="text-sm text-[#9aa0a6] font-medium mb-4 truncate max-w-[240px]">
        {user?.email}
      </span>

      {/* Avatar with Camera Overlay Trigger */}
      <div className="relative mb-3 group">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-[#3c4043] flex items-center justify-center border-2 border-[#4a4e52]">
          {user?.profilePicture ? (
            <img
              src={user.profilePicture}
              alt={user?.user_name || "User profile"}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-2xl font-semibold text-[#a8c7fa]">
              {getInitials(user?.user_name)}
            </span>
          )}
        </div>

        {/* Change Photo Overlay Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-0 right-0 bg-[#3c4043] hover:bg-[#4a4e52] p-1.5 rounded-full border border-[#2d3033] text-white shadow-md transition-colors"
          title="Change photo"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>

      {/* Greeting Name */}
      <h3 className="text-xl font-medium text-white mb-6">
        Hi, {user?.user_name ? user.user_name.split(" ")[0] : "User"}!
      </h3>

      {/* Sign Out Button */}
      <button
        type="button"
        onClick={onSignOut}
        className="w-full bg-[#1c1c1c] hover:bg-[#252525] text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-colors border border-[#3c4043]"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        Sign out
      </button>
    </div>
  );
}
