export default function TabNav({ activeTab, onTabChange }) {
  return (
    <div className="flex pt-5 pb-1.5 flex-col">
      <button
        onClick={() => onTabChange("all")}
        className={`flex items-center gap-3 px-3 py-1.5 hover:cursor-pointer rounded-full text-[14px] font-medium transition-colors ${
          activeTab === "all"
            ? "bg-[#004a77] text-[#c2e7ff]"
            : "text-[#e3e3e3] hover:bg-[#282a2c]"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0,0,256,256"
          width="20px"
          height="20px"
          fillRule="nonzero"
        >
          <g
            fill={activeTab === "all" ? "#c2e7ff" : "#ffffff"}
            fillRule="nonzero"
            stroke="none"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeMiterlimit="10"
            strokeDasharray=""
            strokeDashoffset="0"
            fontFamily="none"
            fontWeight="none"
            fontSize="none"
            textAnchor="none"
            style={{ mixBlendMode: "normal" }}
          >
            <g transform="scale(10.66667,10.66667)">
              <path d="M12,2c-5.514,0 -10,4.486 -10,10c0,5.514 4.486,10 10,10c5.514,0 10,-4.486 10,-10c0,-1.126 -0.19602,-2.2058 -0.54102,-3.2168l-1.61914,1.61914c0.105,0.516 0.16016,1.05066 0.16016,1.59766c0,4.411 -3.589,8 -8,8c-4.411,0 -8,-3.589 -8,-8c0,-4.411 3.589,-8 8,-8c1.633,0 3.15192,0.49389 4.41992,1.33789l1.43164,-1.43164c-1.648,-1.194 -3.66656,-1.90625 -5.85156,-1.90625zM21.29297,3.29297l-10.29297,10.29297l-3.29297,-3.29297l-1.41406,1.41406l4.70703,4.70703l11.70703,-11.70703z"></path>
            </g>
          </g>
        </svg>
        <span>All tasks</span>
      </button>

      <button
        onClick={() => onTabChange("starred")}
        className={`flex items-center gap-3 px-3 py-1.5 hover:cursor-pointer rounded-full text-[14px] font-medium transition-colors ${
          activeTab === "starred"
            ? "bg-[#004a77] text-[#c2e7ff]"
            : "text-[#e3e3e3] hover:bg-[#282a2c]"
        }`}
      >
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          fill={activeTab === "starred" ? "#c2e7ff" : "none"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 17L6 20L7.5 14L3 9L9.5 8.5L12 3L14.5 8.5L21 9L16.5 14L18 20L12 17Z"
            stroke={activeTab === "starred" ? "#c2e7ff" : "#ffffff"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Starred</span>
      </button>
    </div>
  );
}
