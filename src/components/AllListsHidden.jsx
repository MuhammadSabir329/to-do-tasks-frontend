import noListImage from "../assets/nolist.png";

export default function AllListsHidden() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-2">
      <img className="h-32 w-40" src={noListImage} alt="" />
      <span className="text-[18px] font-normal mt-5">All lists are hidden</span>
      <span className="text-sm">Select any list to see your tasks</span>
    </div>
  );
}
