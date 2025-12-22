import { supabase } from './supabase';
import { IngredientType, IngredientStatus } from '@/src/types/database.types';

export interface Ingredient {
  id: string;
  user_id: string;
  name: string;
  amount: string | null;
  type: IngredientType | null;
  status: IngredientStatus;
  expiry_date: string | null;
  image_path: string | null;
  confidence: number | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface IngredientInsert {
  user_id: string;
  name: string;
  amount?: string | null;
  type?: IngredientType | null;
  status?: IngredientStatus;
  expiry_date?: string | null;
  image_path?: string | null;
  confidence?: number | null;
}

export interface IngredientUpdate {
  name?: string;
  amount?: string | null;
  type?: IngredientType | null;
  status?: IngredientStatus;
  expiry_date?: string | null;
  image_path?: string | null;
  confidence?: number | null;
}

// Get all available ingredients for a user
export const getIngredients = async (userId: string) => {
  const { data, error } = await supabase
    .from('ingredients')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'available')
    .is('deleted_at', null)
    .order('expiry_date', { ascending: true });
  
  return { data: data as Ingredient[] | null, error };
};

// Get ingredients expiring soon (within 3 days)
export const getExpiringSoon = async (userId: string) => {
  const threeDaysFromNow = new Date();
  threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
  
  const { data, error } = await supabase
    .from('ingredients')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'available')
    .is('deleted_at', null)
    .lte('expiry_date', threeDaysFromNow.toISOString().split('T')[0])
    .order('expiry_date', { ascending: true });
  
  return { data: data as Ingredient[] | null, error };
};

// Get ingredients by type
export const getIngredientsByType = async (userId: string, type: string) => {
  const { data, error } = await supabase
    .from('ingredients')
    .select('*')
    .eq('user_id', userId)
    .eq('type', type)
    .eq('status', 'available')
    .is('deleted_at', null);
  
  return { data: data as Ingredient[] | null, error };
};

// Add new ingredient
export const addIngredient = async (ingredient: IngredientInsert) => {
  const { data, error } = await supabase
    .from('ingredients')
    .insert(ingredient)
    .select()
    .single();
  
  return { data: data as Ingredient | null, error };
};

// Update ingredient
export const updateIngredient = async (id: string, updates: IngredientUpdate) => {
  const { data, error } = await supabase
    .from('ingredients')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  return { data: data as Ingredient | null, error };
};

// Delete ingredient (soft delete)
export const deleteIngredient = async (id: string) => {
  const { data, error } = await supabase
    .from('ingredients')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  return { data: data as Ingredient | null, error };
};

// Mark ingredient as used
export const markAsUsed = async (id: string) => {
  return updateIngredient(id, { status: 'used' });
};

// Mark ingredient as discarded
export const markAsDiscarded = async (id: string) => {
  return updateIngredient(id, { status: 'discarded' });
};

// Get ingredient statistics
export const getIngredientStats = async (userId: string) => {
  const { data: available } = await supabase
    .from('ingredients')
    .select('id', { count: 'exact' })
    .eq('user_id', userId)
    .eq('status', 'available')
    .is('deleted_at', null);

  const { data: used } = await supabase
    .from('ingredients')
    .select('id', { count: 'exact' })
    .eq('user_id', userId)
    .eq('status', 'used');

  const { data: discarded } = await supabase
    .from('ingredients')
    .select('id', { count: 'exact' })
    .eq('user_id', userId)
    .eq('status', 'discarded');

  return {
    available: available?.length || 0,
    used: used?.length || 0,
    discarded: discarded?.length || 0,
  };
};