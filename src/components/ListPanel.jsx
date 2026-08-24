import { useDispatch } from "react-redux";
import { updateList } from "../store/listsSlice";

function ListHeader({ isListsOpen, onListsClose }) {
  return (
    <div
      className="flex items-center justify-between px-1 py-1 cursor-pointer rounded-lg "
      onClick={onListsClose}
    >
      <span className="text-[15px] font-medium text-[#e3e3e3]">Lists</span>
      <svg
        className={`w-4 h-4 text-[#c4c7c5] transition-transform duration-200 ${
          isListsOpen ? "" : "rotate-180"
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </div>
  );
}

function ListItems({ lists }) {
  const dispatch = useDispatch();
  if (lists.length > 0)
    return (
      <div className="flex flex-col mt-2 gap-0.5">
        {lists.map((list) => {
          return (
            <div
              key={list.id}
              className="flex items-center p-1.5 pl-2 rounded-full hover:bg-[#282a2c] transition-colors cursor-pointer"
              onClick={() =>
                dispatch(updateList({ listId: list.id, isChecked: true }))
              }
            >
              <div className="flex items-center gap-4 w-full">
                <input
                  type="checkbox"
                  className="appearance-none w-4.5 h-4.5 border-2 border-white bg-transparent cursor-pointer checked:bg-[#e8eaed] checked:border-[#e8eaed] bg-center bg-no-repeat"
                  style={{
                    backgroundImage: list.isChecked
                      ? `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%231c1c1c" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>')`
                      : "none",
                    backgroundSize: "100%",
                  }}
                  checked={list.isChecked}
                  onChange={() =>
                    dispatch(updateList({ listId: list.id, isChecked: true }))
                  }
                />
                <span className="text-[14px] font-medium text-[#e3e3e3]">
                  {list.title}
                </span>
                {list.tasks.filter((task) => !task.isCompleted).length > 0 && (
                  <span className="ml-16 text-[12px] text-[#c4c7c5] font-semibold">
                    {list.tasks.filter((task) => !task.isCompleted).length}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
}

function AddListButton({ onAddListClick }) {
  return (
    <button
      onClick={onAddListClick}
      className="w-full text-left p-1.5 mt-3 text-[#e3e3e3] hover:bg-[#282a2c] hover:cursor-pointer rounded-full flex items-center gap-3 font-normal text-[14px]"
    >
      <svg
        className="w-5 h-5 text-[#c4c7c5]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 22 22"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
      <span className="font-semibold text-[15px]">Create new list</span>
    </button>
  );
}

export default function ListPanel({
  lists,
  isListsOpen,
  onListsClose,
  onAddListClick,
}) {
  return (
    <>
      <ListHeader isListsOpen={isListsOpen} onListsClose={onListsClose} />
      {isListsOpen && (
        <div className="flex flex-col mt-0.5">
          <ListItems lists={lists} />
        </div>
      )}
      <AddListButton onAddListClick={onAddListClick} />
    </>
  );
}
