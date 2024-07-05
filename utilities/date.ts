export const handleChangeToBuddhistYear = (date: Date) => {
  const currentYear = new Date(date).getFullYear();
  const buddhistCurrentYearISO = new Date(
    Date.UTC(currentYear + 543 - 1, 11, 31, 17, 0, 0),
  ).toISOString();

  return buddhistCurrentYearISO;
};

export const handleChangeToChristianYear = (date: Date) => {
  const currentYear = new Date(date).getFullYear();
  const christianCurrentYearISO = new Date(
    Date.UTC(currentYear - 543 - 1, 11, 31, 17, 0, 0),
  ).toISOString();

  return christianCurrentYearISO;
};
