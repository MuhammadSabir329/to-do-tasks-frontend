import { useState } from "react";
import StarredTasksCard from "./components/StarredTasksCard";
import NoStarredTasksCard from "./NoStarredTasksCard";
import StarredTaskForm from "./StarredTaskForm";
import { addTask } from "./store/listsSlice";
import { useDispatch } from "react-redux";

function AddStarredTaskButton({
  lists,
  isAddStarredTaskOpen,
  onOpenAddStarredTask,
  onCloseAddStarredTask,
  handleAddStarredTask,
  taskTitle,
  onChangeTaskTitle,
}) {
  return (
    <>
      <div className="flex items-center justify-center mt-1">
        <button
          className="w-full rounded-2xl hover:bg-[#282a2c] text-left p-1.5 text-[#a8c7fa] flex gap-4 font-semibold"
          id="add_task"
          onClick={() => onOpenAddStarredTask()}
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
          <p className="text-sm pb-0.5">Add a starred task</p>
        </button>
      </div>
      <StarredTaskForm
        lists={lists}
        isAddStarredTaskOpen={isAddStarredTaskOpen}
        onCloseAddStarredTask={onCloseAddStarredTask}
        handleAddStarredTask={handleAddStarredTask}
        taskTitle={taskTitle}
        onChangeTaskTitle={onChangeTaskTitle}
      />
    </>
  );
}

export default function StarredTasksPanel({ lists, isMenuOpen}) {
  const dispatch = useDispatch();
  const anyStarredTask = (lists) => {
    return lists.flatMap((list) => list.tasks).some((task) => task.isStarred);
  };
  const hasStarredTasks = anyStarredTask(lists);
  const [isAddStarredTaskOpen, setIsAddStarredTaskOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const handleAddStarredTask = (listId, taskTitle) => {
    if (taskTitle.trim() === "") return;
    dispatch(addTask({ listId, taskTitle, isStarred: true }));
  };
  return (
    <div className="h-full w-full px-3.5 md:px-0 flex items-start justify-start md:justify-center">
      <div className={`shrink-0 ${isMenuOpen ? "w-80 md:w-170" : "w-full md:w-170"} h-110 bg-[#131314] border-[0.5px] border-transparent hover:border-[#ffffff] rounded-2xl mt-5 md:mr-0 md:ml-7 py-4 px-2.5 flex flex-col select-none`}>
        <h3 className="text-[18px] font-medium text-[#e3e3e3] mb-2 pl-1.5">
          Starred Tasks
        </h3>
        <AddStarredTaskButton
          lists={lists}
          isAddStarredTaskOpen={isAddStarredTaskOpen}
          onOpenAddStarredTask={() => setIsAddStarredTaskOpen(true)}
          onCloseAddStarredTask={() => setIsAddStarredTaskOpen(false)}
          handleAddStarredTask={handleAddStarredTask}
          taskTitle={taskTitle}
          onChangeTaskTitle={setTaskTitle}
        />
        <div className="min-h-60 relative flex1 flex-col overflow-y-auto scrollbar-none">
          {!hasStarredTasks && !isAddStarredTaskOpen && <NoStarredTasksCard />}
          {hasStarredTasks &&
            lists.map((list) => <StarredTasksCard list={list} lists={lists} />)}
        </div>
      </div>
    </div>
  );
}
