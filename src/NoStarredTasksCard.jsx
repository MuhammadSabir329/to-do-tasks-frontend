import noStarredTaskImg from "./assets/nostarredtask.png";

export default function NoStarredTasksCard() {
  return (
    <div className="flex-1 mt-12 flex flex-col items-center justify-center text-center px-4">
      <img className=" w-55" src={noStarredTaskImg} alt="" />
      <h4 className="text-[20px] font-semibold text-[#e3e3e3] mt-3 mb-2.5">
        No starred tasks
      </h4>
      <p className="text-[14px] text-[#e3e3e3] leading-relaxed max-w-60">
        Mark important tasks with a star so that you can easily find them here
      </p>
    </div>
  );
}