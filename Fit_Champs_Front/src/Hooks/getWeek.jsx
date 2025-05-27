export const getWeekRange = () => {
  const currentDate = new Date();
  const startOfWeek = currentDate.getDate() - currentDate.getDay(); // Domingo
  const endOfWeek = startOfWeek + 6; // Sábado

  const start = new Date(currentDate.setDate(startOfWeek));
  const end = new Date(currentDate.setDate(endOfWeek));

  return {
    start: start.toLocaleDateString(),
    end: end.toLocaleDateString(),
  };
};

export const changeWeek = (
  currentWeekOffset,
  offset,
  setCurrentWeekOffset,
  setWeekRange
) => {
  const newOffset = currentWeekOffset + offset;

  if (newOffset > 0) return;

  setCurrentWeekOffset(newOffset);
  const currentDate = new Date();
  const startOfCurrentWeek = currentDate.getDate() - currentDate.getDay();
  const newStartDate = new Date(
    currentDate.setDate(startOfCurrentWeek + 7 * newOffset)
  );
  const newEndDate = new Date(
    new Date(newStartDate).setDate(newStartDate.getDate() + 6)
  );

  setWeekRange({
    start: newStartDate.toLocaleDateString(),
    end: newEndDate.toLocaleDateString(),
  });
};
