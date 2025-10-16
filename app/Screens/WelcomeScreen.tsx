import { useRouter } from 'expo-router';
import React from 'react';
import { Button, Text, View } from 'react-native';
export default function WelcomeScreen() {

    const router = useRouter();

    const handlePressOnStart= () => {
        console.log("handlePressOnStart");
        router.push('/Screens/TasksListScreen')
    }
    const handlePressOnLogin= () => {
        console.log("handlePressOnLogin");
        router.push('/Screens/LoginScreen')

    }
    const handlePressOnSignup= () => {
        console.log("handlePressOnSignup");
        router.push('/Screens/SignupScreen')

    }
  return (
    <View>
      <Text>WelcomeScreen</Text>
      <Button title='Start' onPress={handlePressOnStart}/>
      <Button title='Login' onPress={handlePressOnLogin}/>
      <Button title='Sign Up' onPress={handlePressOnSignup}/>

    </View>
  )
}