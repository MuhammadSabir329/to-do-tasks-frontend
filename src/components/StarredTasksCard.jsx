import { useState, useRef, useEffect } from "react";
import TaskOptions from "./TaskOptions";


function StarredTaskRow({
  task,
  list,
  lists,
  onMarkToggle,
  onDeleteTask,
  onMoveTaskToList,
  onStarredTaskClick,
}) {
  const [isTaskOptionsOpen, setIsTaskOptionsOpen] = useState(false);
  const taskMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (taskMenuRef.current && !taskMenuRef.current.contains(e.target)) {
        setIsTaskOptionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      key={task.id}
      ref={taskMenuRef}
      className="w-full hover:bg-[#1E1F21] flex items-center justify-between py-0.5 px-4 mt-1 border-none rounded"
    >
      <div className="flex items-center">
        <button
          type="button"
          className="group relative w-4 h-4 rounded-full border-2 border-[#c9cccf] shrink-0 flex items-center justify-center transition-transform duration-150 hover:scale-140 hover:border-transparent hover:bg-[#3d3f41] hover:cursor-pointer"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onMarkToggle(list.id, task.id)}
        >
          <svg
            className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#a8c7fa"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>

          <span className="absolute top-full mt-2 left-0 whitespace-nowrap bg-[#e8eaed] text-[#1E1F21] text-[9px] pt-0.5 pb-0.5 pl-1 pr-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none shadow-lg">
            Mark completed
          </span>
        </button>
        <span className="ml-3 text-[14px]">{task.title}</span>
      </div>
      <div className="flex">
        <button
          className="group relative mr-2 text-[#c4c7c5] hover:bg-[#282a2c] p-1.5 rounded-full transition-colors hover:cursor-pointer"
          onClick={() => setIsTaskOptionsOpen(!isTaskOptionsOpen)}
          onMouseDown={(e) => e.preventDefault()}
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
          <span className="absolute top-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#e8eaed] text-[#1E1F21] text-[12px] pt-0.5 pb-0.5 pl-1 pr-1 font-semibold rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none shadow-lg">
            Task options
          </span>
        </button>
        <button
          className="group relative mr-4 text-[#c4c7c5] hover:bg-[#282a2c] p-1.5 rounded-full transition-colors hover:cursor-pointer"
          onClick={() => onStarredTaskClick(list.id, task.id)}
          onMouseDown={(e) => e.preventDefault()}
        >
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill={task.isStarred ? "#c2e7ff" : "none"}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 17L6 20L7.5 14L3 9L9.5 8.5L12 3L14.5 8.5L21 9L16.5 14L18 20L12 17Z"
              stroke={task.isStarred ? "#c2e7ff" : "#ffffff"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {!task.isStarred && (
            <span className="absolute top-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#e8eaed] text-[#1E1F21] text-[12px] pt-0.5 pb-0.5 pl-1 pr-1 font-semibold rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none shadow-lg">
              Add Starred
            </span>
          )}
          {task.isStarred && (
            <span className="absolute top-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#e8eaed] text-[#1E1F21] text-[12px] pt-0.5 pb-0.5 pl-1 pr-1 font-semibold rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none shadow-lg">
              Remove Starred
            </span>
          )}
        </button>
      </div>
      <TaskOptions
        list={list}
        task={task}
        lists={lists}
        isTaskOptionsOpen={isTaskOptionsOpen}
        onTaskOptionsClose={() => setIsTaskOptionsOpen(false)}
        onDeleteTask={onDeleteTask}
        onMoveTaskToList={onMoveTaskToList}
      />
    </div>
  );
}


export default function StarredTasksCard({
  list,
  lists,
  onMarkToggle,
  onDeleteTask,
  onMoveTaskToList,
  onStarredTaskClick,
}) {
  return list.tasks
    .filter((task) => task.isStarred)
    .map((task) => (
      <StarredTaskRow
        key={task.id}
        task={task}
        list={list}
        lists={lists}
        onMarkToggle={onMarkToggle}
        onDeleteTask={onDeleteTask}
        onMoveTaskToList={onMoveTaskToList}
        onStarredTaskClick={onStarredTaskClick}
      />
    ));
}
