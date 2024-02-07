import mysql from 'mysql2'
import inquirer from 'inquirer';
import chalk from 'chalk';

import { main_menu_questions, add_department_question, add_role_questions, add_employee_questions, update_employee_role_questions, employeeArray, employeeIdsArray, roleIdsArray, departmentIdsArray, managerIdsArray, update_employee_manager_questions, choose_manager_questions, choose_department_question, delete_department_question, delete_role_question, delete_employee_question, budget_question } from './js/questions.js';

import { departmentArray, roleArray, managerArray  } from './js/questions.js';

import {db} from './js/db_connection.js';

import { show_departments, get_Departments, get_Roles, get_Managers, show_employees, show_employee_roles, add_department, add_role, add_employee, get_Employees, show_employees_by_manager, show_employees_by_department, delete_department, delete_role, delete_employee, get_Budget } from './js/display_db_functions.js';



console.log(chalk.bold.bgBlue("EMPLOYEE TRACKER"))



askQuestions();


export function askQuestions(){
    inquirer
    .prompt(main_menu_questions)
    .then((answers) => {

      let  { choose_option } = answers;

      // use switch statement
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

function process_role(){
  inquirer
  .prompt(add_role_questions)
  .then((answers) => {
   
  var convertoDeci = parseFloat(answers.the_salary);
  //var indexDept = (departmentArray.indexOf(answers.choose_department)) + 1

  var indexDepartmentInArray = (departmentArray.indexOf(answers.choose_department)) 
  var department_id_toAdd = departmentIdsArray[indexDepartmentInArray];
  
   add_role(answers.the_role,convertoDeci, department_id_toAdd );
   
  })
  .catch((error) => {
    if (error) { console.log(error); } 
  });   
}


function process_employee(){
  inquirer
  .prompt(add_employee_questions)
  .then((answers) => {
      // var indexRoles = (roleArray.indexOf(answers.choose_therole)) + 1
      // var indexManager = (managerArray.indexOf(answers.the_manager)) + 1

      var indexManagerInArray = (managerArray.indexOf(answers.the_manager)) 
      //console.log(indexManagerInArray);
      let manager_id_toAdd = managerIdsArray[indexManagerInArray];

      var indexRoleInArray = (roleArray.indexOf(answers.choose_therole)) 
      let role_id_toAdd = roleIdsArray[indexRoleInArray];
        
      let role_id = role_id_toAdd;
      //let manager_id = manager_id_toAdd;
      let the_manager_id = manager_id_toAdd;
     
      add_employee(answers.add_first_name, answers.add_last_name, role_id, the_manager_id );
  })
  .catch((error) => {
    if (error) { console.log(error); } 
  });
}

function process_update_employee(){
  inquirer
  .prompt(update_employee_role_questions)
  .then((answers) => {
 
      var indexRoleInArray = (roleArray.indexOf(answers.choose_role)) 
      var role_id_toUpdate = roleIdsArray[indexRoleInArray];

      var indexEmployeeInArray = (employeeArray.indexOf(answers.choose_employee)) 
      var emp_id_toUpdate = employeeIdsArray[indexEmployeeInArray];

      var e_id = emp_id_toUpdate;
      var r_id = role_id_toUpdate;
      db.query('UPDATE employee SET role_id=? WHERE emp_id=?', [r_id, e_id] );  
      console.log("The employee was updated!");
      askQuestions();
      
  })
  .catch((error) => {
    if (error) { console.log(error); } 
  });
}

function process_update_employee_manager(){
  inquirer
  .prompt(update_employee_manager_questions)
  .then((answers) => {

      let indexManagerInArray = (managerArray.indexOf(answers.the_new_manager)) 
      let manager_id_toUpdate = managerIdsArray[indexManagerInArray];
     

      let indexEmployeeInArray = (employeeArray.indexOf(answers.choose_employee)) 
      let emp_id_toUpdate = employeeIdsArray[indexEmployeeInArray];

      let e_id = emp_id_toUpdate;
      let m_id = manager_id_toUpdate;

      db.query('UPDATE employee SET manager_id=? WHERE emp_id=?', [m_id, e_id] );  
      console.log("New manager was assigned!");
      askQuestions();
      
  })
  .catch((error) => {
    if (error) { console.log(error); } 
  });
}

function process_show_employee_by_manager(){
  inquirer
  .prompt(choose_manager_questions)
  .then((answers) => {
      

      let indexManagerInArray = (managerArray.indexOf(answers.choose_the_manager)) 
   
      let manager_id_chosen = managerIdsArray[indexManagerInArray];
      show_employees_by_manager(manager_id_chosen);
      
     
     
  })
  .catch((error) => {
    if (error) { console.log(error); } 
  });
}

function process_show_employee_by_department(){
  inquirer
  .prompt(choose_department_question)
  .then((answers) => {
     

      let indexDepartmentInArray = (departmentArray.indexOf(answers.choose_the_department)) 
     
      let department_id_chosen = departmentIdsArray[indexDepartmentInArray];
      show_employees_by_department (department_id_chosen);
      
      
     
  })
  .catch((error) => {
    if (error) { console.log(error); } 
  });
}

function process_delete_department(){
  inquirer
  .prompt(delete_department_question)
  .then((answers) => {
    

      let indexDepartmentInArray = (departmentArray.indexOf(answers.delete_the_department)) 
      
      let department_id_chosen = departmentIdsArray[indexDepartmentInArray];
      delete_department(department_id_chosen)
      console.log("===========================")
     
    
  })
  .catch((error) => {
    if (error) { console.log(error); } 
  });
}

function process_delete_role(){
  inquirer
  .prompt(delete_role_question)
  .then((answers) => {
     

       let indexRoleInArray = (roleArray.indexOf(answers.delete_the_role)) 
      let role_id_toDelete = roleIdsArray[indexRoleInArray];

      
      delete_role(role_id_toDelete);
      console.log("===========================")
     
      
  })
  .catch((error) => {
    if (error) { console.log(error); } 
  });
}


function process_delete_employee(){
  inquirer
  .prompt(delete_employee_question)
  .then((answers) => {
    
      let indexEmployeeInArray = (employeeArray.indexOf(answers.delete_employee)) 
      let employee_id_toDelete = employeeIdsArray[indexEmployeeInArray];

      
     delete_employee(employee_id_toDelete);
      console.log("===========================")
     
    
  })
  .catch((error) => {
    if (error) { console.log(error); } 
  });
}


function process_budget(){
  inquirer
  .prompt(budget_question)
  .then((answers) => {
    
      let departmentBudgetName = answers.view_budget;
  console.log(departmentBudgetName);
      
     get_Budget(departmentBudgetName);
      console.log("===========================")
     
      
  })
  .catch((error) => {
    if (error) { console.log(error); } 
  });
}










