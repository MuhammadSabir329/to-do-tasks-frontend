import { useState, useRef, useEffect } from "react";
import NewTaskForm from "./NewTaskForm";
import TaskOptions from "./TaskOptions";
import { updateTask, deleteTask } from "../store/listsSlice";
import { useDispatch } from "react-redux";

function TaskRow({ task, list, lists }) {
  const dispatch = useDispatch();
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
      className="w-full hover:bg-[#1E1F21] flex justify-between py-0.5 px-4 mt-1 border-none rounded"
    >
      <div className="flex">
        <button
          type="button"
          className="group relative w-4 h-4 rounded-full border-2 border-[#c9cccf] shrink-0 mt-2 flex items-center justify-center transition-transform duration-150 hover:scale-140 hover:border-transparent hover:bg-[#3d3f41] hover:cursor-pointer"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() =>
            dispatch(
              updateTask({
                listId: list.id,
                taskId: task.id,
                isCompleted: true,
                isStarred: true,
              }),
            )
          }
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
        <input
          type="text"
          value={task.title}
          className="ml-3 w-full text-[14px] focus:outline-none"
          onChange={(e) =>
            dispatch(
              updateTask({
                listId: list.id,
                taskId: task.id,
                newTitle: e.target.value,
              }),
            )
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.target.blur();
            }
          }}
        />
      </div>
      <div className="flex pr-4">
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
          className="group relative text-[#c4c7c5] hover:bg-[#282a2c] p-1.5 rounded-full transition-colors hover:cursor-pointer"
          onClick={() =>
            dispatch(
              updateTask({ listId: list.id, taskId: task.id, isStarred: true }),
            )
          }
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
      />
    </div>
  );
}
function UncompletedTasks({ list, lists }) {
  return list.tasks
    .filter((task) => !task.isCompleted)
    .map((task) => (
      <TaskRow key={task.id} task={task} list={list} lists={lists} />
    ));
}

function CompletedTasks({
  list,
  isCompletedTaskListOpen,
  onCompletedTaskListClick,
}) {
  const dispatch = useDispatch();
  return (
    list.tasks.some((task) => task.isCompleted) && (
      <div>
        <div
          className="flex items-center pt-2 cursor-pointer rounded-lg "
          onClick={() => onCompletedTaskListClick()}
          onMouseDown={(e) => e.preventDefault()}
        >
          <span className="p-1.5 rounded-full hover:bg-[#282a2c] transition-colors">
            <svg
              className={`w-4 h-4 text-[#c4c7c5] transition-transform duration-200 ${
                isCompletedTaskListOpen ? "rotate-90" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
          <span className="text-[14px] pl-2 font-medium text-[#e3e3e3]">
            Completed ({list.tasks.filter((task) => task.isCompleted).length})
          </span>
        </div>
        {isCompletedTaskListOpen && (
          <div>
            {list.tasks
              .filter((task) => task.isCompleted)
              .map((task) => (
                <div
                  key={task.id}
                  className="w-full flex justify-between p-2 mt-1 border-none rounded hover:bg-[#1E1F21]"
                >
                  <div className="flex">
                    <div>
                      <button
                        type="button"
                        className="group relative w-6 h-6 rounded-full border-none shrink-0 mt-1 flex items-center justify-center hover:bg-[#3d3f41] hover:cursor-pointer"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() =>
                          dispatch(
                            updateTask({
                              listId: list.id,
                              taskId: task.id,
                              isCompleted: true,
                              isStarred: true,
                            }),
                          )
                        }
                      >
                        <svg
                          className="w-4 h-4 opacity-100 transition-opacity duration-150"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#a8c7fa"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>

                        <span className="absolute top-full mt-2 left-0 whitespace-nowrap bg-[#e8eaed] text-[#1E1F21] text-[12px] pt-1 pb-1 pl-2 pr-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none shadow-lg">
                          Mark uncompleted
                        </span>
                      </button>
                    </div>
                    <div className="flex flex-col">
                      <span className="ml-3 text-[14px] line-through text-white">
                        {task.title}
                      </span>
                      <span className="text-[12px] ml-3">
                        Completed:{" "}
                        {new Date(task.updated_at).toLocaleDateString("en-US", {
                          weekday: "short",
                          day: "numeric",
                          month: "long",
                        })}
                      </span>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="group relative rounded-full border-none shrink-0 mt-1 mr-5 flex items-center justify-center hover:bg-[#3d3f41] hover:cursor-pointer"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() =>
                        dispatch(
                          deleteTask({ listId: list.id, taskId: task.id }),
                        )
                      }
                    >
                      <svg
                        width="28px"
                        height="28px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="p-1"
                      >
                        <path
                          d="M10 11V17"
                          stroke="#c4c7c5"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14 11V17"
                          stroke="#c4c7c5"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4 7H20"
                          stroke="#c4c7c5"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
                          stroke="#c4c7c5"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                          stroke="#c4c7c5"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#e8eaed] text-[#1E1F21] text-[12px] pt-1 pb-1 pl-2 pr-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none shadow-lg">
                        Delete task
                      </span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    )
  );
}

export default function TasksCard({
  list,
  lists,
  onChangeTaskTitle,
  isCompletedTaskListOpen,
  onCompletedTaskListClick,
}) {
  return (
    <div className="min-h-60 relative flex1 flex-col overflow-y-auto scrollbar-none">
      <UncompletedTasks list={list} lists={lists} />
      <CompletedTasks
        list={list}
        isCompletedTaskListOpen={isCompletedTaskListOpen}
        onCompletedTaskListClick={onCompletedTaskListClick}
      />
    </div>
  );
}
