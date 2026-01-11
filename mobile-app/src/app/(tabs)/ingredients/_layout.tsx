import { Stack } from 'expo-router';

export default function IngredientsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="scan" />
      <Stack.Screen name="ingredient" />
      <Stack.Screen name="recognisedIngredients" />
    </Stack>
  );
}
