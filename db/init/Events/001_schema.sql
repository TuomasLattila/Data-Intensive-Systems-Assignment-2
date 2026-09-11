CREATE TABLE events (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL, 
    description TEXT,
    event_date DATE NOT NULL,
    finishing_placement INT,
    user_id BIGINT NOT NULL
);