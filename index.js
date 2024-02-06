import mysql from 'mysql2'
import inquirer from 'inquirer';
import chalk from 'chalk';
import { main_menu_questions, add_department_question, add_role_questions, add_employee_questions, update_employee_role_questions, employeeArray, employeeIdsArray, roleIdsArray, departmentIdsArray, managerIdsArray } from './js/questions.js';
import { departmentArray, roleArray, managerArray  } from './js/questions.js';
import {db} from './js/db_connection.js';
import { show_departments, get_Departments, get_Roles, get_Managers, show_employees, show_employee_roles, add_department, add_role, add_employee, get_Employees } from './js/display_db_functions.js';



console.log(chalk.bold.bgBlue("EMPLOYEE TRACKER"))



askQuestions();


export function askQuestions(){
    inquirer
    .prompt(main_menu_questions)
    .then((answers) => {
           console.log(answers.choose_option);
      if (answers.choose_option === "See all Departments") {
              show_departments ();        
                   
      } else  if (answers.choose_option === "View employee roles") {
              show_employee_roles ();       
                 
    } else  if (answers.choose_option === "See all employees") {
              show_employees ();       
                 
    } else  if (answers.choose_option === "Add a department") {
              process_dept();      
                 
    } else if(answers.choose_option === "Add a role"){
       
                process_role();       

    } else if (answers.choose_option === "Add an employee") {
                 process_employee();
    }   else if (answers.choose_option === "Update an employee") {
        process_update_employee();
    } else {
        process.exit();
    }

    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log(error);
      } else {
        console.log("New error");
      }
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
    if (error.isTtyError) {
      console.log("error");
    } else {
        console.log(" new error");
    }
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
    if (error.isTtyError) {
     console.log(error);
    } else {
    console.log("new error");
    }
  });   
}


function process_employee(){
  inquirer
  .prompt(add_employee_questions)
  .then((answers) => {
      var indexRoles = (roleArray.indexOf(answers.choose_therole)) + 1
      var indexManager = (managerArray.indexOf(answers.the_manager)) + 1

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
      if (error.isTtyError) {
      console.log(error);
      } else {
      console.log("New error at employee process");
     
      }
  });
}

function process_update_employee(){
  inquirer
  .prompt(update_employee_role_questions)
  .then((answers) => {
   // console.log(answers.choose_employee);
    //console.log(answers.choose_role);
     //console.log(employeeArray);
      // var indexRoles = (roleArray.indexOf(answers.choose_role)) + 1
      // var indexEmployee = (employeeArray.indexOf(answers.choose_employee)) + 1

      var indexRoleInArray = (roleArray.indexOf(answers.choose_role)) 
      var role_id_toUpdate = roleIdsArray[indexRoleInArray];

      var indexEmployeeInArray = (employeeArray.indexOf(answers.choose_employee)) 
      var emp_id_toUpdate = employeeIdsArray[indexEmployeeInArray];

      // console.log(indexRoles);
      // console.log(indexEmployee)
     // var r_id = indexRoles;
      //var e_id = indexEmployee;
      var e_id = emp_id_toUpdate;
      var r_id = role_id_toUpdate;
      db.query('UPDATE employee SET role_id=? WHERE emp_id=?', [r_id, e_id] );  
      console.log("The employee was updated!");
      askQuestions();
      // add_employee(answers.add_first_name, answers.add_last_name, indexRoles, indexManager)
  })
  .catch((error) => {
      if (error.isTtyError) {
      console.log(error);
      } else {
      console.log("New error");
      }
  });
}
