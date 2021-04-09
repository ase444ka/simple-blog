const millisecondsInDay = 60 * 60 * 24 * 1000;

export function formatDate(date) {
  if (!(date instanceof Date)) date = new Date(date);

  let today = new Date();
  let difference = (today - date) / millisecondsInDay;
  let dayOfDate = date.getDate();
  let previousDay = new Date(
    new Date().setDate(new Date().getDate() - 1),
  ).getDate();

  if (difference < 1 && date.getDate() == today.getDate()) return 'сегодня';
  if (difference < 2 && previousDay == dayOfDate) return 'вчера';

  return date.toLocaleString(navigator.language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function showHeader() {
  document.addEventListener('scroll', () => {
    let header = document.querySelector('.blog__header');
    if (pageYOffset > 400 && !header.classList.contains('blog__header_over')) {
      header.classList.add('blog__header_over');
      if (header.classList.contains('blog__header_translated')) {
        header.classList.remove('blog__header_translated');
      }
    }

    if (
      pageYOffset > 250 &&
      pageYOffset < 750 &&
      !header.classList.contains('blog__header_translated')
    ) {
      header.classList.add('blog__header_translated');
    }
    if (pageYOffset < 750 && header.classList.contains('blog__header_over')) {
      header.classList.remove('blog__header_over');
    }
    if (
      pageYOffset < 250 &&
      header.classList.contains('blog__header_translated')
    ) {
      header.classList.remove('blog__header_translated');
    }
  });
}
