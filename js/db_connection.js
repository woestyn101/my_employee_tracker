import mysql from 'mysql2'

export const db = mysql.createConnection({
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'password123',
    database: 'myemployees_db'

});