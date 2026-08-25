import { useState, useEffect } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Header from "./components/Header";
import AllTasksPanel from "./components/AllTasksPanel";
import ListPanel from "./components/ListPanel";
import NewListForm from "./components/NewListForm";
import AllListsHidden from "./components/AllListsHidden";
import CreateTaskPanel from "./CreateTaskPanel";
import TabNav from "./TabNav";
import StarredTasksPanel from "./StarredTasksPanel";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchLists,
  deleteList,
  addNewList,
  updateList,
  addTask,
  updateTask,
  deleteTask,
  deleteCompletedListTasks,
  moveTaskToList,
} from "./store/listsSlice";

const API_URL = "https://to-do-tasks-api.bonto.run";

function Main({
  onAddListClick,
  isListModalOpen,
  onListModalClose,
  lists,
  isListsOpen,
  onListsClose,
  isMenuOpen,
  onMenuClose,
  activeLists,
  activeTab,
  onTabChange,
}) {
  return (
    <div className="h-screen w-screen flex flex-col items-stretch bg-[#1c1c1c] text-white font-sans pt-3 md:pr-4">
      <Header onMenuClose={onMenuClose} />
      <div className="flex-1 flex">
        {isMenuOpen && (
          <div className="w-65 h-132 p-3 flex flex-col overflow-y-auto scrollbar-none">
            <div className="pl-1">
              <CreateTaskPanel lists={lists} />
            </div>
            <TabNav activeTab={activeTab} onTabChange={onTabChange} />
            <div className="w-full max-w-65 bg-[#1c1c1c] text-white select-none font-sans p-2 ">
              <ListPanel
                lists={lists}
                isListsOpen={isListsOpen}
                onListsClose={onListsClose}
                onAddListClick={onAddListClick}
              />
              <NewListForm
                isListModalOpen={isListModalOpen}
                onListModalClose={onListModalClose}
                titleText="Create new list"
              />
            </div>
          </div>
        )}

        <main className="flex-1 h-full w-full pl-0 md:pr-2 min-w-0 ">
          {activeTab === "starred" && <StarredTasksPanel lists={lists} isMenuOpen={isMenuOpen} />}
          {activeTab === "all" && (
            <>
              {activeLists.length === 0 && <AllListsHidden />}
              {activeLists.length > 0 && (
                <AllTasksPanel lists={lists} isMenuOpen={isMenuOpen} />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [authView, setAuthView] = useState("signup");
  const token = useSelector((state) => state.auth.token);
  const [isListsOpen, setIsListsOpen] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(() => {
    return window.matchMedia("(min-width: 768px)").matches;
  });
  const [activeTab, setActiveTab] = useState("all");
  const onTabChange = (tabText) => {
    setActiveTab(tabText);
  };
  const [isListModalOpen, setisListModalOpen] = useState(false);

  const lists = useSelector((state) => state.lists.items);
  const isLoading = useSelector((state) => state.lists.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchLists());
    }
  }, [dispatch, token]);

  const activeLists = lists.filter((list) => list.isChecked);

  if (!token) {
    return (
      <>
        {authView === "signup" && (
          <SignUp onSwitchToSignIn={() => setAuthView("signin")} />
        )}
        {authView === "signin" && (
          <SignIn onSwitchToSignUp={() => setAuthView("signup")} />
        )}
      </>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-[#131314]">
        <div className="w-10 h-10 border-4 border-[#3c4043] border-t-[#8ab4f8] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Main
      onAddListClick={() => setisListModalOpen(!isListModalOpen)}
      isListModalOpen={isListModalOpen}
      onListModalClose={() => setisListModalOpen(!isListModalOpen)}
      lists={lists}
      isListsOpen={isListsOpen}
      onListsClose={() => setIsListsOpen(!isListsOpen)}
      isMenuOpen={isMenuOpen}
      onMenuClose={() => setIsMenuOpen(!isMenuOpen)}
      activeLists={activeLists}
      activeTab={activeTab}
      onTabChange={onTabChange}
    />
  );
}
