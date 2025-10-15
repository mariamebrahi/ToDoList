import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function SignupScreen() {

         const handlePressOnSignup= () => {
            console.log("handlePressOnSignup");
        }
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");

  return (
    <View>
        <Text>Signup</Text>

        <TextInput placeholder='Name'
        value={name}
                onChangeText={setName}
              >
              </TextInput>
        <TextInput placeholder='Email'
        value={email}
                onChangeText={setEmail}
              >
              </TextInput>
        
              <TextInput placeholder='Password'
                value={password}
                onChangeText={setpassword}
              >
              </TextInput>
              
              <Button title='Signup' onPress={handlePressOnSignup}/>
        
      
    </View>
  )
}

const styles = StyleSheet.create({})