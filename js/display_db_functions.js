import {db} from './db_connection.js';
import { askQuestions } from '../index.js';
import { departmentArray, roleArray, managerArray, employeeArray, employeeIdsArray, roleIdsArray, departmentIdsArray, managerIdsArray  } from './questions.js';

export function show_departments () {
    db.query('SELECT * FROM departments', function (err, results) {
        // console.log(results);
        // console.log(typeof(results));
        console.log("================================");
       console.table(results);  
       console.log("================================"); 
             askQuestions() ;
       
      
      });  

} 

export function get_Departments(){
    db.query('SELECT dept_id, department FROM departments', function (err, results) {
       
    
      for (const key in results){
        departmentArray.push(results[key].department);
        departmentIdsArray.push(results[key].dept_id);
       
      }
    //   console.log(departmentArray);
    //   console.log(departmentIdsArray);
            
    
      
      });  
  }
  
  export function get_Roles(){
    db.query('SELECT role_id, title FROM employee_role', function (err, results) {
       
     //console.log(results);
     for (const key in results){
        roleArray.push(results[key].title);
        roleIdsArray.push(results[key].role_id);
       
      }
      
    // console.log(roleArray);
    // console.log(roleIdsArray);
            
    
      
      });  
}

export function get_Managers(){
    db.query('SELECT emp_id, first_name, last_name FROM employee where manager_id IS NULL', function (err, results) {
       
     //console.log(results);
     for (const key in results){
        managerArray.push(results[key].first_name + " " + results[key].last_name);
        managerIdsArray.push(results[key].emp_id);
       
      }

            
  //   console.log(managerArray);
  //   console.log(managerIdsArray);
  //  console.log(typeof(managerIdsArray[0]));
            
    
      
      });  
}

export function show_employees () {
    db.query(`SELECT e.emp_id, e.first_name, e.last_name, title, salary,
    concat(em.first_name, ' ', em.last_name) AS Manager, department 
     FROM employee e
     LEFT JOIN employee_role on 
    e.role_id = employee_role.role_id
    LEFT JOIN employee em on
    e.manager_id = em.emp_id
    LEFT JOIN departments on departments.dept_id = employee_role.dept_id
    `, function (err, results) {
        // console.log(results);
        // console.log(typeof(results));
        console.log("================================");
       console.table(results); 
       console.log("================================");  
             askQuestions() ;
       
      
      });  

} 

export function show_employee_roles () {
    db.query('SELECT role_id, title,  department, salary FROM employee_role LEFT JOIN departments ON employee_role.dept_id = departments.dept_id;', function (err, results) {
        // console.log(results);
        // console.log(typeof(results));
        console.log("================================");
       console.table(results);
       console.log("================================");   
             askQuestions() ;
       
      
      });  

} 

export function add_department(dep){
    db.query('INSERT INTO departments (department) VALUES (?)', [dep]); 
    console.log("The department was added!"); 
    askQuestions() ;

}

export function add_role(role_title, role_salary, role_department){
    db.query('INSERT INTO employee_role (title, salary, dept_id ) VALUES (?, ?, ?)', [role_title, role_salary, role_department]);  
    console.log("The role was added!");
    console.log("===========================")
    askQuestions() ;

}

export function add_employee(the_name, the_last_name, the_role, the_manager){
    db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id ) VALUES (?, ?, ?, ?)', [the_name, the_last_name, the_role, the_manager]);  
    console.log("The employee was added!");
    askQuestions() ;

}

export function get_Employees(){
    db.query('SELECT emp_id, first_name, last_name FROM employee', function (err, results) {
       
     //console.log(results);
     for (const key in results){
        employeeArray.push(results[key].first_name + " " + results[key].last_name);
        employeeIdsArray.push(results[key].emp_id);
       
      }
      
    //   console.log(employeeArray);
    //   console.log(employeeIdsArray);
            
    
      
      });  
}

export function update_the_employee_role(get_role_id, get_employee_id){
    db.query(`update employee
    set 
    role_id = ?
    where
    emp_id = ?`, [get_role_id, get_employee_id]);  
    console.log("The employee was updated!");
    askQuestions() ;

}

export function show_employees_by_manager (manager) {
  db.query(`select e.first_name, e.last_name, 
  concat(em.first_name, ' ', em.last_name) AS Manager
   from employee e
   LEFT JOIN employee em on
      e.manager_id = em.emp_id
      where e.manager_id=?;`, [manager], function (err, results) {
      // console.log(results);
      // console.log(typeof(results));
      console.log("================================");
     console.table(results);   
     console.log("================================");
           askQuestions() ;
     
    
    });  

} 

export function show_employees_by_department (department_id) {
  db.query(`SELECT e.emp_id, e.first_name, e.last_name, 
  department 
  FROM employee e
  JOIN employee_role on 
 e.role_id = employee_role.role_id
   JOIN departments on departments.dept_id = employee_role.dept_id
   where departments.dept_id = ?;`, [department_id], function (err, results) {
      // console.log(results);
      // console.log(typeof(results));
      console.log("================================");
     console.table(results);   
     console.log("================================");
           askQuestions() ;
     
    
    });  

} 


