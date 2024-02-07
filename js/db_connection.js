// mysql2 package to make connection with mysql database
import mysql from 'mysql2'

// making connnectcion with mysql database

export const db = mysql.createConnection({
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'password123',
    database: 'myemployees_db'

});