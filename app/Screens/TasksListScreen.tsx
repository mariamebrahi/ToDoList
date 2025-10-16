


import { useRouter } from 'expo-router';
import React from 'react';
import { Button, FlatList, Text, TouchableOpacity, View } from 'react-native';

export default function TasksListScreen() {
    const tasks = ['to do task1', 'to do task2', 'to do task3', 'to do task4', 'to do task5']
    const router = useRouter();
    const handlePressOnAddNewTask= () => {
      console.log("handlePressOnAddNewTask");
      router.push('/Screens/NewTaskScreen')
    }
     const handleTaskClick = (task:string) => {
      console.log('task clicked:', task);
            router.push({
              pathname: '/Screens/TaskDetailsScreen',
              params: { taskObject: task },    
            })

    };

  return (
    <View style={{ flex: 1, padding: 20 }}>

      <Text>TasksList</Text>

      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleTaskClick(item)}>
              <View>
                <Text style={{ fontSize: 18, marginVertical: 8 }}>{item}</Text>
              </View>
            </TouchableOpacity>
        )}
      />

      <Button title='Add New' onPress={handlePressOnAddNewTask}/>
      
    </View>
  )
}



