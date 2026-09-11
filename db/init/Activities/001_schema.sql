CREATE TABLE activities (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    activity_type VARCHAR(255) NOT NULL,
    duration_minutes NUMERIC(5, 2) NOT NULL,
    activity_date DATE NOT NULL,
    calories_burned NUMERIC(5, 2),
    user_id BIGINT NOT NULL
);