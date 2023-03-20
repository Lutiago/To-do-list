import { create } from "zustand";

const API_URL =
  "https://assets.breatheco.de/apis/fake/todos/user/Lutiago";

export const useTodoList = create((set, get) => ({
  task: "",
  list: [],
  synchronized: false,

  changeTask: (value) => {
    set({ task: value });
  },

  addTask: () => {
    set((store) => ({
      list: [...store.list, { label: store.task, done: false }],
      task: "",
    }));
    get().updateDataAPI();
  },

  completeTask: (index) => {
    set((store) => {
      const newList = [...store.list];
      newList[index].done = true;
      return { list: newList };
    });
    get().updateDataAPI();
  },

  getTodosFromAPI: () => {
    const options = { method: "GET" };

    fetch(API_URL, options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        set({ list: data, synchronized: true });
      });
  },

  updateDataAPI: () => {
    const { list } = get();

    fetch(API_URL, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(list),
    }).then((response) => {
      if (response.status === 200) {
        set({ synchronized: true });
      } else {
        set({ synchronized: false });
      }
    });
  },
}));