export type Task = {
  id: number;
  title: string;
  description: string | null;
  status: 'pending' | 'in-progress' | 'completed';
  dueAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateTaskInput = {
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed';
  dueAt: Date;
};

export type UpdateTaskStatusInput = {
  status: 'pending' | 'in-progress' | 'completed';
};
