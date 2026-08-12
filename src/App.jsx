import { useState, useEffect } from "react";
import Header from "./components/Header";
import AllTasksPanel from "./components/AllTasksPanel";
import ListPanel from "./components/ListPanel";
import NewListForm from "./components/NewListForm";
import AllListsHidden from "./components/AllListsHidden";
import CreateTaskPanel from "./CreateTaskPanel";
import TabNav from "./TabNav";
import StarredTasksPanel from "./StarredTasksPanel";
const API_URL = "https://to-do-tasks-api.bonto.run"; 

function Main({
  onAddListClick,
  isListModalOpen,
  onListModalClose,
  onAddNewList,
  lists,
  isListsOpen,
  onListsClose,
  isMenuOpen,
  onMenuClose,
  onCheckedClose,
  onAddTask,
  onEditTaskTitle,
  onMarkToggle,
  onDeleteClick,
  activeLists,
  onRenameList,
  onDeleteList,
  onDeleteCompletedTasks,
  onDeleteTask,
  onMoveTaskToList,
  onCreateTask,
  activeTab,
  onTabChange,
  onStarredTaskClick,
  onAddStarredTask,
}) {
  return (
    <div className="h-screen w-screen flex md:flex-col items-stretch bg-[#1c1c1c] text-white font-sans pt-3 pr-4">
      <Header onMenuClose={onMenuClose} />
      <div className="flex-1 flex">
        {isMenuOpen && (
          <div className="w-65 h-132 p-3 flex flex-col overflow-y-auto scrollbar-none">
            <div className="pl-1">
              <CreateTaskPanel lists={lists} onCreateTask={onCreateTask} />
            </div>
            <TabNav activeTab={activeTab} onTabChange={onTabChange} />
            <div className="w-full max-w-65 bg-[#1c1c1c] text-white select-none font-sans p-2 ">
              <ListPanel
                lists={lists}
                isListsOpen={isListsOpen}
                onListsClose={onListsClose}
                onCheckedClose={onCheckedClose}
                onAddListClick={onAddListClick}
              />
              <NewListForm
                isListModalOpen={isListModalOpen}
                onListModalClose={onListModalClose}
                onAddNewList={onAddNewList}
                titleText="Create new list"
              />
            </div>
          </div>
        )}

        <main className="flex-1 h-full pl-0 pr-2 min-w-0 ">
          {activeTab === "starred" && (
            <StarredTasksPanel
              lists={lists}
              onMarkToggle={onMarkToggle}
              onDeleteTask={onDeleteTask}
              onMoveTaskToList={onMoveTaskToList}
              onStarredTaskClick={onStarredTaskClick}
              onAddStarredTask={onAddStarredTask}
            />
          )}
          {activeTab === "all" && (
            <>
              {activeLists.length === 0 && <AllListsHidden />}
              {activeLists.length > 0 && (
                <AllTasksPanel
                  lists={lists}
                  onAddTask={onAddTask}
                  onEditTaskTitle={onEditTaskTitle}
                  onMarkToggle={onMarkToggle}
                  onDeleteClick={onDeleteClick}
                  onRenameList={onRenameList}
                  onDeleteList={onDeleteList}
                  onDeleteCompletedTasks={onDeleteCompletedTasks}
                  onDeleteTask={onDeleteTask}
                  onMoveTaskToList={onMoveTaskToList}
                  onStarredTaskClick={onStarredTaskClick}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("all");
  const onTabChange = (tabText) => {
    setActiveTab(tabText);
  };
  const [isListModalOpen, setisListModalOpen] = useState(false);
  const [lists, setLists] = useState([]);

  const normalizeList = (list) => ({
    ...list,
    id: list._id,
    tasks: list.tasks.map((task) => ({ ...task, id: task._id })),
  });

  useEffect(() => {
  const fetchLists = async () => {
    const response = await fetch(`${API_URL}/lists`);
    const rawData = await response.json();
    const data = rawData.map(normalizeList);

    const sortedLists = [...data].sort((a, b) =>
      a.title === "My Tasks" ? -1 : b.title === "My Tasks" ? 1 : 0,
    );
    setLists(sortedLists);
  };
  fetchLists();
}, []);

  const [isListsOpen, setIsListsOpen] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const onAddNewList = async ({ title }) => {
    const response = await fetch(`${API_URL}/lists`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    const newList = normalizeList(await response.json());
    setLists([...lists, newList]);
  };

  const activeLists = lists.filter((list) => list.isChecked);

  const onCheckedClose = async (listId) => {
    const list = lists.find((list) => list.id === listId);
    const response = await fetch(`${API_URL}/lists/${listId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isChecked: list.isChecked }),
    });
    const updatedList = normalizeList(await response.json());
    setLists(lists.map((list) => (list.id === listId ? updatedList : list)));
  };

  const onRenameList = async (listId, newTitle) => {
    const response = await fetch(`${API_URL}/lists/${listId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newTitle }),
    });
    const updatedList = normalizeList(await response.json());
    setLists(lists.map((list) => (list.id === listId ? updatedList : list)));
  };

  const onDeleteList = async (listId) => {
    await fetch(`${API_URL}/lists/${listId}`, {
      method: "DELETE",
    });
    setLists(lists.filter((list) => list.id !== listId));
  };

  const onAddTask = async (listId, taskTitle) => {
    const response = await fetch(
      `${API_URL}/lists/${listId}/tasks`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: taskTitle }),
      },
    );
    const updatedList = normalizeList(await response.json());

    setLists(lists.map((list) => (list.id === listId ? updatedList : list)));
  };

  const onCreateTask = async (listId, taskTitle) => {
    const response = await fetch(
      `${API_URL}/lists/${listId}/tasks`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: taskTitle }),
      },
    );
    const updatedList = normalizeList(await response.json());

    setLists(lists.map((list) => (list.id === listId ? updatedList : list)));
  };

  const onAddStarredTask = async (listId, taskTitle) => {
    const response = await fetch(
      `${API_URL}/lists/${listId}/tasks`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: taskTitle, isStarred: true }),
      },
    );
    const updatedList = normalizeList(await response.json());

    setLists(lists.map((list) => (list.id === listId ? updatedList : list)));
  };

  const onEditTaskTitle = async (listId, taskId, newTitle) => {
    const response = await fetch(
      `${API_URL}/lists/${listId}/tasks/${taskId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newTitle }),
      },
    );

    const updatedList = normalizeList(await response.json());

    setLists(lists.map((list) => (list.id === listId ? updatedList : list)));
  };

  const onMarkToggle = async (listId, taskId) => {
    const list = lists.find((list) => list.id === listId);
    const task = list.tasks.find((task) => task.id === taskId);
    const response = await fetch(
      `${API_URL}/lists/${listId}/tasks/${taskId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isCompleted: task.isCompleted,
          isStarred: task.isStarred,
        }),
      },
    );

    const updatedList = normalizeList(await response.json());

    setLists(lists.map((list) => (list.id === listId ? updatedList : list)));
  };

  const onStarredTaskClick = async (listId, taskId) => {
    const list = lists.find((list) => list.id === listId);
    const task = list.tasks.find((task) => task.id === taskId);
    const response = await fetch(
      `${API_URL}/lists/${listId}/tasks/${taskId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isStarred: task.isStarred,
        }),
      },
    );

    const updatedList = normalizeList(await response.json());

    setLists(lists.map((list) => (list.id === listId ? updatedList : list)));
  };

  const onDeleteClick = async (listId, taskId) => {
    await fetch(`${API_URL}/lists/${listId}/tasks/${taskId}`, {
      method: "DELETE",
    });

    setLists(
      lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.filter((task) => task.id !== taskId),
            }
          : list,
      ),
    );
  };

  const onDeleteTask = async (listId, taskId) => {
    await fetch(`${API_URL}/lists/${listId}/tasks/${taskId}`, {
      method: "DELETE",
    });

    setLists(
      lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.filter((task) => task.id !== taskId),
            }
          : list,
      ),
    );
  };

  const onDeleteCompletedTasks = async (listId) => {
    const response = await fetch(
      `${API_URL}/lists/${listId}/tasks/completed`,
      {
        method: "DELETE",
      },
    );
    const updatedList = normalizeList(await response.json());
    setLists(lists.map((list) => (list.id === listId ? updatedList : list)));
  };

  const onMoveTaskToList = async (movingListId, currentListId, taskId) => {
    const response = await fetch(
      `${API_URL}/lists/${currentListId}/tasks/${taskId}/move`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          movingListId,
        }),
      },
    );
    const updatedList = normalizeList(await response.json());

    setLists(
      lists.map((list) => {
        if (list.id === currentListId) {
          return {
            ...list,
            tasks: list.tasks.filter((task) => task.id !== taskId),
          };
        }
        if (list.id === movingListId) {
          return updatedList;
        }
        return list;
      }),
    );
  };

  return (
    <Main
      onAddListClick={() => setisListModalOpen(!isListModalOpen)}
      isListModalOpen={isListModalOpen}
      onListModalClose={() => setisListModalOpen(!isListModalOpen)}
      onAddNewList={onAddNewList}
      lists={lists}
      isListsOpen={isListsOpen}
      onListsClose={() => setIsListsOpen(!isListsOpen)}
      isMenuOpen={isMenuOpen}
      onMenuClose={() => setIsMenuOpen(!isMenuOpen)}
      onCheckedClose={onCheckedClose}
      onAddTask={onAddTask}
      onEditTaskTitle={onEditTaskTitle}
      onMarkToggle={onMarkToggle}
      onDeleteClick={onDeleteClick}
      activeLists={activeLists}
      onRenameList={onRenameList}
      onDeleteList={onDeleteList}
      onDeleteCompletedTasks={onDeleteCompletedTasks}
      onDeleteTask={onDeleteTask}
      onMoveTaskToList={onMoveTaskToList}
      onCreateTask={onCreateTask}
      activeTab={activeTab}
      onTabChange={onTabChange}
      onStarredTaskClick={onStarredTaskClick}
      onAddStarredTask={onAddStarredTask}
    />
  );
}
