import { useRouter } from 'expo-router';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { supabase } from '../Supabase/supabase';
export default function WelcomeScreen() {

    const router = useRouter();


  const fetchTasks = async () => {
  const { data, error } = await supabase
    .from('task') // your table name
    .select('*'); // columns you want, * = all

    

  if (error) {
    console.error('Error fetching tasks:', error);
  } else {
    console.log('Fetched tasks:', data);
  }
};
    const handlePressOnStart= () => {
        console.log("**************************");
        //console.log(supabase);
        fetchTasks();
        console.log("**************************");
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