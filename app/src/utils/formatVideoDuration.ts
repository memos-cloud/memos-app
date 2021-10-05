import { addSeconds, format } from 'date-fns'

export function formatVideoDuration(seconds: number) {
  var helperDate = addSeconds(new Date(0), seconds)
  return format(helperDate, 'm:ss')
}
