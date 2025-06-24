import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { AppState } from 'react-native'
import 'react-native-url-polyfill/auto'

const supabaseUrl = 'https://mdpoykijwxizndojjedu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kcG95a2lqd3hpem5kb2pqZWR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MTI4NDEsImV4cCI6MjA2NjE4ODg0MX0.PzOhtmX7teoaUmZlIT5ZlKrdZCOf_84ilHZq2UHJDfc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

// Auto-refresh session when app becomes active
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})
