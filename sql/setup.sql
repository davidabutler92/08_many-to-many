DROP TABLE IF EXISTS comments CASCADE;

CREATE TABLE comments {
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  text VARCHAR(255)
}