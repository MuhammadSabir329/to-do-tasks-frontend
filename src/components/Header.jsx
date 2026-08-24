import UserAvatar from "./UserAvatar";

export default function Header({ onMenuClose }) {
  return (
    <div className="flex px-4 items-center justify-between">
      <div className="flex items-center">
        <button
          onClick={onMenuClose}
          type="submit"
          className="hover:rounded-full hover:bg-[#282a2c] p-2"
        >
          <svg
            width="25px"
            height="25px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6H20M4 12H20M4 18H20"
              stroke="#e3e3e3"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <img
          className="w-10 h-10 ml-3"
          src="https://www.gstatic.com/images/branding/productlogos/tasks_2026/v2/web/192px.svg"
          alt=""
          aria-hidden="true"
          role="presentation"
          data-atf="true"
          data-iml="613.7999999523163"
        ></img>
        <p className="text-2xl font-semibold ml-1">Tasks</p>
      </div>
      <div>
        <UserAvatar />
      </div>
    </div>
  );
}
