export interface Activity {
    id: string,
    activity_type: string,
    duration_minutes: string,
    activity_date: Date,
    calories_burned: string
    user_id: string
}


export interface ActivityResponse {
    activity_type: string,
    duration_minutes: string,
    activity_date: Date,
    calories_burned: string
}

export function mapActivityToResponse(activity: Activity): ActivityResponse {
    return {
        activity_type: activity.activity_type,
        duration_minutes: activity.duration_minutes,
        activity_date: activity.activity_date,
        calories_burned: activity.calories_burned
    }
}