import { useState, useRef, useEffect } from "react";
import NoTasksCard from "./NoTasksCard";
import TasksCard from "./TasksCard";
import NewTaskForm from "./NewTaskForm";
import ListOptions from "./ListOptions";

function TaskHeader({
  list,
  onRenameList,
  onDeleteList,
  onDeleteCompletedTasks,
}) {
  const [isListOptionsOpen, setIsListOptionsOpen] = useState(false);
  const listMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (listMenuRef.current && !listMenuRef.current.contains(e.target)) {
        setIsListOptionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={listMenuRef}>
      <div className="flex items-center justify-between mb-2 pl-1.5">
        <h3 className="text-[18px] font-medium text-[#e3e3e3] truncate">
          {list.title}
        </h3>
        <button
          className="group relative mr-2 text-[#c4c7c5] hover:bg-[#282a2c] p-1.5 rounded-full transition-colors hover:cursor-pointer"
          onClick={() => setIsListOptionsOpen(!isListOptionsOpen)}
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
          <span className="absolute top-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#595959] text-white text-[10px] font-semibold pt-1 pb-1 pl-2.5 pr-2.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none shadow-lg">
            List options
          </span>
        </button>
      </div>
      <ListOptions
        list={list}
        isListOptionsOpen={isListOptionsOpen}
        onListOptionClose={() => setIsListOptionsOpen(false)}
        onRenameList={onRenameList}
        onDeleteList={onDeleteList}
        onDeleteCompletedTasks={onDeleteCompletedTasks}
      />
    </div>
  );
}

function AddTaskButton({
  onOpenAddTask,
  onCloseAddTask,
  isAddTaskOpen,
  handleAddTask,
  onChangeTaskTitle,
  taskTitle,
  list,
}) {
  return (
    <>
      <div className="flex items-center justify-center">
        <button
          className="w-full rounded-2xl hover:bg-[#282a2c] text-left p-1.5 text-[#a8c7fa] flex gap-4 font-semibold"
          id="add_task"
          onClick={() => onOpenAddTask()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            width="20"
            viewBox="0 0 24 24"
            focusable="false"
            className="w-5 h-5 fill-[#a8c7fa] text-[#a8c7fa]" // Adjust colors/size with Tailwind here
          >
            <rect fill="none" height="24" width="24" />
            <path d="M22,5.18L10.59,16.6l-4.24-4.24l1.41-1.41l2.83,2.83l10-10L22,5.18z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8 c1.57,0,3.04,0.46,4.28,1.25l1.45-1.45C16.1,2.67,14.13,2,12,2C6.48,2,2,6.48,2,12s4.48,10,10,10c1.73,0,3.36-0.44,4.78-1.22 l-1.5-1.5C14.28,19.74,13.17,20,12,20z M19,15h-3v2h3v3h2v-3h3v-2h-3v-3h-2V15z" />
          </svg>
          <p className="text-sm">Add a task</p>
        </button>
      </div>
      <NewTaskForm
        isAddTaskOpen={isAddTaskOpen}
        handleAddTask={handleAddTask}
        onChangeTaskTitle={onChangeTaskTitle}
        onCloseAddTask={onCloseAddTask}
        list={list}
        taskTitle={taskTitle}
      />
    </>
  );
}

function TaskListCard({
  list,
  lists,
  count,
  handleAddTask,
  onEditTaskTitle,
  onMarkToggle,
  onDeleteClick,
  onRenameList,
  onDeleteList,
  onDeleteCompletedTasks,
  onDeleteTask,
  onMoveTaskToList,
  onStarredTaskClick,
  isMenuOpen,
}) {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [isCompletedTaskListOpen, setIsCompletedTaskListOpen] = useState(false);
  const onCompletedTaskListClick = () =>
    setIsCompletedTaskListOpen(!isCompletedTaskListOpen);

  return (
    <div
      className={`shrink-0 h-110 bg-[#131314] border-[0.5px] border-transparent hover:border-[#ffffff] rounded-2xl mt-5 py-3 px-2.5 flex flex-col select-none
        ${count === 1 ? (isMenuOpen ? "w-80 md:w-170" : "w-full md:w-170") : ""}
        ${count === 2 ? "w-75 min-w-75 md:w-[calc(50%-8px)] md:min-w-100" : ""}
        ${count >= 3 ? "w-75 min-w-75 shrink-0" : ""}
      `}
    >
      <TaskHeader
        list={list}
        onRenameList={onRenameList}
        onDeleteList={onDeleteList}
        onDeleteCompletedTasks={onDeleteCompletedTasks}
      />
      <AddTaskButton
        isAddTaskOpen={isAddTaskOpen}
        onOpenAddTask={() => setIsAddTaskOpen(true)}
        onCloseAddTask={() => setIsAddTaskOpen(false)}
        handleAddTask={handleAddTask}
        taskTitle={taskTitle}
        onChangeTaskTitle={setTaskTitle}
        list={list}
      />
      {list.tasks.length === 0 ? (
        <NoTasksCard isAddTaskOpen={isAddTaskOpen} />
      ) : (
        <TasksCard
          list={list}
          lists={lists}
          onEditTaskTitle={onEditTaskTitle}
          onMarkToggle={onMarkToggle}
          onDeleteClick={onDeleteClick}
          isCompletedTaskListOpen={isCompletedTaskListOpen}
          onCompletedTaskListClick={onCompletedTaskListClick}
          onDeleteTask={onDeleteTask}
          onMoveTaskToList={onMoveTaskToList}
          onStarredTaskClick={onStarredTaskClick}
        />
      )}
    </div>
  );
}

export default function AllTasksPanel({
  lists,
  onAddTask,
  onEditTaskTitle,
  onMarkToggle,
  onDeleteClick,
  onRenameList,
  onDeleteList,
  onDeleteCompletedTasks,
  onDeleteTask,
  onMoveTaskToList,
  onStarredTaskClick,
  isMenuOpen,
}) {
  const activeLists = lists.filter((list) => list.isChecked);
  const count = activeLists.length;

  const handleAddTask = (listId, taskTitle) => {
    if (taskTitle.trim() === "") return;
    onAddTask(listId, taskTitle);
  };

  return (
    <div
      className={`w-full relative h-full flex items-start gap-3.5 overflow-x-auto px-3.5 pb-4 custom-scrollbar
        ${count === 1 ? "justify-start min-[1250px]:justify-center" : ""}
        ${count === 2 ? "justify-start min-[1250px]:justify-center" : ""}
        ${count >= 3 ? "justify-start" : ""}
      `}
    >
      {activeLists.map((list) => (
        <TaskListCard
          key={list.id}
          list={list}
          lists={lists}
          count={count}
          handleAddTask={handleAddTask}
          onEditTaskTitle={onEditTaskTitle}
          onMarkToggle={onMarkToggle}
          onDeleteClick={onDeleteClick}
          onRenameList={onRenameList}
          onDeleteList={onDeleteList}
          onDeleteCompletedTasks={onDeleteCompletedTasks}
          onDeleteTask={onDeleteTask}
          onMoveTaskToList={onMoveTaskToList}
          onStarredTaskClick={onStarredTaskClick}
          isMenuOpen={isMenuOpen}
        />
      ))}
    </div>
  );
}
