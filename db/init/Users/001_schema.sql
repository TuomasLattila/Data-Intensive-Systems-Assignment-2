CREATE TABLE users (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    height_cm NUMERIC(5, 2),
    date_of_birth DATE
);

CREATE TABLE user_weight_development (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id bigint REFERENCES users(id),
    weight_kg NUMERIC(5, 2) NOT NULL,
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP
);