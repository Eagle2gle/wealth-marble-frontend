export const formatDate = (date: string) =>
  Intl.DateTimeFormat('ko-KR', { dateStyle: 'short' })
    .format(new Date(date || 0))
    .replace(/\s|\.$/g, '');

