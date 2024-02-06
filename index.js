import mysql from 'mysql2'
import inquirer from 'inquirer';
import chalk from 'chalk';
import { main_menu_questions, add_department_question, add_role_questions, add_employee_questions } from './js/questions.js';
import { departmentArray, roleArray, managerArray  } from './js/questions.js';
import {db} from './js/db_connection.js';
import { show_departments, get_Departments, get_Roles, get_Managers, show_employees, show_employee_roles, add_department, add_role, add_employee } from './js/display_db_functions.js';
import { process_department } from './js/inquirer_prompt.js';


console.log(chalk.bold.bgBlue("EMPLOYEE TRACKER"))



askQuestions();


export function askQuestions(){
    inquirer
    .prompt(main_menu_questions)
    .then((answers) => {
      // Use user feedback for... whatever!!
      console.log(answers.choose_option);
      if (answers.choose_option === "See all Departments") {
          show_departments ();        
                   
      } else  if (answers.choose_option === "View employee roles") {
        show_employee_roles ();       
                 
    } else  if (answers.choose_option === "See all employees") {
        show_employees ();       
                 
    } else  if (answers.choose_option === "Add a department") {

      inquirer
      .prompt(add_department_question)
      .then((answers) => {
        // Use user feedback for... whatever!!
        add_department(answers.dept_name);
        console.log("Department was added!");
      })
      .catch((error) => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
        } else {
          // Something else went wrong
        }
      });   
                 
    } else if(answers.choose_option === "Add a role"){

        inquirer
        .prompt(add_role_questions)
        .then((answers) => {
         
        var convertoDeci = parseFloat(answers.the_salary);
        var indexDept = (departmentArray.indexOf(answers.choose_department)) + 1
        
         add_role(answers.the_role,convertoDeci, indexDept );
         
        })
        .catch((error) => {
          if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
          } else {
            // Something else went wrong
          }
        });   

    } else if (answers.choose_option === "Add an employee") {
                    inquirer
            .prompt(add_employee_questions)
            .then((answers) => {
                var indexRoles = (roleArray.indexOf(answers.choose_therole)) + 1
                var indexManager = (managerArray.indexOf(answers.the_manager)) + 1
                            
               
                add_employee(answers.add_first_name, answers.add_last_name, indexRoles, indexManager)
            })
            .catch((error) => {
                if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
                } else {
                // Something else went wrong
                }
            });
    }else {
        process.exit();
    }

    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
  
    
}



// Query database

// get departments from db to be used in inquirer as choice options
get_Departments();
// get roles from db to be used in inquirer as choice options
get_Roles();
// get managers from db to be used in inquirer as choice options
get_Managers();





