export type Event = {
  event_name: string
  description: string
  event_date: string
  finishing_placement: string
}

export type ApiResp = {
  message: string,
  data: Event[]
}

export type EventTableProps = {
  events: Event[];
};