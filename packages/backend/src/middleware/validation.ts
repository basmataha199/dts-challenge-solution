import { z } from 'zod';

const TaskStatusEnum = z.enum(['pending', 'in-progress', 'completed']);

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().optional(),
  status: TaskStatusEnum,
  dueAt: z.string().or(z.date()).transform((val) => {
    if (typeof val === 'string') {
      return new Date(val);
    }
    return val;
  }),
});

export const updateTaskStatusSchema = z.object({
  status: TaskStatusEnum,
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskStatusInput = z.infer<typeof updateTaskStatusSchema>;
