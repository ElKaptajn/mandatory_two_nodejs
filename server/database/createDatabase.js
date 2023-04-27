import db from "./connection.js";

const isDeleteMode = process.argv.findIndex((argument) => argument === "delete_mode") === -1 ? false : true;

console.log("isDeleteMode: ", isDeleteMode);

if (isDeleteMode) {
    db.exec(`DROP TABLE users;`);
}

// (DDL)
db.exec(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50) NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(25) NOT NULL
);
`);

// Seeding (DML)
if (isDeleteMode) {
    db.exec(`INSERT INTO users (username, password, role) VALUES ('user', '$2a$12$2dhG6K2U0NE/jrnA1JDU5.WYLCW9VUioJ4Z8Rj6uxT/IsreMn1S0a', 'ROLE_USER');`);
    db.exec(`INSERT INTO users (username, password, role) VALUES ('admin', '$2a$12$PlSvCVLT2XsvWX7DXWUqPeASoWEfYD6ndVrePu64w7GrhQ2oHPJde', 'ROLE_ADMIN');`);
}

