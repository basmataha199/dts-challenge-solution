import { useState, useContext, createContext, useCallback, useEffect } from 'react';
import { Task, CreateTaskInput, UpdateTaskStatusInput } from '../types/task';
import { taskService } from '../services/api';

type TasksContextType = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  createTask: (input: CreateTaskInput) => Promise<void>;
  updateTaskStatus: (id: number, input: UpdateTaskStatusInput) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await taskService.getAllTasks();
      setTasks(data);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = useCallback(async (input: CreateTaskInput) => {
    setError(null);
    try {
      const newTask = await taskService.createTask(input);
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (err) {
      setError('Failed to create task');
      console.error(err);
    }
  }, []);

  const updateTaskStatus = useCallback(async (id: number, input: UpdateTaskStatusInput) => {
    setError(null);
    try {
      const updatedTask = await taskService.updateTaskStatus(id, input);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? updatedTask : task
        )
      );
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
    }
  }, []);

  const deleteTask = useCallback(async (id: number) => {
    setError(null);
    try {
      await taskService.deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (err) {
      setError('Failed to delete task');
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <TasksContext.Provider value={{ tasks, loading, error, fetchTasks, createTask, updateTaskStatus, deleteTask }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks must be used within TasksProvider');
  }
  return context;
};
