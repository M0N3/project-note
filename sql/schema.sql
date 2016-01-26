CREATE TABLE IF NOT EXISTS "Users" (
  "id"        SERIAL PRIMARY KEY,
  "Name"      TEXT,
  "Password"  TEXT
);

CREATE TABLE IF NOT EXISTS "Notes" (
  "id"        SERIAL PRIMARY KEY,
  "User"      INTEGER,
  "Color"     TEXT,
  "Title"     TEXT,
  "Content"   TEXT,
  "Private"   BOOLEAN
);

CREATE TABLE IF NOT EXISTS "TagNames" (
  "id"        SERIAL PRIMARY KEY,
  "Name"      TEXT
);

CREATE TABLE IF NOT EXISTS "Tags" (
  "id"        SERIAL PRIMARY KEY,
  "Note"      INTEGER,
  "TagName"   INTEGER
);

CREATE TABLE IF NOT EXISTS "PrivateViewers" (
  "id"        SERIAL PRIMARY KEY,
  "Note"      INTEGER,
  "User"      INTEGER
);
