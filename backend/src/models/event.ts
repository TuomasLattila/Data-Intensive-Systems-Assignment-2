export interface Event {
    id: string,
    event_name: string,
    description: string,
    event_date: Date,
    finishing_placement: string,
    user_id: string
}

export interface EventResponse {
    event_name: string,
    description: string,
    event_date: Date,
    finishing_placement: string,
}

export function mapEventToResponse(event: Event): EventResponse {
    return {
        event_name: event.event_name,
        description: event.description,
        event_date: event.event_date,
        finishing_placement: event.finishing_placement
    }
}