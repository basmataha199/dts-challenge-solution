import { useState } from 'react';
import { z } from 'zod';
import { CreateTaskInput } from '../types/task';
import { useTasks } from '../hooks/useTasks';

const taskFormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().optional(),
  status: z.enum(['pending', 'in-progress', 'completed']),
  dueAt: z.string().min(1, 'Due date is required'),
});

export const TaskForm: React.FC = () => {
  const { createTask } = useTasks();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending' as const,
    dueAt: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      taskFormSchema.parse(formData);
      setIsSubmitting(true);

      const input: CreateTaskInput = {
        title: formData.title,
        description: formData.description || undefined,
        status: formData.status,
        dueAt: new Date(formData.dueAt).toISOString(),
      };

      await createTask(input);

      setFormData({
        title: '',
        description: '',
        status: 'pending',
        dueAt: '',
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path) {
            fieldErrors[error.path[0]] = error.message;
          }
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Create New Task</h2>

      <div style={styles.formGroup}>
        <label htmlFor="title" style={styles.label}>Title</label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          style={styles.input}
          disabled={isSubmitting}
        />
        {errors.title && <span style={styles.error}>{errors.title}</span>}
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="description" style={styles.label}>Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          style={{ ...styles.input, minHeight: '100px' }}
          disabled={isSubmitting}
        />
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="status" style={styles.label}>Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          style={styles.input}
          disabled={isSubmitting}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        {errors.status && <span style={styles.error}>{errors.status}</span>}
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="dueAt" style={styles.label}>Due Date</label>
        <input
          id="dueAt"
          type="datetime-local"
          name="dueAt"
          value={formData.dueAt}
          onChange={handleChange}
          style={styles.input}
          disabled={isSubmitting}
        />
        {errors.dueAt && <span style={styles.error}>{errors.dueAt}</span>}
      </div>

      <button type="submit" style={styles.button} disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create Task'}
      </button>
    </form>
  );
};

const styles = {
  form: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
  } as React.CSSProperties,
  formGroup: {
    marginBottom: '15px',
  } as React.CSSProperties,
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#333',
  } as React.CSSProperties,
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    fontFamily: 'inherit',
  } as React.CSSProperties,
  error: {
    display: 'block',
    color: '#e74c3c',
    fontSize: '12px',
    marginTop: '5px',
  } as React.CSSProperties,
  button: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
  } as React.CSSProperties,
};
