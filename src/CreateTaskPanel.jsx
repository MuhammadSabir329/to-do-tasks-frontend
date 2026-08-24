import { useState } from "react";
import CreateTaskModal from "./CreateTaskModal";

export default function CreateTaskPanel({ lists }) {
  const [isCreateTaskModalOpen, setIsCreateTAskModelOpen] = useState(false);
  return (
    <>
      <button
        type="submit"
        className="group relative flex mt-3 mb-3 pl-5 pr-5 pt-3.5 pb-3.5 bg-[#37393b] hover:bg-[#3f454a] items-center justify-center border-none rounded-2xl hover:cursor-pointer"
        onClick={() => setIsCreateTAskModelOpen(true)}
      >
        <svg
          className="w-6 h-6 text-[#e3e3e3]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        <span className="ml-2 mb-1 font-semibold text-[#e3e3e3]">Create</span>
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#e8eaed] text-[#1E1F21] text-[12px] pt-0.5 pb-0.5 pl-2 pr-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none shadow-lg">
          Create
        </span>
      </button>

      <CreateTaskModal
        lists={lists}
        isCreateTaskModalOpen={isCreateTaskModalOpen}
        onCreateTaskModalClose={() => setIsCreateTAskModelOpen(false)}
      />
    </>
  );
}
