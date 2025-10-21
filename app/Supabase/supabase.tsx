import { createClient } from '@supabase/supabase-js';
import 'expo-sqlite/localStorage/install';
//import 'react-native-url-polyfill/auto';

const supabaseUrl = "https://uwhhaljvjsyynnrqwrlh.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3aGhhbGp2anN5eW5ucnF3cmxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2NjY3NDIsImV4cCI6MjA3NjI0Mjc0Mn0.qUfoeA5e9AUxcmz_sHkcM_lxB1aJ1dzZxZGh9oN56_0";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3aGhhbGp2anN5eW5ucnF3cmxoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDY2Njc0MiwiZXhwIjoyMDc2MjQyNzQyfQ.qXyDkc7WNdW9AhrevQsjhEmBa7QbrJxhmxmQMoaPjk4"
export const supabase = createClient(supabaseUrl, key, {
  auth: {
    storage: localStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

