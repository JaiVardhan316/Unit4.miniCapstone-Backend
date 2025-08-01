DROP TABLE IF EXISTS faculty;
DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NULL,
    images TEXT,
    phone TEXT,
    email TEXT
);

CREATE TABLE faculty (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    bioImage TEXT,
    bioDescription TEXT,
    department_id INTEGER REFERENCES  departments(id) ON DELETE CASCADE
);