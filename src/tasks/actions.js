import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../config";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  let response = await axios.get(`${API_BASE_URL}/tasks`);
  return response.data;
});

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId) => {
    await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
    return taskId;
  }
);

export const getTask = createAsyncThunk("tasks/getTask", async (taskId) => {
  let response = await axios.get(`${API_BASE_URL}/tasks/${taskId}`);
  return response.data;
});

export const completeTask = createAsyncThunk(
  "tasks/completeTask",
  async (task) => {
    let response = await axios.put(`${API_BASE_URL}/tasks/${task.id}`, task);
    return response.data;
  }
);

export const addTask = createAsyncThunk("tasks/addTask", async (task) => {
  let response = await axios.post(`${API_BASE_URL}/tasks`, task);
  return response.data;
});

export const updateTask = createAsyncThunk("tasks/updateTask", async (task) => {
  let response = await axios.put(`${API_BASE_URL}/tasks/${task.id}`, task);
  return response.data;
});
