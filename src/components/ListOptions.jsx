import { useState } from "react";
import NewListForm from "./NewListForm";

export default function ListOptions({
  list,
  isListOptionsOpen,
  onListOptionClose,
  onRenameList,
  onDeleteList,
  onDeleteCompletedTasks,
}) {
  const [isRenameListOpen, setIsRenameListOpen] = useState(false);
  const completedTasks = list.tasks.filter((task) => task.isCompleted);
  console.log(completedTasks);
  if (!isListOptionsOpen) return null;

  return (
    <div className="absolute top-full right-0 mt-1 w-50 bg-[#36373a] rounded-lg shadow-2xl py-2 z-50">
      <button
        onClick={() => setIsRenameListOpen(true)}
        className="w-full text-left px-4 py-2 text-[14px] font-semibold text-[#e3e3e3] hover:bg-[#45464a]"
      >
        Rename list
      </button>
      {isRenameListOpen && (
        <NewListForm
          isListModalOpen={isRenameListOpen}
          onListModalClose={() => setIsRenameListOpen(false)}
          listId={list.id}
          titleText="Rename list"
          defaultValue={list.title}
          onRenameList={onRenameList}
        />
      )}
      {list.title === "My Tasks" && (
        <div className="flex flex-col w-full text-left px-4 py-2 text-[14px] text-[#b8b8b8]">
          <span className="font-semibold">Delete list</span>
          <span className="text-[12px]">The default list can't be deleted</span>
        </div>
      )}
      {list.title !== "My Tasks" && (
        <button
          onClick={() => onDeleteList(list.id)}
          className="w-full text-left px-4 py-2 text-[14px] font-semibold text-[#e3e3e3] hover:bg-[#45464a]"
        >
          Delete list
        </button>
      )}
      {completedTasks.length === 0 && (
        <button
        className="w-full text-left px-4 py-2 text-[14px] font-semibold text-[#b8b8b8]"
      >
        Delete all completed tasks
      </button>
      )}
      {completedTasks.length > 0 && (
        <button
        onClick={() => {
          onDeleteCompletedTasks(list.id);
          onListOptionClose();
        }}
        className="w-full text-left px-4 py-2 text-[14px] font-semibold text-[#e3e3e3] hover:bg-[#45464a]"
      >
        Delete all completed tasks
      </button>
      )}
    </div>
  );
}
