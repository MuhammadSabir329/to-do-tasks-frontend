import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addNewList, updateList } from "../store/listsSlice";

function ListModal({
  isListModalOpen,
  onListModalClose,
  listId,
  titleText,
  defaultValue,
  onListOptionClose,
}) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const titleValue = watch("title", "");
  const isButtonDisabled = !titleValue || titleValue.trim() === "";

  const handleClose = () => {
    reset();
    onListModalClose();
  };

  const onSubmit = (data, listId) => {
    if (listId) {
      dispatch(updateList({ listId, newTitle: data.title }));
      onListOptionClose();
    } else {
      dispatch(addNewList(data));
    }
    handleClose();
  };

  if (!isListModalOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div
        className="bg-[#2d3033] text-white w-70 p-6 rounded-[28px] shadow-2xl flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-normal text-[#e3e3e3] px-1">{titleText}</h2>

        <form
          onSubmit={handleSubmit((data) => onSubmit(data, listId))}
          className="flex flex-col gap-4"
        >
          <div className="relative flex flex-col gap-1.5">
            <input
              className="w-full text-[15px] pt-3 pb-2 px-3 bg-[#3c4043] border-b-2 border-[#a8c7fa] rounded-t-md text-white placeholder-gray-400 focus:outline-none focus:bg-[#3c4043] transition-colors"
              type="text"
              placeholder="Enter name"
              autoFocus
              {...register("title", {
                required: "Task list name cannot be empty.",
                validate: (value) =>
                  value.trim() !== "" || "Task list name cannot be empty.",
              })}
            />
            {errors.title && (
              <p className="text-red-400 text-[12px] px-1 font-medium animate-fadeIn">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="flex justify-end items-center gap-5 text-[15px] font-medium px-1 mt-2">
            <button
              type="button"
              onClick={handleClose}
              className="text-[#a8c7fa] hover:text-blue-300 transition-colors py-1 px-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isButtonDisabled}
              className={`py-1 px-4 rounded font-semibold transition-colors ${
                isButtonDisabled
                  ? "text-gray-500 bg-transparent cursor-not-allowed"
                  : "text-[#a8c7fa] hover:bg-[#3c4043]"
              }`}
            >
              Done
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function NewListForm({
  isListModalOpen,
  onListModalClose,
  listId,
  titleText,
  defaultValue,
  onListOptionClose,
}) {
  return (
    <>
      <ListModal
        isListModalOpen={isListModalOpen}
        onListModalClose={onListModalClose}
        listId={listId}
        titleText={titleText}
        defaultValue={defaultValue}
        onListOptionClose={onListOptionClose}
      />
    </>
  );
}
