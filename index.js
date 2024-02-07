// import mysql2 package to connect to database
import mysql from 'mysql2'

// import inquirer to enable questions in commmandline
import inquirer from 'inquirer';

// import chalk to se background color for text
import chalk from 'chalk';

// importing all the questions to be used in inquirer
import { main_menu_questions, add_department_question, add_role_questions, add_employee_questions, update_employee_role_questions, employeeArray, employeeIdsArray, roleIdsArray, departmentIdsArray, managerIdsArray, update_employee_manager_questions, choose_manager_questions, choose_department_question, delete_department_question, delete_role_question, delete_employee_question, budget_question } from './js/questions.js';

// importing arrays to be used in dropdown list in inquirer

import { departmentArray, roleArray, managerArray  } from './js/questions.js';

// importing db to make queries to the database
import {db} from './js/db_connection.js';


// importing functions which interact with database

import { show_departments, get_Departments, get_Roles, get_Managers, show_employees, show_employee_roles, add_department, add_role, add_employee, get_Employees, show_employees_by_manager, show_employees_by_department, delete_department, delete_role, delete_employee, get_Budget } from './js/display_db_functions.js';


// beginning title for app
console.log(chalk.bold.bgBlue("EMPLOYEE TRACKER"))


// calling the menu questions
askQuestions();

// main menu questions
export function askQuestions(){
    inquirer
    .prompt(main_menu_questions)
    .then((answers) => {

      // deconstructing the answers from inquirer

      let  { choose_option } = answers;

      // determine which answer received from user
      // and used appropriate function for that answers
      switch (choose_option) {
       case "See all Departments":
         show_departments ();
         break;
       case "See all employees":
         show_employees ();   
         break;
       case "View employee roles":
         show_employee_roles ();  
         break; 
       case "Add a department":
         process_dept();  
         break; 
       case "View employee roles":
         show_employee_roles ();  
         break; 
       case "Add a role":
         process_role();    
         break; 
       case "Add an employee":
         process_employee();    
         break; 
       case "Update an employee":
         process_update_employee();    
         break; 
       case "Update employee manager":
         process_update_employee_manager();    
         break; 
       case "View employees by manager":
         process_show_employee_by_manager();   
         break;   
       case "View employees by department":
         process_show_employee_by_department();    
         break; 
       case "Delete department":
         process_delete_department();    
         break; 
       case "Delete a role":
         process_delete_role(); 
         break; 
       case "Delete an employee":
         process_delete_employee();    
         break; 
       case "View budget for department":
         process_budget();    
         break; 
       
       default:
         process.exit();
       
     }
    })
    .catch((error) => {
      if (error) { console.log(error); } 
    });
  
    
}



// get departments from db to be used in inquirer as choice options
get_Departments();
// get roles from db to be used in inquirer as choice options
get_Roles();
// get managers from db to be used in inquirer as choice options
get_Managers();
// get employees from db to be used in inquirer as choice options
get_Employees();


// add department question processed by inquirer
function process_dept(){

  inquirer
  .prompt(add_department_question)
  .then((answers) => {
   
    add_department(answers.dept_name);
    console.log("Department was added!");
  })
  .catch((error) => {
    if (error) { console.log(error); } 
  });   

}

// add department question processed by inquirer
function process_role(){
  inquirer
  .prompt(add_role_questions)
  .then((answers) => {
   
    // converting answer to float to be inserted 
  // in mysql database field which accepts only
  // a decipmal value
  var convertoDeci = parseFloat(answers.the_salary);
 
   // getting department array and finding index of chosen array
  var indexDepartmentInArray = (departmentArray.indexOf(answers.choose_department)) 
  // finding and getting index of department id
  var department_id_toAdd = departmentIdsArray[indexDepartmentInArray];
  
  // function to query database and add role
   add_role(answers.the_role,convertoDeci, department_id_toAdd );
   
  })
  .catch((error) => {
    if (error) { console.log(error); } 
  });   
}

// add department question processed by inquirer
function process_employee(){
  inquirer
  .prompt(add_employee_questions)
  .then((answers) => {
    
    // getting manager array and finding index of chosen array
      var indexManagerInArray = (managerArray.indexOf(answers.the_manager)) 

      // finding and getting index of manager id
    
      let manager_id_toAdd = managerIdsArray[indexManagerInArray];
     // getting role array and finding index of chosen array
      var indexRoleInArray = (roleArray.indexOf(answers.choose_therole)) 

      // finding and getting index of role id
      let role_id_toAdd = roleIdsArray[indexRoleInArray];

        //setting variable to be used in query function
      let role_id = role_id_toAdd;

       //setting variable to be used in query function
      let the_manager_id = manager_id_toAdd;
     
      // calling funtion to run query on database to add employee
      add_employee(answers.add_first_name, answers.add_last_name, role_id, the_manager_id );
  })
  .catch((error) => {
    if (error) { console.log(error); } 
  });
}

// function to update employee

