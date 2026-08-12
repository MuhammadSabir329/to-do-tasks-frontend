export default function ListOptions({
  list,
  task,
  lists,
  isTaskOptionsOpen,
  onTaskOptionsClose,
  onDeleteTask,
  onMoveTaskToList,
}) {
  const listId = list.id;
  const taskId = task.id;
  if (!isTaskOptionsOpen) return null;

  return (
    <div className="absolute h-59 flex flex-col top-0 right-0 mt-1 w-46 bg-[#36373a] rounded-lg shadow-2xl py-2 z-50 overflow-y-auto scrollbar-none">
      <button
        className="w-full text-left px-4 py-2 text-[14px] font-semibold text-[#e3e3e3] hover:bg-[#45464a]"
        onClick={() => onDeleteTask(listId, taskId)}
        onMouseDown={(e) => e.preventDefault()}
      >
        Delete task
      </button>
      <span className="mt-2 mb-2 block w-full border-b border-gray-500"></span>
      <div className="flex w-full flex-col gap-1">
        {lists.map((list) =>
          list.id === listId ? (
            <div className="w-full">
              <div className="flex gap-2 items-center ml-6">
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
            </div>
          ) : (
            <button
              type="submit"
              className="w-full h-8 pr-7.5 text-[14px] font-semibold hover:bg-[#45464a] hover:cursor-pointer text-[#e3e3e3]"
              onClick={() => onMoveTaskToList(list.id, listId, taskId)}
              onMouseDown={(e) => e.preventDefault()}
            >
              {list.title}
            </button>
          ),
        )}
      </div>
    </div>
  );
}
