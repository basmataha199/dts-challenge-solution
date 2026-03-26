export type Task = {
  id: number;
  title: string;
  description: string | null;
  status: 'pending' | 'in-progress' | 'completed';
  dueAt: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateTaskInput = {
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed';
  dueAt: string;
};

export type UpdateTaskStatusInput = {
  status: 'pending' | 'in-progress' | 'completed';
};
