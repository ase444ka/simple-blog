const millisecondsInDay = 60 * 60 * 24 * 1000;

export function formatDate(date) {
  if (!(date instanceof Date)) date = new Date(date);
  let today = new Date();
  let difference = (date - today) / millisecondsInDay;
  let dayOfDate = date.getDate();
  if (difference < 1 && date.getDate() == today.getDate()) return 'сегодня';
  if (difference < 2 && date.setDate(dayOfDate - 1) == today.getDate())
    return 'вчера';
  return date.toLocaleString(navigator.language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
