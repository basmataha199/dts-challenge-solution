import { useTasks } from '../hooks/useTasks';
import { TaskCard } from './TaskCard';

export const TaskList: React.FC = () => {
  const { tasks, loading, error } = useTasks();

  if (loading) {
    return <div style={styles.loadingContainer}>Loading tasks...</div>;
  }

  if (error) {
    return <div style={styles.errorContainer}>Error: {error}</div>;
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    const statusOrder = { 'pending': 0, 'in-progress': 1, 'completed': 2 };
    const statusDiff = statusOrder[a.status as keyof typeof statusOrder] - statusOrder[b.status as keyof typeof statusOrder];
    if (statusDiff !== 0) return statusDiff;
    return new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime();
  });

  return (
    <div style={styles.container}>
      <h2>Tasks</h2>
      {sortedTasks.length === 0 ? (
        <p style={styles.emptyMessage}>No tasks yet. Create one to get started!</p>
      ) : (
        <div>
          {sortedTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    flex: '1',
  } as React.CSSProperties,
  loadingContainer: {
    textAlign: 'center' as const,
    padding: '20px',
    color: '#7f8c8d',
  },
  errorContainer: {
    backgroundColor: '#fadbd8',
    border: '1px solid #e74c3c',
    color: '#c0392b',
    padding: '15px',
    borderRadius: '4px',
    marginBottom: '20px',
  } as React.CSSProperties,
  emptyMessage: {
    textAlign: 'center' as const,
    color: '#95a5a6',
    fontSize: '14px',
    padding: '20px',
  },
};
