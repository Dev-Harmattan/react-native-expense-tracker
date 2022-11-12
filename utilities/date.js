export const paddingStart = (num) => {
  return num.toString().padStart(2, 0);
}

export const getFormatedDate = (date) => {
  return [
    date.getFullYear(),
    paddingStart(date.getMonth() + 1),
    paddingStart(date.getDate() + 1),
  ].join('-');
}

export const getRecentDateMinusDays = (date, days) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days)
}
