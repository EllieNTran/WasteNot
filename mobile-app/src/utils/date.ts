export const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const formatDateForDB = (date: Date) => {
  return date.toISOString().split('T')[0]; // YYYY-MM-DD format
};
