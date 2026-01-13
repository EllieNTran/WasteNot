import { supabase } from './supabase';

export const signUp = async (email: string, password: string, fullName: string) => {
  console.log('Attempting signup for:', email);
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });
  
  if (error) {
    console.error('Signup error:', error);
  } else {
    console.log('Signup success:', data);
  }
  
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  console.log('Attempting login for:', email);
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
    console.error('Login error details:', {
      message: error.message,
      status: error.status,
      name: error.name,
    });
  } else {
    console.log('Login success:', data.user?.email);
  }
  
  return { data, error };
};

export const signOut = async () => {
  console.log('signOut: Starting sign out process');
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log('signOut: Error occurred:', error.message);
    // If session is already missing, that's fine - user is already logged out
    if (error.message === 'Auth session missing!') {
      return { error: null };
    }
  } else {
    console.log('signOut: Successfully signed out');
  }
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

export const getSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  return { session, error };
};
