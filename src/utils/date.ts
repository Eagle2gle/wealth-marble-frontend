export const formatDate = (date: string) =>
  Intl.DateTimeFormat('ko-KR', { dateStyle: 'short' })
    .format(new Date(date || 0))
    .replace(/\s|\.$/g, '');

export const formatTime = (date: string) =>
  Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date(date || 0));

export const formatTimeWithoutSecond = (date: string) =>
  Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date(date || 0));

export const getDayDiff = (endDateString: string) => {
  const now = new Date();
  const [endYear, endMonth, endDate] = endDateString.split('-');
  const [year, month, date] = [now.getFullYear(), now.getMonth(), now.getDate()];
  return (
    (new Date(+endYear, +endMonth - 1, +endDate).getTime() -
      new Date(year, month, date).getTime()) /
    (24 * 60 * 60 * 1000)
  );
};

export const formatDateWithDash = (date: Date) =>
  Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
    .format(new Date(date))
    .replace(/\.\s/g, '-')
    .replace(/\./g, '');

export const getWeekDuration = (date: Date) => {
  const [day, nowDate, month, year] = [
    date.getDay(),
    date.getDate(),
    date.getMonth(),
    date.getFullYear(),
  ];
  const weekStart = new Date(year, month, nowDate - day);
  const weekEnd = new Date(year, month, nowDate + (6 - day));
  return [formatDateWithDash(weekStart), formatDateWithDash(weekEnd)];
};

export const getPrevDate = (period: string) => {
  const now = new Date();

  switch (period) {
    case '3개월':
      return new Date(now.setMonth(now.getMonth() - 3));
    case '6개월':
      return new Date(now.setMonth(now.getMonth() - 6));
    case '1년':
      return new Date(now.setFullYear(now.getFullYear() - 1));
    case '3년':
      return new Date(now.setFullYear(now.getFullYear() - 3));
    default: // 전체 옵션(2023.01 ~ )
      return new Date(2023, 0);
  }
};
