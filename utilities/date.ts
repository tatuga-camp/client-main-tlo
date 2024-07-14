export const handleChangeToBuddhistYear = (date: Date) => {
  const dateObj = new Date(date);
  const buddhistYear = dateObj.getFullYear() + 543;
  dateObj.setFullYear(buddhistYear);

  return dateObj.toISOString();
};

export const handleChangeToChristianYear = (date: Date) => {
  const dateObj = new Date(date);
  const christianYear = dateObj.getFullYear() - 543;
  dateObj.setFullYear(christianYear);

  return dateObj.toISOString();
};
