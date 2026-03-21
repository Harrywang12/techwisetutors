-- Seed default admin account (password: admin123)
INSERT INTO admins (email, password, name)
VALUES (
  'admin@techwisetutors.org',
  '$2a$10$8Cqzi0wiBXCmOJIYx8EXsehU6POjcFrW.3uXjUcorL4AR8NxhMGhe',
  'TechWiseTutors Admin'
)
ON CONFLICT (email) DO NOTHING;
