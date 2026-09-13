export interface User {
    id: string,
    username: string,
    height_cm: string,
    date_of_birth: Date,
}

export interface UserWeightDevelopment {
    id: string,
    user_id: string,
    weight_kg: string,
    created_at: Date
}

export interface UserWeightDevelopmentResponse {
    weight_kg: string,
    created_at: Date
}

export interface UserResponse {
    username: string,
    height_cm: string,
    date_of_birth: Date,
    weight_development: UserWeightDevelopmentResponse[]
}

export function mapAllUserResponses(users: User[], weights: UserWeightDevelopment[]): UserResponse[] {
    const responses: UserResponse[] = users.map((row) => ({
        username: row.username,
        height_cm: row.height_cm,
        date_of_birth: row.date_of_birth,
        weight_development: weights.filter((weightRow) => weightRow.user_id === row.id).map((weightRow) => ({
            weight_kg: weightRow.weight_kg,
            created_at: weightRow.created_at
        }))
    }));
    return responses
}

