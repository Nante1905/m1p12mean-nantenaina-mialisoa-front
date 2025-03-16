import dayjs from 'dayjs';
import 'dayjs/locale/fr';
dayjs.locale('fr');

export const formatDateToReadable = (value: string | Date, format?: string) => {
  const parsed = typeof value == 'object' ? dayjs(value) : dayjs(value, format);
  return parsed.isBefore(dayjs())
    ? parsed.format('ddd DD')
    : parsed.format('HH:mm');
};
