DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS hashtags CASCADE;


CREATE TABLE comments (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  text TEXT NOT NULL
);

CREATE TABLE hashtags (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL
);
