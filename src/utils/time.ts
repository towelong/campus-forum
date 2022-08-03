import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import 'dayjs/locale/zh-cn'

dayjs.extend(calendar)
dayjs.locale('zh-cn')

export function fromNow(timeString: string) {
  return dayjs(timeString).calendar(dayjs(), {
    sameDay: '今天 A hh:mm:ss', // The same day ( Today at 2:30 AM )
    nextDay: '明天 A hh:mm:ss', // The next day ( Tomorrow at 2:30 AM )
    nextWeek: '下周 A hh:mm:ss', // The next week ( Sunday at 2:30 AM )
    lastDay: '昨天 A hh:mm:ss', // The day before ( Yesterday at 2:30 AM )
    lastWeek: 'dddd A hh:mm:ss', // Last week ( Last Monday at 2:30 AM )
    sameElse: 'YYYY/MM/DD hh:mm:ss', // Everything else ( 7/10/2011 )
  })
}
