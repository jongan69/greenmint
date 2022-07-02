import sub from 'date-fns/sub'

export const EPOCH_START_TIMESTAMP = 1598281200000 // ms
export const EPOCH_DURATION = 30000 // ms
export const DEFAULT_CHART_SCALE = 'day' // day | week | month
export const MAX_DATEPICKER_DATE = sub(new Date(), { days: 2 })

export const defaultDataState = {
  results: [],
  loading: false,
  failed: false,
}
