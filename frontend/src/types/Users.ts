export type User = {
  id: string
  username: string
  height_cm: string
  date_of_birth: string
  weight_development: UserWeight[]
}

export type UserWeight = {
  weight_kg: string
  created_at: string
}

export type ApiResp = {
  message: string,
  data: User[]
}

export type ApiRespWeight = {
  message: string
  data: UserWeight
}