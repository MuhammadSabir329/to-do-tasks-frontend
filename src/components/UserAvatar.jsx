import { useState, useRef, useEffect } from "react";
import AccountMenu from "./AccountMenu";

export default function UserAvatar({ user, onSignOut }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    const first = parts[0]?.[0] || "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
  };

  return (
    <div className="relative inline-block" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex items-center justify-center rounded-full p-1 hover:bg-[#3c4043] transition-colors focus:outline-none cursor-pointer"
      >
        <div className="w-9 h-9 rounded-full overflow-hidden bg-[#3c4043] flex items-center justify-center border border-[#4a4e52]">
          {user?.profilePicture ? (
            <img
              src={user.profilePicture}
              alt={user?.user_name || "User profile"}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-sm font-medium text-[#a8c7fa]">
              {getInitials(user?.user_name)}
            </span>
          )}
        </div>
      </button>
      {isHovered && !isMenuOpen && (
        <div className="absolute right-0 top-full mt-2 w-max max-w-[220px] bg-[#2d3033] border border-[#3c4043] rounded-xl p-3 shadow-xl z-40 text-left pointer-events-none flex flex-col gap-0.5">
          <span className="text-[11px] font-semibold text-[#9aa0a6] uppercase tracking-wider">
            Account
          </span>
          <span className="text-sm font-medium text-white truncate">
            {user?.user_name || "User"}
          </span>
          <span className="text-xs text-[#9aa0a6] truncate">{user?.email}</span>
        </div>
      )}
      {isMenuOpen && (
        <div className="absolute right-0 top-full mt-2 z-50">
          <AccountMenu
            user={user}
            onClose={() => setIsMenuOpen(false)}
            onSignOut={onSignOut}
          />
        </div>
      )}
    </div>
  );
}
