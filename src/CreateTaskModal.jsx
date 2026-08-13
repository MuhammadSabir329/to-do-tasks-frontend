import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function CreateTaskModal({
  lists,
  isCreateTaskModalOpen,
  onCreateTaskModalClose,
  onCreateTask,
}) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [selectedListId, setSelectedListId] = useState(null);
  const [isListPickerOpen, setIsListPickerOpen] = useState(false);

  const titleValue = watch("title", "");
  const isButtonDisabled =
    !titleValue || titleValue.trim() === "" || !selectedListId;

  const selectedList = lists.find((list) => list.id === selectedListId);

  useEffect(() => {
    if (isCreateTaskModalOpen) {
      reset();
      const defaultList =
        lists.find((list) => list.title === "My Tasks") ?? lists[0];
      setSelectedListId(defaultList ? defaultList.id : null);
      setIsListPickerOpen(false);
    }
  }, [isCreateTaskModalOpen, lists, reset]);

  const handleClose = () => {
    reset();
    onCreateTaskModalClose();
  };

  const onSubmit = (data) => {
    onCreateTask(selectedListId, data.title);
    handleClose();
  };

  if (!isCreateTaskModalOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div
        className="bg-[#2d3033] text-white w-80 h-65 md:w-100 p-6 rounded-[28px] justify-between shadow-2xl flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-normal text-[#e3e3e3] px-1">
          Create task
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="relative flex flex-col gap-1.5">
            <input
              className="w-full text-[15px] pt-3 pb-2 px-3 bg-[#3c4043] border-b-2 border-[#a8c7fa] rounded-t-md text-white placeholder-white focus:outline-none focus:bg-[#3c4043] transition-colors"
              type="text"
              placeholder="Add Title"
              autoFocus
              {...register("title", {
                required: "Task title cannot be empty.",
                validate: (value) =>
                  value.trim() !== "" || "Task title cannot be empty.",
              })}
            />
            {errors.title && (
              <p className="text-red-400 text-[12px] px-1 font-medium">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsListPickerOpen(!isListPickerOpen)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-[14px] bg-[#3c4043] text-[#e3e3e3] hover:bg-[#45464a] hover:cursor-pointer transition-colors"
            >
              <span>{selectedList ? selectedList.title : "Select a list"}</span>
              <svg
                className={`w-4 h-4 text-[#c4c7c5] transition-transform duration-200 ${
                  isListPickerOpen ? "" : "rotate-180"
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </button>

            {isListPickerOpen && (
              <div className="absolute bottom-full left-7 mt-1 w-40 max-h-40 overflow-y-auto scrollbar-none bg-[#1c1c1c] rounded-lg shadow-2xl py-1 z-10">
                {lists.map((list) => (
                  <button
                    key={list.id}
                    type="button"
                    onClick={() => {
                      setSelectedListId(list.id);
                      setIsListPickerOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-[14px] transition-colors ${
                      selectedListId === list.id
                        ? "text-[#a8c7fa]"
                        : "text-[#e3e3e3] hover:bg-[#45464a] hover:cursor-pointer"
                    }`}
                  >
                    {list.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end px-1 mt-2">
            <button
              type="submit"
              disabled={isButtonDisabled}
              className={`py-2 px-6 text-[15px] font-semibold rounded transition-colors ${
                isButtonDisabled
                  ? "text-gray-500 bg-transparent"
                  : "text-[#062e6f] border-none rounded-4xl bg-[#a8c7fa] hover:cursor-pointer"
              }`}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}