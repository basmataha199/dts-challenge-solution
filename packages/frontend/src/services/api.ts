import axios from 'axios';
import { Task, CreateTaskInput, UpdateTaskStatusInput } from '../types/task';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskService = {
  createTask: async (input: CreateTaskInput): Promise<Task> => {
    const response = await api.post<Task>('/tasks', input);
    return response.data;
  },

  getAllTasks: async (): Promise<Task[]> => {
    const response = await api.get<Task[]>('/tasks');
    return response.data;
  },

  getTaskById: async (id: number): Promise<Task> => {
    const response = await api.get<Task>(`/tasks/${id}`);
    return response.data;
  },

  updateTaskStatus: async (id: number, input: UpdateTaskStatusInput): Promise<Task> => {
    const response = await api.put<Task>(`/tasks/${id}`, input);
    return response.data;
  },

  deleteTask: async (id: number): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};
