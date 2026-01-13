import { supabase } from './supabase';
import { logger } from '@/src/utils/logger';

export const signUp = async (email: string, password: string, fullName: string) => {
  logger.debug('Attempting signup', { email });
  
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
    logger.error('Signup error', error);
  } else {
    logger.info('Signup success', data);
  }
  
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  logger.debug('Attempting login', { email });
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
    logger.error('Login error details', {
      message: error.message,
      status: error.status,
      name: error.name,
    });
  } else {
    logger.info('Login success', { email: data.user?.email });
  }
  
  return { data, error };
};

export const signOut = async () => {
  logger.debug('Starting sign out process');
  const { error } = await supabase.auth.signOut();
  if (error) {
    logger.warn('Sign out error occurred', { message: error.message });
    // If session is already missing, that's fine - user is already logged out
    if (error.message === 'Auth session missing!') {
      return { error: null };
    }
  } else {
    logger.info('Successfully signed out');
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
