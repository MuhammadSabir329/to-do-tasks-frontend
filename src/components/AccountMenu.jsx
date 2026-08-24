export default function AccountMenu({ user, onClose, onSignOut }) {
  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    const first = parts[0]?.[0] || "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
  };

  return (
    <div className="w-[340px] bg-[#2d3033] rounded-2xl p-5 shadow-2xl flex flex-col items-center text-white relative">
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

      <span className="text-sm text-[#9aa0a6] font-medium mb-4 truncate max-w-[240px]">
        {user?.email}
      </span>

      <div className="w-20 h-20 rounded-full overflow-hidden bg-[#3c4043] flex items-center justify-center border-2 border-[#4a4e52] mb-3">
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

      <h3 className="text-xl font-medium text-white mb-6">
        Hi, {user?.user_name ? user.user_name.split(" ")[0] : "User"}!
      </h3>

      <button
        type="button"
        onClick={onSignOut}
        className="w-full bg-[#1c1c1c] hover:bg-[#252525] text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-colors border border-[#3c4043] cursor-pointer"
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
