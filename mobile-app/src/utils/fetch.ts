export const apiFetch = (input: string, init?: RequestInit) => {
  const url = input.startsWith('http') ? input : `${process.env.EXPO_PUBLIC_API_URL}${input}`;
  return fetch(url, init);
};
