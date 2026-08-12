import { useState, useEffect } from "react";

export default function NewTaskForm({
  isAddStarredTaskOpen,
  handleAddStarredTask,
  onChangeTaskTitle,
  onCloseAddStarredTask,
  lists = [],
  taskTitle,
}) {
  const [selectedListId, setSelectedListId] = useState(null);
  const [isListPickerOpen, setIsListPickerOpen] = useState(false);

  const selectedList = lists.find((list) => list.id === selectedListId);

  useEffect(() => {
    if (isAddStarredTaskOpen) {
      const defaultList =
        lists.find((list) => list.title === "My Tasks") ?? lists[0];
      setSelectedListId(defaultList ? defaultList.id : null);
      setIsListPickerOpen(false);
    }
  }, [isAddStarredTaskOpen, lists]);

  if (!isAddStarredTaskOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskTitle || !taskTitle.trim() || !selectedListId) return;
    handleAddStarredTask(selectedListId, taskTitle);
    onChangeTaskTitle("");
  };

  return (
    <form onSubmit={handleSubmit} onBlur={() => onCloseAddStarredTask()}>
      <div className="flex flex-col gap-2 w-full bg-[#1E1F21] p-3 mt-1 border-none rounded">
        <div className="flex items-center gap-1.5">
          <button
            type="submit"
            className="w-5 h-5 rounded-full border-2 border-[#c9cccf] shrink-0 hover:border-[#a8c7fa] transition-colors"
          />
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="ml-3 w-full bg-transparent border-none outline-none focus:outline-none text-[14px] text-[#e3e3e3] placeholder-white"
            autoFocus
            value={taskTitle}
            onChange={(e) => onChangeTaskTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") onCloseAddStarredTask();
            }}
          />
        </div>
        <div className="relative">
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setIsListPickerOpen((prev) => !prev)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[14px] text-[#e3e3e3] hover:bg-[#282A2C] cursor-pointer transition-colors"
          >
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="#c4c7c5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.5 11.25H16.5V12.75H10.5V11.25Z"
                fill="#c4c7c5"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.5 7.5H16.5V9H10.5V7.5Z"
                fill="#c4c7c5"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.5 15H16.5V16.5H10.5V15Z"
                fill="#c4c7c5"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.5 7.5H9V9H7.5V7.5Z"
                fill="#c4c7c5"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.5 11.25H9V12.75H7.5V11.25Z"
                fill="#c4c7c5"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.5 15H9V16.5H7.5V15Z"
                fill="#c4c7c5"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.75 4.5L4.5 3.75H19.5L20.25 4.5V19.5L19.5 20.25H4.5L3.75 19.5V4.5ZM5.25 5.25V18.75H18.75V5.25H5.25Z"
                fill="#c4c7c5"
              />
            </svg>
            <span className="text-sm font-semibold">
              {selectedList ? selectedList.title : "Select a list"}
            </span>
          </button>
          {isListPickerOpen && (
            <div className="absolute top-full left-10 mt-1 w-50 max-h-40 overflow-y-auto scrollbar-none bg-[#131314] rounded-lg shadow-2xl py-1 z-10 border border-[#2d2f31]">
              {lists.map((list) =>
                list.id === selectedListId ? (
                  <div className="w-full flex gap-2 items-center h-8 pl-6 mt-1 text-[14px] font-semibold bg-[#45464a] hover:cursor-pointer text-[#e3e3e3]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 50 50"
                      width="20px"
                      height="20px"
                    >
                      <path
                        fill="#e3e3e3"
                        d="M 41.9375 8.625 C 41.273438 8.648438 40.664063 9 40.3125 9.5625 L 21.5 38.34375 L 9.3125 27.8125 C 8.789063 27.269531 8.003906 27.066406 7.28125 27.292969 C 6.5625 27.515625 6.027344 28.125 5.902344 28.867188 C 5.777344 29.613281 6.078125 30.363281 6.6875 30.8125 L 20.625 42.875 C 21.0625 43.246094 21.640625 43.410156 22.207031 43.328125 C 22.777344 43.242188 23.28125 42.917969 23.59375 42.4375 L 43.6875 11.75 C 44.117188 11.121094 44.152344 10.308594 43.78125 9.644531 C 43.410156 8.984375 42.695313 8.589844 41.9375 8.625 Z"
                      />
                    </svg>
                    <span className="text-[#e3e3e3] text-[14px] font-semibold">
                      {list.title}
                    </span>
                  </div>
                ) : (
                  <button
                    key={list.id}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setSelectedListId(list.id);
                      setIsListPickerOpen(false);
                    }}
                    className="w-full h-8 pr-7.5 mt-1 text-[14px] font-semibold hover:bg-[#45464a] hover:cursor-pointer text-[#e3e3e3]"
                  >
                    {list.title}
                  </button>
                ),
              )}
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
