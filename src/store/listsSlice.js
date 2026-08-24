import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://to-do-tasks-api.bonto.run";

const normalizeList = (list) => ({
  ...list,
  id: list._id,
  tasks: list.tasks.map((task) => ({ ...task, id: task._id })),
});

export const fetchLists = createAsyncThunk(
  "lists/fetchLists",
  async (_, { getState }) => {
    const token = getState().auth.token;
    const response = await fetch(`${API_URL}/lists`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const rawData = await response.json();
    const data = rawData.map(normalizeList);

    const sortedLists = [...data].sort((a, b) =>
      a.title === "My Tasks" ? -1 : b.title === "My Tasks" ? 1 : 0,
    );
    return sortedLists;
  },
);

export const addNewList = createAsyncThunk(
  "lists/addNewList",
  async ({ title }, { getState }) => {
    const token = getState().auth.token;
    const response = await fetch(`${API_URL}/lists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title }),
    });
    const newList = normalizeList(await response.json());
    return newList;
  },
);

export const updateList = createAsyncThunk(
  "lists/updateList",
  async ({ listId, newTitle, isChecked }, { getState }) => {
    const token = getState().auth.token;
    let body = {};

    if (newTitle !== undefined) {
      body.newTitle = newTitle;
    }

    if (isChecked !== undefined) {
      const list = getState().lists.items.find((l) => l.id === listId);
      body.isChecked = list.isChecked;
    }

    const response = await fetch(`${API_URL}/lists/${listId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const updatedList = normalizeList(await response.json());
    return updatedList;
  },
);

export const deleteList = createAsyncThunk(
  "lists/deleteList",
  async (listId, { getState }) => {
    const token = getState().auth.token;
    await fetch(`${API_URL}/lists/${listId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    return listId;
  },
);

export const addTask = createAsyncThunk(
  "lists/addTask",
  async ({ listId, taskTitle, isStarred = false }, { getState }) => {
    const token = getState().auth.token;
    const response = await fetch(`${API_URL}/lists/${listId}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: taskTitle, isStarred }),
    });
    const updatedList = normalizeList(await response.json());
    return updatedList;
  },
);

export const updateTask = createAsyncThunk(
  "lists/updateTask",
  async (
    { listId, taskId, newTitle, isCompleted, isStarred },
    { getState },
  ) => {
    const token = getState().auth.token;
    let body = {};

    const list = getState().lists.items.find((l) => l.id === listId);
    const task = list.tasks.find((t) => t.id === taskId);

    if (newTitle !== undefined) {
      body.newTitle = newTitle;
    }

    if (isStarred !== undefined) {
      body.isStarred = task.isStarred;
    }

    if (isStarred !== undefined && isCompleted !== undefined) {
      body.isStarred = task.isStarred;
      body.isCompleted = task.isCompleted;
    }

    const response = await fetch(`${API_URL}/lists/${listId}/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const updatedList = normalizeList(await response.json());
    return updatedList;
  },
);

export const deleteTask = createAsyncThunk(
  "lists/deleteTask",
  async ({ listId, taskId }, { getState }) => {
    const token = getState().auth.token;
    await fetch(`${API_URL}/lists/${listId}/tasks/${taskId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    return { listId, taskId };
  },
);

export const deleteCompletedListTasks = createAsyncThunk(
  "lists/deleteCompletedListTasks",
  async (listId, { getState }) => {
    const token = getState().auth.token;
    const response = await fetch(`${API_URL}/lists/${listId}/tasks/completed`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const updatedList = normalizeList(await response.json());
    return updatedList;
  },
);

export const moveTaskToList = createAsyncThunk(
  "lists/moveTaskToList",
  async ({ movingListId, currentListId, taskId }, { getState }) => {
    const token = getState().auth.token;
    const response = await fetch(
      `${API_URL}/lists/${currentListId}/tasks/${taskId}/move`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          movingListId,
        }),
      },
    );
    const updatedList = normalizeList(await response.json());

    return { updatedList, movingListId, currentListId, taskId };
  },
);

const listsSlice = createSlice({
  name: "lists",
  initialState: {
    items: [],
    isLoading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(addNewList.fulfilled, (state, action) => {
        state.items = [...state.items, action.payload];
      })
      .addCase(updateList.fulfilled, (state, action) => {
        state.items = state.items.map((list) =>
          list.id === action.payload.id ? action.payload : list,
        );
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        state.items = state.items.filter((list) => list.id !== action.payload);
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.items = state.items.map((list) =>
          list.id === action.payload.id ? action.payload : list,
        );
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.items = state.items.map((list) =>
          list.id === action.payload.id ? action.payload : list,
        );
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.map((list) =>
          list.id === action.payload.listId
            ? {
                ...list,
                tasks: list.tasks.filter(
                  (task) => task.id !== action.payload.taskId,
                ),
              }
            : list,
        );
      })
      .addCase(deleteCompletedListTasks.fulfilled, (state, action) => {
        state.items = state.items.map((list) =>
          list.id === action.payload.id ? action.payload : list,
        );
      })
      .addCase(moveTaskToList.fulfilled, (state, action) => {
        state.items = state.items.map((list) =>
          list.id === action.payload.currentListId
            ? {
                ...list,
                tasks: list.tasks.filter(
                  (task) => task.id !== action.payload.taskId,
                ),
              }
            : list,
        );
        state.items = state.items.map((list) =>
          list.id === action.payload.movingListId
            ? action.payload.updatedList
            : list,
        );
      });
  },
});

export default listsSlice;
