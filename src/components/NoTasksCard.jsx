export default function NoTasksCard({ isAddTaskOpen }) {
  if (!isAddTaskOpen)
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <img
          className=" w-45"
          src=".\src\assets\notask-removebg-preview.png"
          alt="No Tasks Image"
        />
        <h4 className="text-[20px] font-semibold text-[#e3e3e3] mb-2.5">
          No tasks yet
        </h4>
        <p className="text-[14px] text-[#e3e3e3] leading-relaxed max-w-57.5">
          Add your to-dos and keep track of them across Google Workspace
        </p>
      </div>
    );
}