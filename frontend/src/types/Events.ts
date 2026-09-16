export type Event = {
  id: string
  event_name: string
  description: string
  event_date: string
  finishing_placement: string
}

export type ApiRespEvent = {
  message: string,
  data: Event[]
}

export type EventTableProps = {
  events: Event[];
};