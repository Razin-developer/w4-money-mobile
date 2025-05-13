export const formatDate = (utcDateString: string) => {
  const date = new Date(utcDateString); // Automatically converts to local timezone (IST if on Indian device)

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';

  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${day}, ${month}, ${year} ${hours}:${minutes} ${ampm}`;
};
