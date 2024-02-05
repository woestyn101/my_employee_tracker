USE myemployees_db;

CREATE TABLE
    employee (
        emp_id INTEGER AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        role_id INTEGER,
        manager_id INTEGER,
        FOREIGN KEY (role_id) REFERENCES  employee_role(role_id) ON DELETE SET NULL,
        FOREIGN KEY (manager_id) REFERENCES employee(emp_id) ON DELETE SET NULL
    );