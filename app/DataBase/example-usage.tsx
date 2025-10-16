import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, Text, TextInput, View } from 'react-native';
import { addTask, deleteTask, getTaskById, getTasks, updateTask, updateTaskStatus } from './DataBaseHelper';
import { Task } from './types';

// Example component showing how to use the database
export const TaskManagerExample: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  // Load tasks when component mounts
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    getTasks((loadedTasks) => {
      setTasks(loadedTasks);
    });
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Omit<Task, 'id'> = {
        title: newTaskTitle.trim(),
        description: newTaskDescription.trim(),
        isDone: false,
      };

      addTask(newTask, () => {
        setNewTaskTitle('');
        setNewTaskDescription('');
        loadTasks(); // Reload tasks after adding
        Alert.alert('Success', 'Task added successfully!');
      });
    } else {
      Alert.alert('Error', 'Please enter a task title');
    }
  };

  const handleToggleTask = (id: number, currentStatus: boolean) => {
    updateTaskStatus(id, !currentStatus, () => {
      loadTasks(); // Reload tasks after updating
    });
  };

  const handleDeleteTask = (id: number) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteTask(id, () => {
              loadTasks(); // Reload tasks after deleting
              Alert.alert('Success', 'Task deleted successfully!');
            });
          },
        },
      ]
    );
  };

  const handleEditTask = (id: number) => {
    // Example: Get task by ID and show edit dialog
    getTaskById(id, (task) => {
      if (task) {
        Alert.prompt(
          'Edit Task',
          'Enter new title:',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Update',
              onPress: (newTitle) => {
                if (newTitle && newTitle.trim()) {
                  updateTask(id, { title: newTitle.trim(), description: task.description }, () => {
                    loadTasks();
                    Alert.alert('Success', 'Task updated successfully!');
                  });
                }
              },
            },
          ],
          'plain-text',
          task.title
        );
      }
    });
  };

  const renderTask = ({ item }: { item: Task }) => (
    <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.title}</Text>
      <Text style={{ fontSize: 14, color: '#666' }}>{item.description}</Text>
      <Text style={{ fontSize: 12, color: item.isDone ? 'green' : 'red' }}>
        Status: {item.isDone ? 'Completed' : 'Pending'}
      </Text>
      <View style={{ flexDirection: 'row', marginTop: 5 }}>
        <Button
          title={item.isDone ? 'Mark Pending' : 'Mark Done'}
          onPress={() => handleToggleTask(item.id!, item.isDone)}
        />
        <Button title="Edit" onPress={() => handleEditTask(item.id!)} />
        <Button title="Delete" onPress={() => handleDeleteTask(item.id!)} color="red" />
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Task Manager
      </Text>

      {/* Add new task form */}
      <View style={{ marginBottom: 20 }}>
        <TextInput
          placeholder="Task title"
          value={newTaskTitle}
          onChangeText={setNewTaskTitle}
          style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        />
        <TextInput
          placeholder="Task description"
          value={newTaskDescription}
          onChangeText={setNewTaskDescription}
          style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
          multiline
        />
        <Button title="Add Task" onPress={handleAddTask} />
      </View>

      {/* Tasks list */}
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id?.toString() || ''}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20, color: '#666' }}>
            No tasks yet. Add your first task above!
          </Text>
        }
      />
    </View>
  );
};
