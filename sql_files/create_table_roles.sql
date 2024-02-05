USE myemployees_db;

CREATE TABLE
    employee_role (
        role_id INTEGER AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(30) NOT NULL,
        salary DECIMAL(10, 2) NOT NULL,
        dept_id INTEGER,
        FOREIGN KEY (dept_id) REFERENCES departments(dept_id) ON DELETE SET NULL
    );