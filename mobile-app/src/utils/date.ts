export const formatDate = (date: Date) => {
  const day = date.getDate();
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const year = date.getFullYear();
  
  const suffix = (day: number) => {
    if (day >= 11 && day <= 13) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };
  
  return `${month} ${day}${suffix(day)}, ${year}`;
};

export const formatDateForDB = (date: Date) => {
  return date.toISOString().split('T')[0]; // YYYY-MM-DD format
};
