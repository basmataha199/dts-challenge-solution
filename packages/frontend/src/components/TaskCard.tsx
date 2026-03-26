import { Task } from '../types/task';
import { useTasks } from '../hooks/useTasks';

type TaskCardProps = {
  task: Task;
};

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { updateTaskStatus, deleteTask } = useTasks();

  const handleStatusChange = async (newStatus: 'pending' | 'in-progress' | 'completed') => {
    await updateTaskStatus(task.id, { status: newStatus });
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this task?')) {
      await deleteTask(task.id);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#f39c12';
      case 'in-progress':
        return '#3498db';
      case 'completed':
        return '#27ae60';
      default:
        return '#95a5a6';
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>{task.title}</h3>
        <button onClick={handleDelete} style={styles.deleteButton}>
          Delete
        </button>
      </div>

      {task.description && (
        <p style={styles.description}>{task.description}</p>
      )}

      <div style={styles.meta}>
        <p>
          <strong>Due:</strong> {formatDate(task.dueAt)}
        </p>
        <p>
          <strong>Created:</strong> {formatDate(task.createdAt)}
        </p>
      </div>

      <div style={styles.statusSection}>
        <strong>Status:</strong>
        <div style={styles.statusButtons}>
          {(['pending', 'in-progress', 'completed'] as const).map((status) => (
            <button
              key={status}
              onClick={() => handleStatusChange(status)}
              style={{
                ...styles.statusButton,
                backgroundColor: task.status === status ? getStatusColor(status) : '#ecf0f1',
                color: task.status === status ? 'white' : '#333',
              }}
            >
              {status === 'in-progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'white',
    border: '1px solid #ecf0f1',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '15px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  } as React.CSSProperties,
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '10px',
  } as React.CSSProperties,
  title: {
    margin: '0',
    color: '#2c3e50',
    flex: '1',
  } as React.CSSProperties,
  deleteButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
  } as React.CSSProperties,
  description: {
    color: '#555',
    fontSize: '14px',
    marginBottom: '10px',
  } as React.CSSProperties,
  meta: {
    color: '#7f8c8d',
    fontSize: '13px',
    marginBottom: '10px',
  } as React.CSSProperties,
  statusSection: {
    marginTop: '10px',
  } as React.CSSProperties,
  statusButtons: {
    display: 'flex',
    gap: '8px',
    marginTop: '8px',
  } as React.CSSProperties,
  statusButton: {
    padding: '8px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold',
  } as React.CSSProperties,
};
