import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

export default function NewTaskScreen() {

         const handlePressOnSave= () => {
            console.log("handlePressOnSave");
        }
    const [title, setTitle] = useState("");
    const [description, setdescription] = useState("");


  return (
    <View>
      <Text>Add New Task</Text>

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
                 <Button title='Save' onPress={handlePressOnSave}/>
      
    </View>
  )
}

