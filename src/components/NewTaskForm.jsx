export default function NewTaskForm({
  isAddTaskOpen,
  handleAddTask,
  onChangeTaskTitle,
  onCloseAddTask,
  list,
  taskTitle,
}) {
  if (isAddTaskOpen)
    return (
      <form
        className="w-full bg-[#1E1F21] flex p-2 mt-1 border-none rounded"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddTask(list.id,taskTitle);
          onChangeTaskTitle("");
        }}
      >
        <button
          type="submit"
          className="w-5 h-5 rounded-full border-2 border-[#c9cccf] shrink-0 mt-1"
        ></button>
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="ml-3 focus:outline-none placeholder-white"
          autoFocus
          value={taskTitle}
          onChange={(e) => onChangeTaskTitle(e.target.value)}
          onBlur={() => onCloseAddTask()}
        />
      </form>
    );
}
