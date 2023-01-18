CREATE TABLE IF NOT EXISTS login_informations(
  username text PRIMARY KEY,
  email text NOT NULL,
  hashed_password text NOT NULL
);

CREATE TABLE IF NOT EXISTS email_verification_codes(
  id_entry serial PRIMARY KEY,
  email text NOT NULL,
  code text NOT NULL,
  saved_at timestamp NOT NULL
);

CREATE TABLE IF NOT EXISTS posts(
  username text NOT NULL REFERENCES login_informations,
  post_id serial PRIMARY KEY,
  title text NOT NULL,
  post text NOT NULL,
  posted_at timestamp NOT NULL,
  last_edited_at timestamp NULL
);

CREATE TABLE IF NOT EXISTS comments(
  username text NOT NULL REFERENCES login_informations,
  post_id serial NOT NULL REFERENCES posts,
  comment_id text PRIMARY KEY,
  comment text NOT NULL,
  commented_at timestamp NOT NULL,
  last_edited_at timestamp NULL
);

CREATE TABLE IF NOT EXISTS invalid_refresh_tokens(
  refresh_tokens text NOT NULL,
  added_at timestamp NOT NULL
);
