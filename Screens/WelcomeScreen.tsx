import { StyleSheet, Text, Button, View } from 'react-native'
import React from 'react'

export default function WelcomeScreen() {

    const handlePressOnStart= () => {
        console.log("handlePressOnStart");
    }
    const handlePressOnLogin= () => {
        console.log("handlePressOnLogin");

    }
    const handlePressOnSignup= () => {
        console.log("handlePressOnSignup");

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

const styles = StyleSheet.create({})