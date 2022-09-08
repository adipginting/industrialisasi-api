CREATE TABLE IF NOT EXISTS login_informations(
  user_name text PRIMARY KEY,
  email text NOT NULL,
  hashed_password text NOT NULL
);
