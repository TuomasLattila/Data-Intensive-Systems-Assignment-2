export type Activity = {
  id: string
  activity_type: string
  duration_minutes: string
  activity_date: string
  calories_burned: string
}

export type ApiRespActivity = {
  message: string,
  data: Activity[]
}