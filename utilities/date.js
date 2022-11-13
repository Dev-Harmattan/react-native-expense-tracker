export const paddingStart = (num) => {
  return num.toString().padStart(2, 0);
};

export const getFormatedDate = (date) => {
  return date.toISOString().slice(0, 10);
};

export const getRecentDateMinusDays = (date, days) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
};
