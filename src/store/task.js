import { createSlice } from "@reduxjs/toolkit";
import todosService from "../services/todos.service";
import { setError } from "./errors";

const initialState = {entities: [], isLoading: true};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    recieved(state, action){
      state.entities = action.payload;
      state.isLoading = false;
    },
    update(state, action) {
      const elementIndex = state.entities.findIndex(el => el.id === action.payload.id);
      state.entities[elementIndex] = {...state.entities[elementIndex], ...action.payload};
    },
    remove(state, action) {
      state.entities = state.entities.filter(task => task.id !== action.payload.id);
    },
    add(state, action){
      state.entities = action.payload;
      state.isLoading = false;
    },
    taskRequested(state) {
      state.isLoading = true;
    },
    taskRequestFailed(state, action) {
      state.isLoading = false;
    }
  }
});

const { actions, reducer: taskReducer } = taskSlice;
const { update, remove, recieved, taskRequested, taskRequestFailed, add } = actions;

export const loadTasks = () => async (dispatch) => {
  dispatch(taskRequested("Запрос ушёл..."));
  try {
    const data = await todosService.fetch();
    dispatch(recieved(data));
  } catch (error) {
    dispatch(taskRequestFailed());
    dispatch(setError(error.message));
  }
}

export const completeTask = (id) => (dispatch) => {
  dispatch(update({id, completed: true}));
}

export const changeTitle = (id) => (dispatch) => {
  dispatch(update({id, title: `newTitle for id - ${id}`}));
}

export const deleteTask = (id) => (dispatch) => {
  dispatch(remove({id}));
}

export const addTask = () =>  async (dispatch, getState) => {
  const lim = getState().tasks.entities.length + 1;
  dispatch(taskRequested("Запрос ушёл ..."));
  try {
    const data = await todosService.add(lim);
    dispatch(add(data));
  } catch (error) {
    dispatch(taskRequestFailed());
    dispatch(setError(error.message));
  }
}

export const getTasks = () => (state) => state.tasks.entities;
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading;


export default taskReducer;  