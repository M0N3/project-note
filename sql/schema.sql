CREATE TABLE IF NOT EXISTS "User" (
  "id"        SERIAL PRIMARY KEY,
  "Name"      TEXT,
  "Password"  TEXT
);

CREATE TABLE IF NOT EXISTS "Note" (
  "id"        SERIAL PRIMARY KEY,
  "User"      INTEGER,
  "Color"     TEXT,
  "Title"     TEXT,
  "Content"   TEXT,
  "Date"      TEXT,
  "Private"   BOOLEAN,
  "Number"    INTEGER
);

CREATE TABLE IF NOT EXISTS "Tag" (
  "id"        SERIAL PRIMARY KEY,
  "Note"      INTEGER,
  "User"      INTEGER,
  "TagName"   TEXT
);
