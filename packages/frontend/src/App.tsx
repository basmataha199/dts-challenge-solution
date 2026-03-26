import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';

export const App: React.FC = () => {
  return (
    <div style={styles.appContainer}>
      <header style={styles.header}>
        <h1>Task Management System</h1>
        <p style={styles.subtitle}>HMCTS Casework Task Manager</p>
      </header>

      <main style={styles.mainContainer}>
        <div style={styles.sidebar}>
          <TaskForm />
        </div>

        <div style={styles.content}>
          <TaskList />
        </div>
      </main>
    </div>
  );
};

const styles = {
  appContainer: {
    minHeight: '100vh',
    backgroundColor: '#ecf0f1',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  } as React.CSSProperties,
  header: {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '30px',
    textAlign: 'center' as const,
  },
  subtitle: {
    margin: '10px 0 0 0',
    fontSize: '14px',
    opacity: 0.8,
  } as React.CSSProperties,
  mainContainer: {
    display: 'flex',
    maxWidth: '1200px',
    margin: '0 auto',
    gap: '30px',
    padding: '30px',
  } as React.CSSProperties,
  sidebar: {
    width: '350px',
    flexShrink: 0,
  } as React.CSSProperties,
  content: {
    flex: '1',
    minWidth: '0',
  } as React.CSSProperties,
};
