import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getIngredients, getExpiringSoon, addIngredient, updateIngredient, deleteIngredient, markAsUsed, Ingredient, IngredientInsert, IngredientUpdate } from '@/src/lib/ingredients';
import { useAuth } from '@/src/contexts/authContext';

export const INGREDIENTS_QUERY_KEY = 'ingredients';
export const EXPIRING_SOON_QUERY_KEY = 'expiring-soon';

export const useIngredients = () => {
  const { userId } = useAuth();

  return useQuery<Ingredient[], Error>({
    queryKey: [INGREDIENTS_QUERY_KEY, userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error('User not authenticated');
      }
      const { data, error } = await getIngredients(userId);
      if (error) throw new Error(error.message);
      return data || [];
    },
    enabled: !!userId,
  });
};

export const useExpiringSoon = () => {
  const { userId } = useAuth();

  return useQuery<Ingredient[], Error>({
    queryKey: [EXPIRING_SOON_QUERY_KEY, userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error('User not authenticated');
      }
      const { data, error } = await getExpiringSoon(userId);
      if (error) throw new Error(error.message);
      return data || [];
    },
    enabled: !!userId,
  });
};

export const useAddIngredient = () => {
  const queryClient = useQueryClient();
  const { userId } = useAuth();

  return useMutation<any, Error, IngredientInsert>({
    mutationFn: async (ingredient: IngredientInsert) => {
      const { data, error } = await addIngredient(ingredient);
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INGREDIENTS_QUERY_KEY, userId] });
      queryClient.invalidateQueries({ queryKey: [EXPIRING_SOON_QUERY_KEY, userId] });
    },
  });
};

export const useUpdateIngredient = () => {
  const queryClient = useQueryClient();
  const { userId } = useAuth();

  return useMutation<any, Error, { id: string; updates: IngredientUpdate }>({
    mutationFn: async ({ id, updates }) => {
      const { data, error } = await updateIngredient(id, updates);
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INGREDIENTS_QUERY_KEY, userId] });
      queryClient.invalidateQueries({ queryKey: [EXPIRING_SOON_QUERY_KEY, userId] });
    },
  });
};

export const useDeleteIngredient = () => {
  const queryClient = useQueryClient();
  const { userId } = useAuth();

  return useMutation<any, Error, string>({
    mutationFn: async (id: string) => {
      const { data, error } = await deleteIngredient(id);
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INGREDIENTS_QUERY_KEY, userId] });
      queryClient.invalidateQueries({ queryKey: [EXPIRING_SOON_QUERY_KEY, userId] });
    },
  });
};

export const useMarkAsUsed = () => {
  const queryClient = useQueryClient();
  const { userId } = useAuth();

  return useMutation<any, Error, string>({
    mutationFn: async (id: string) => {
      const { data, error } = await markAsUsed(id);
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INGREDIENTS_QUERY_KEY, userId] });
      queryClient.invalidateQueries({ queryKey: [EXPIRING_SOON_QUERY_KEY, userId] });
    },
  });
};
