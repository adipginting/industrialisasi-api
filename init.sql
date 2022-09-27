CREATE TABLE IF NOT EXISTS login_informations(
  username text PRIMARY KEY,
  email text NOT NULL,
  hashed_password text NOT NULL
);

CREATE TABLE IF NOT EXISTS email_verification_codes(
  email text NOT NULL,
  code text NOT NULL,
  saved_at timestamp NOT NULL
);