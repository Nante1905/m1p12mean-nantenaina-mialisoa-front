import dayjs from 'dayjs';
import 'dayjs/locale/fr';
dayjs.locale('fr');

export const formatDateToReadable = (
  value: string | Date,
  format?: string,
  time?: boolean
) => {
  const parsed = typeof value == 'object' ? dayjs(value) : dayjs(value, format);

  const now = dayjs();

  if (parsed.isSame(now, 'day')) {
    return parsed.format('HH:mm');
  } else if (parsed.isSame(now, 'month')) {
    return parsed.format(`ddd DD ${time ? ', HH:mm' : ''}`);
  } else if (parsed.isSame(now, 'year')) {
    return parsed.format(`DD MMM ${time ? ', HH:mm' : ''}`);
  } else {
    return parsed.format('DD MMM YYYY');
  }
};
