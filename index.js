import mysql from 'mysql2'
import inquirer from 'inquirer';
import chalk from 'chalk';

console.log(chalk.bold.bgBlue("EMPLOYEE TRACKER"))


var departmentArray = [];
var roleArray = [];
var managerArray = [];


const db = mysql.createConnection({
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'password123',
    database: 'myemployees_db'

});

askQuestions();


function askQuestions(){
    inquirer
    .prompt([
      {
          type: 'list',
          name: 'choose_option',
          message: "What would you like to do?",
          choices: ['See all Departments',
               'See all employees', 
              'View employee roles',
              'Add a department',
              'Add a role',
          'Add an employee',
        'exit'],
          default: "See all Departments"
      }
     
      /* Pass your questions in here */
    ])
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
        .prompt([
          /* Pass your questions in here */
          {
            type: 'input',
            name: 'dept_name',
            message: "What is the name of the department?",
            default: ""
        }
        ])
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
        .prompt([
          /* Pass your questions in here */
          {
            type: 'input',
            name: 'the_role',
            message: "What is the role of the employee?",
            default: ""
        }, 
        {
            type: 'input',
            name: 'the_salary',
            message: "What is the salary?",
            default: ""
        }, {
            type: 'list',
            name: 'choose_department',
            message: "Which department?",
            choices: departmentArray,
            default: ""
        }
        ])
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
            .prompt([
                /* Pass your questions in here */
                {
                    type: 'input',
                    name: 'add_first_name',
                    message: "What is the employee's first name?",
                    default: ""
                }, 
                {
                    type: 'input',
                    name: 'add_last_name',
                    message: "What is the employee's last name?",
                    default: ""
                }, {
                    type: 'list',
                    name: 'choose_therole',
                    message: "What is the employee's role",
                    choices: roleArray,
                    default: ""
                },
                {
                    type: 'list',
                    name: 'the_manager',
                    message: "Who is the manager",
                    choices: managerArray,
                    default: ""
                }
            ])
            .then((answers) => {
                var indexRoles = (roleArray.indexOf(answers.choose_therole)) + 1
                var indexManager = (managerArray.indexOf(answers.the_manager)) + 1
                // Use user feedback for... whatever!!
                // console.log(answers.add_first_name);
                // console.log(answers.add_last_name);
                // console.log(indexRoles);
                // console.log(indexManager);                
               
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
function show_departments () {
    db.query('SELECT * FROM departments', function (err, results) {
        // console.log(results);
        // console.log(typeof(results));
       console.table(results);   
             askQuestions() ;
       
      
      });  

} 

function get_Departments(){
    db.query('SELECT * FROM departments', function (err, results) {
       
    
      for (const key in results){
        departmentArray.push(results[key].department);
       
      }
      //console.log(departmentArray);
            
    
      
      });  
}


get_Departments();

function get_Roles(){
    db.query('SELECT title FROM employee_role', function (err, results) {
       
     //console.log(results);
     for (const key in results){
        roleArray.push(results[key].title);
       
      }
      
      //console.log(departmentArray);
            
    
      
      });  
}


get_Roles();

function get_Managers(){
    db.query('SELECT first_name, last_name FROM employee where manager_id IS NULL', function (err, results) {
       
     //console.log(results);
     for (const key in results){
        managerArray.push(results[key].first_name + " " + results[key].last_name);
       // managerArray.push(results[key].last_name);
       
      }
      
      //console.log(managerArray);
            
    
      
      });  
}


get_Managers();


function show_employee_roles () {
    db.query('SELECT role_id, title,  department, salary FROM employee_role JOIN departments ON employee_role.dept_id = departments.dept_id;', function (err, results) {
        // console.log(results);
        // console.log(typeof(results));
       console.table(results);   
             askQuestions() ;
       
      
      });  

} 

function show_employees () {
    db.query(`SELECT e.emp_id, e.first_name, e.last_name, title, salary,
    concat(em.first_name, ' ', em.last_name) AS Manager, department 
     FROM employee e
    JOIN employee_role on 
    e.role_id = employee_role.role_id
    JOIN employee em on
    e.manager_id = em.emp_id
    JOIN departments on departments.dept_id = employee_role.dept_id
    `, function (err, results) {
        // console.log(results);
        // console.log(typeof(results));
       console.table(results);   
             askQuestions() ;
       
      
      });  

} 

function add_department(dep){
    db.query('INSERT INTO departments (department) VALUES (?)', [dep]); 
    console.log("The department was added!"); 
    askQuestions() ;

}

function add_role(role_title, role_salary, role_department){
    db.query('INSERT INTO employee_role (title, salary, dept_id ) VALUES (?, ?, ?)', [role_title, role_salary, role_department]);  
    console.log("The role was added!");
    askQuestions() ;

}

function add_employee(the_name, the_last_name, the_role, the_manager){
    db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id ) VALUES (?, ?, ?, ?)', [the_name, the_last_name, the_role, the_manager]);  
    console.log("The employee was added!");
    askQuestions() ;

}

