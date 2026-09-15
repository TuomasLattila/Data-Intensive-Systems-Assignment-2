INSERT INTO users (username, height_cm, date_of_birth) VALUES
('john_doe', 175.5, '1990-05-15'),
('jane_smith', 160.2, '1985-08-22'),
('alice_jones', 165.0, '1992-12-10');

INSERT INTO user_weight_development (user_id, weight_kg, created_at) VALUES
-- User 1: gradual weight loss over ~2 months
(1, 82.4, '2026-05-01'),
(1, 81.6, '2026-05-15'),
(1, 80.9, '2026-05-29'),
(1, 80.1, '2026-06-12'),
(1, 79.3, '2026-06-26'),

-- User 2: gradual weight gain over ~2 months
(2, 58.2, '2026-05-03'),
(2, 58.9, '2026-05-17'),
(2, 59.4, '2026-05-31'),
(2, 60.1, '2026-06-14'),
(2, 60.8, '2026-06-28'),

-- User 3: slow loss with a small plateau/fluctuation
(3, 90.5, '2026-05-05'),
(3, 89.7, '2026-05-19'),
(3, 89.8, '2026-06-02'),
(3, 88.6, '2026-06-16'),
(3, 87.9, '2026-06-30');