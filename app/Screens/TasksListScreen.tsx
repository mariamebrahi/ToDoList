



import React from 'react'
import { FlatList, Text, View } from 'react-native'

export default function TasksListScreen() {
    const tasks = ['to do task1', 'to do task2', 'to do task3', 'to do task4', 'to do task5']

  return (
    <View style={{ flex: 1, padding: 20 }}>

      <Text>TasksList</Text>

      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
            <Text style={{ fontSize: 18, marginVertical: 8 }}>{item}</Text>
        )}
      />
      
    </View>
  )
}



