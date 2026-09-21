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

export type UserWeights = {
  message: string,
  data: UserWeight[]
}

export type ApiResp = {
  message: string,
  data: User[]
}

export type ApiRespWeight = {
  message: string
  data: UserWeight
}