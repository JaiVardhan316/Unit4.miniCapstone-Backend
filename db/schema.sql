DROP TABLE IF EXISTS admins;
DROP TABLE IF EXISTS faculty;
DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
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

CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);