export type IngredientType = 'Vegetables' | 'Meat' | 'Dairy' | 'Fruits' | 'Other';
export type IngredientStatus = 'available' | 'used' | 'discarded';
export type MealType = 'Breakfast' | 'Lunch' | 'Dinner';
export type CookingTime = 'Quick' | 'Regular' | 'Long';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          full_name: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          full_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          email?: string | null;
          full_name?: string | null;
          updated_at?: string;
        };
      };
      ingredients: {
        Row: {
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
        };
        Insert: {
          user_id: string;
          name: string;
          amount?: string | null;
          type?: IngredientType | null;
          status?: IngredientStatus;
          expiry_date?: string | null;
          image_path?: string | null;
          confidence?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          amount?: string | null;
          type?: IngredientType | null;
          status?: IngredientStatus;
          expiry_date?: string | null;
          image_path?: string | null;
          confidence?: number | null;
          updated_at?: string;
        };
      };
      recipes: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          instructions: string;
          meal_type: MealType | null;
          cooking_time: CookingTime | null;
          servings: number | null;
          image_path: string | null;
          is_favorite: boolean;
          deleted_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          title: string;
          instructions: string;
          meal_type?: MealType | null;
          cooking_time?: CookingTime | null;
          servings?: number | null;
          image_path?: string | null;
          is_favorite?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          instructions?: string;
          meal_type?: MealType | null;
          cooking_time?: CookingTime | null;
          servings?: number | null;
          image_path?: string | null;
          is_favorite?: boolean;
          updated_at?: string;
        };
      };
      recipe_ingredients: {
        Row: {
          id: string;
          recipe_id: string;
          ingredient_id: string | null;
          name: string;
          amount: string | null;
          created_at: string;
        };
        Insert: {
          recipe_id: string;
          ingredient_id?: string | null;
          name: string;
          amount?: string | null;
          created_at?: string;
        };
        Update: {
          ingredient_id?: string | null;
          name?: string;
          amount?: string | null;
        };
      };
    };
  };
}
