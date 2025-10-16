import * as SQLite from 'expo-sqlite';
import { Task } from './types';

// Initialize database
const db = SQLite.openDatabase('tasks.db');

// Initialize database table
const initDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        isDone INTEGER
      );`,
      [],
      () => console.log('Database initialized successfully'),
      (_, error) => {
        console.error('Database initialization error:', error);
        return false;
      }
    );
  });
};

// Initialize the database when the module loads
initDatabase();

export const getTasks = (callback: (tasks: Task[]) => void): void => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM tasks;',
      [],
      (_, result) => {
        const tasks: Task[] = result.rows._array.map((row: any) => ({
          id: row.id,
          title: row.title,
          description: row.description,
          isDone: !!row.isDone,
        }));
        callback(tasks);
      },
      (_, error) => {
        console.error('Error fetching tasks:', error);
        return false;
      }
    );
  });
};

/** Add new task */
export const addTask = (task: Omit<Task, 'id'>, callback?: () => void): void => {
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO tasks (title, description, isDone) VALUES (?, ?, ?);',
      [task.title, task.description, task.isDone ? 1 : 0],
      () => callback?.(),
      (_, error) => {
        console.error('Error adding task:', error);
        return false;
      }
    );
  });
};

/** Update isDone status */
export const updateTaskStatus = (id: number, isDone: boolean, callback?: () => void): void => {
  db.transaction((tx) => {
    tx.executeSql(
      'UPDATE tasks SET isDone = ? WHERE id = ?;',
      [isDone ? 1 : 0, id],
      () => callback?.(),
      (_, error) => {
        console.error('Error updating task status:', error);
        return false;
      }
    );
  });
};

/** Update task (title and description) */
export const updateTask = (id: number, task: Pick<Task, 'title' | 'description'>, callback?: () => void): void => {
  db.transaction((tx) => {
    tx.executeSql(
      'UPDATE tasks SET title = ?, description = ? WHERE id = ?;',
      [task.title, task.description, id],
      () => callback?.(),
      (_, error) => {
        console.error('Error updating task:', error);
        return false;
      }
    );
  });
};

/** Delete task */
export const deleteTask = (id: number, callback?: () => void): void => {
  db.transaction((tx) => {
    tx.executeSql(
      'DELETE FROM tasks WHERE id = ?;',
      [id],
      () => callback?.(),
      (_, error) => {
        console.error('Error deleting task:', error);
        return false;
      }
    );
  });
};

/** Get a single task by ID */
export const getTaskById = (id: number, callback: (task: Task | null) => void): void => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM tasks WHERE id = ?;',
      [id],
      (_, result) => {
        if (result.rows.length > 0) {
          const row = result.rows.item(0);
          const task: Task = {
            id: row.id,
            title: row.title,
            description: row.description,
            isDone: !!row.isDone,
          };
          callback(task);
        } else {
          callback(null);
        }
      },
      (_, error) => {
        console.error('Error fetching task by ID:', error);
        callback(null);
        return false;
      }
    );
  });
};