export const formatFormDate = (date: Date) => {
  return new Date(date).toISOString().substr(0, 10);
};

export const formatDateToString = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};