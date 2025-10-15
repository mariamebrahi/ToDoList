import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';


export default function LoginScreen() {

     const handlePressOnLogin= () => {
        console.log("handlePressOnLogin");
    }
const [email, setEmail] = useState("");
const [password, setpassword] = useState("");


  return (
    <View>
      <Text>Login</Text>

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

      <Button title='Login' onPress={handlePressOnLogin}/>

    </View>
  )
}

const styles = StyleSheet.create({})