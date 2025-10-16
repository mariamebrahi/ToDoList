import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

export default function TaskDetailsScreen() {

    const { taskObject } = useLocalSearchParams<{ taskObject?: string }>();

             const handlePressOnDone= () => {
                console.log("handlePressOnDone");
            }

                        const handlePressOnDelete= () => {
                console.log("handlePressOnDelete");
            }
        const [title, setTitle] = useState("");
        const [description, setdescription] = useState("");
  return (
    <View>
      <Text>Task: {taskObject} Details</Text>
      <TextInput placeholder='Email'
                    value={title}
                    onChangeText={setTitle}
                  >     
                  </TextInput>
      
                          <TextInput placeholder='Description'
                    value={description}
                    onChangeText={setdescription}
                    multiline 
                    numberOfLines={6}
                    textAlignVertical='top'
                  >
                  </TextInput>
                       <Button title='Done' onPress={handlePressOnDone}/>

                      <Button title='Delete' onPress={handlePressOnDelete}/>

    </View>
  )
}

