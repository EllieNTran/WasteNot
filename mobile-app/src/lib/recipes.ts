import { supabase } from './supabase';
import { Database } from '@/src/types/database.types';

type Recipe = Database['public']['Tables']['recipes']['Row'];
type RecipeInsert = Database['public']['Tables']['recipes']['Insert'];
type RecipeUpdate = Database['public']['Tables']['recipes']['Update'];
type RecipeIngredientInsert = Database['public']['Tables']['recipe_ingredients']['Insert'];

// Get all recipes for a user
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

// Get favorite recipes
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

// Get recipes by meal type
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

// Add new recipe with ingredients
export const addRecipe = async (
  recipe: RecipeInsert,
  ingredients: Array<{ name: string; amount: string; ingredient_id?: string }>
) => {
  // Insert recipe
  const { data: recipeData, error: recipeError } = await supabase
    .from('recipes')
    .insert(recipe)
    .select()
    .single();
  
  if (recipeError) return { data: null, error: recipeError };
  
  // Insert recipe ingredients
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

// Update recipe
export const updateRecipe = async (id: string, updates: RecipeUpdate) => {
  const { data, error } = await supabase
    .from('recipes')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  return { data, error };
};

// Toggle favorite
export const toggleFavorite = async (id: string, isFavorite: boolean) => {
  return updateRecipe(id, { is_favorite: isFavorite });
};

// Delete recipe (soft delete)
export const deleteRecipe = async (id: string) => {
  const { data, error } = await supabase
    .from('recipes')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  return { data, error };
};