function process_update_employee(){
  inquirer
  .prompt(update_employee_role_questions)
  .then((answers) => {

 // getting role array and finding index of chosen array
      var indexRoleInArray = (roleArray.indexOf(answers.choose_role)) 

      // finding and getting index of role id
      var role_id_toUpdate = roleIdsArray[indexRoleInArray];

      // getting employee array and finding index of chosen array
      var indexEmployeeInArray = (employeeArray.indexOf(answers.choose_employee)) 

      // finding and getting index of employee id
      var emp_id_toUpdate = employeeIdsArray[indexEmployeeInArray];

      // setting variables to used in query

      var e_id = emp_id_toUpdate;
      var r_id = role_id_toUpdate;

       // running query to update employee
      db.query('UPDATE employee SET role_id=? WHERE emp_id=?', [r_id, e_id] );  
      console.log("The employee was updated!");
      askQuestions();
      
  })
  .catch((error) => {
    if (error) { console.log(error); } 
  });
}

// funtion to update employee manager

function process_update_employee_manager(){
  inquirer
  .prompt(update_employee_manager_questions)
  .then((answers) => {

  // getting manager array and finding index of chosen array
      let indexManagerInArray = (managerArray.indexOf(answers.the_new_manager)) 

      // finding and getting index of manager id
      let manager_id_toUpdate = managerIdsArray[indexManagerInArray];
     
    // getting employee array and finding index of chosen array
      let indexEmployeeInArray = (employeeArray.indexOf(answers.choose_employee)) 

      // finding and getting index of employee id
      let emp_id_toUpdate = employeeIdsArray[indexEmployeeInArray];

      // setting variables to be used in query

      let e_id = emp_id_toUpdate;
      let m_id = manager_id_toUpdate;

      // query to database to update employee

      db.query('UPDATE employee SET manager_id=? WHERE emp_id=?', [m_id, e_id] );  
      console.log("New manager was assigned!");
      askQuestions();
      
  })
  .catch((error) => {
    if (error) { console.log(error); } 
  });
}

// show employee by manager
function process_show_employee_by_manager(){
  inquirer
  .prompt(choose_manager_questions)
  .then((answers) => {
      
// getting manager array and finding index of chosen array
      let indexManagerInArray = (managerArray.indexOf(answers.choose_the_manager)) 

   // finding and getting index manager id
      let manager_id_chosen = managerIdsArray[indexManagerInArray];

      // function to run db query
      show_employees_by_manager(manager_id_chosen);
      
     
     
  })
  .catch((error) => {
    if (error) { console.log(error); } 
  });
}

// display employees by department

function process_show_employee_by_department(){
  inquirer
  .prompt(choose_department_question)
  .then((answers) => {

     // getting department array and finding index of chosen array

      let indexDepartmentInArray = (departmentArray.indexOf(answers.choose_the_department)) 

      // finding and getting index of department id
      let department_id_chosen = departmentIdsArray[indexDepartmentInArray];

      // function to run query on db

      show_employees_by_department (department_id_chosen);
      
      
     
  })
  .catch((error) => {
    if (error) { console.log(error); } 
  });
}

// deleting department from databse

function process_delete_department(){
  inquirer
  .prompt(delete_department_question)
  .then((answers) => {
    
    // getting department array and finding index of chosen array
      let indexDepartmentInArray = (departmentArray.indexOf(answers.delete_the_department))

      // finding and getting index of department id
      let department_id_chosen = departmentIdsArray[indexDepartmentInArray];

      // function to run query on database

      delete_department(department_id_chosen)

      console.log("===========================")
     
    
  })
  .catch((error) => {
    if (error) { console.log(error); } 
  });
}

// deleting a role from the database

function process_delete_role(){
  inquirer
  .prompt(delete_role_question)
  .then((answers) => {
     
// getting role array and finding index of chosen array
       let indexRoleInArray = (roleArray.indexOf(answers.delete_the_role)) 

       // finding and getting index of role id
      let role_id_toDelete = roleIdsArray[indexRoleInArray];

      // fuction to run query on database

      delete_role(role_id_toDelete);

      console.log("===========================")
     
      
  })
  .catch((error) => {
    if (error) { console.log(error); } 
  });
}

// deleting an employe from database

function process_delete_employee(){
  inquirer
  .prompt(delete_employee_question)
  .then((answers) => {

    // getting employee array and finding index of chosen array
    
      let indexEmployeeInArray = (employeeArray.indexOf(answers.delete_employee)) 

      // finding and getting index of employee id
      let employee_id_toDelete = employeeIdsArray[indexEmployeeInArray];

      // function to run query on database
     delete_employee(employee_id_toDelete);

      console.log("===========================")
     
    
  })
  .catch((error) => {
    if (error) { console.log(error); } 
  });
}

// getting summary of budget of department
function process_budget(){
  inquirer
  .prompt(budget_question)
  .then((answers) => {
    
    // getting department name from user
      let departmentBudgetName = answers.view_budget;
  
      // function to run query on databse
     get_Budget(departmentBudgetName);

      console.log("===========================")
     
      
  })
  .catch((error) => {
    if (error) { console.log(error); } 
  });
}










