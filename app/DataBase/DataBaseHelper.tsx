import * as SQLite from 'expo-sqlite';
import { Task } from './types';

// Initialize database
let db: SQLite.SQLiteDatabase;

// Initialize database table
const initDatabase = async () => {
  try {
    db = await SQLite.openDatabaseAsync('tasks.db');
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        isDone INTEGER
      );
    `);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
};

// Initialize the database when the module loads
initDatabase();

export const getTasks = async (callback: (tasks: Task[]) => void): Promise<void> => {
  try {
    const result = await db.getAllAsync('SELECT * FROM tasks;');
    const tasks: Task[] = result.map((row: any) => ({
      taskId: row.id,
      title: row.title,
      taskDescription: row.description,
      isDone: !!row.isDone,
    }));
    callback(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};

/** Add new task */
export const addTask = async (task: Omit<Task, 'id'>, callback?: () => void): Promise<void> => {
  try {
    await db.runAsync('INSERT INTO tasks (title, description, isDone) VALUES (?, ?, ?);', [task.title, task.taskDescription, task.isDone ? 1 : 0]);
    callback?.();
  } catch (error) {
    console.error('Error adding task:', error);
  }
};

/** Update isDone status */
export const updateTaskStatus = async (id: number, isDone: boolean, callback?: () => void): Promise<void> => {
  try {
    await db.runAsync('UPDATE tasks SET isDone = ? WHERE id = ?;', [isDone ? 1 : 0, id]);
    callback?.();
  } catch (error) {
    console.error('Error updating task status:', error);
  }
};

/** Update task (title and description) */
export const updateTask = async (id: number, task: Pick<Task, 'title' | 'taskDescription'>, callback?: () => void): Promise<void> => {
  try {
    await db.runAsync('UPDATE tasks SET title = ?, description = ? WHERE id = ?;', [task.title, task.taskDescription, id]);
    callback?.();
  } catch (error) {
    console.error('Error updating task:', error);
  }
};

/** Delete task */
export const deleteTask = async (id: number, callback?: () => void): Promise<void> => {
  try {
    await db.runAsync('DELETE FROM tasks WHERE id = ?;', [id]);
    callback?.();
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};

/** Get a single task by ID */
export const getTaskById = async (id: number, callback: (task: Task | null) => void): Promise<void> => {
  try {
    const result = await db.getFirstAsync('SELECT * FROM tasks WHERE id = ?;', [id]) as Task;
    if (result) {
      const task: Task = {
        taskId: result.taskId,
        title: result.title,
        taskDescription: result.taskDescription,
        isDone: !!result.isDone,
      };
      callback(task);
    } else {
      callback(null);
    }
  } catch (error) {
    console.error('Error fetching task by ID:', error);
    callback(null);
  }
};