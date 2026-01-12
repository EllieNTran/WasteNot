import { supabase } from './supabase';
import { Database } from '@/src/types/database.types';

type RecipeInsert = Database['public']['Tables']['recipes']['Insert'];
type RecipeUpdate = Database['public']['Tables']['recipes']['Update'];

export const getRecipes = async (userId: string) => {
  const { data, error } = await supabase
    .from('recipes')
    .select(`
      *,
      recipe_ingredients (
        id,
        name,
        amount,
        ingredient_id
      )
    `)
    .eq('user_id', userId)
    .is('deleted_at', null)
    .order('created_at', { ascending: false });
  
  return { data, error };
};

export const getFavoriteRecipes = async (userId: string) => {
  const { data, error } = await supabase
    .from('recipes')
    .select(`
      *,
      recipe_ingredients (
        id,
        name,
        amount,
        ingredient_id
      )
    `)
    .eq('user_id', userId)
    .eq('is_favorite', true)
    .is('deleted_at', null)
    .order('created_at', { ascending: false });
  
  return { data, error };
};

export const getRecipesByMealType = async (userId: string, mealType: string) => {
  const { data, error } = await supabase
    .from('recipes')
    .select(`
      *,
      recipe_ingredients (
        id,
        name,
        amount,
        ingredient_id
      )
    `)
    .eq('user_id', userId)
    .eq('meal_type', mealType)
    .is('deleted_at', null)
    .order('created_at', { ascending: false });
  
  return { data, error };
};

export const addRecipe = async (
  recipe: RecipeInsert,
  ingredients: { name: string; amount: string; ingredient_id?: string }[]
) => {
  const { data: recipeData, error: recipeError } = await supabase
    .from('recipes')
    .insert(recipe)
    .select()
    .single();
  
  if (recipeError) return { data: null, error: recipeError };
  
  const { error: ingredientsError } = await supabase
    .from('recipe_ingredients')
    .insert(
      ingredients.map(ing => ({
        recipe_id: recipeData.id,
        name: ing.name,
        amount: ing.amount,
        ingredient_id: ing.ingredient_id || null,
      }))
    );
  
  if (ingredientsError) return { data: null, error: ingredientsError };
  
  return { data: recipeData, error: null };
};

export const updateRecipe = async (id: string, updates: RecipeUpdate) => {
  const { data, error } = await supabase
    .from('recipes')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  return { data, error };
};

export const toggleFavorite = async (id: string, isFavorite: boolean) => {
  return updateRecipe(id, { is_favorite: isFavorite });
};

export const deleteRecipe = async (id: string) => {
  const { data, error } = await supabase
    .from('recipes')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  return { data, error };
};