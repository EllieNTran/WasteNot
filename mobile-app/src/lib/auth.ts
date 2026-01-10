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
  const { error } = await supabase.auth.signOut();
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
