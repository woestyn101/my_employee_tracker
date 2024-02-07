// main menu questions for inquirer

export const main_menu_questions = [
    
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
            'Update an employee role',
            'Update employee manager',
            'View employees by manager',
            'View employees by department',
            'Delete department',
            'Delete a role',  
            'Delete an employee',            
            'View budget for department',
          'exit'],
            default: "See all Departments"
        }
       
          

]

// Setting empy arrays for dropdown menus to be used
// in choice list questions in inquirer

export var departmentArray = [];
export var departmentIdsArray = [];
export var roleArray = [];
export var managerArray = [];
export var managerIdsArray = [];
export var employeeArray = [];
export var employeeIdsArray = [];
export var  roleIdsArray = [];

// add department question

export const add_department_question = 
    
    [
               {
          type: 'input',
          name: 'dept_name',
          message: "What is the name of the department?",
          default: ""
      }
      ]

      // add role questions
  
      export const add_role_questions = [
       
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
      ]

      // add employee questions

     export const add_employee_questions =  [
       
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
    ]

    // update employee questions

    export const update_employee_role_questions = [
       
        {
          type: 'list',
          name: 'choose_employee',
          message: "Choose the employee to update?",
          choices: employeeArray,
          default: ""
      }, 
      {
        type: 'list',
        name: 'choose_role',
        message: "Which role do you want to assign to the employee?",
        choices: roleArray,
        default: ""
    }
      ]

      // update employee manager questions

      export const update_employee_manager_questions = [
       
        {
          type: 'list',
          name: 'choose_employee',
          message: "Choose the employee to update manager?",
          choices: employeeArray,
          default: ""
      }, 
      {
        type: 'list',
        name: 'the_new_manager',
        message: "Which manager do you want to assign to the employee?",
        choices: managerArray,
        default: ""
    }
      ]

      // choose manager questions

      export const choose_manager_questions = [
        
        {
          type: 'list',
          name: 'choose_the_manager',
          message: "Choose manager to view his/her employees?",
          choices: managerArray,
          default: ""
      }
      ]

      // choose department question

      export const choose_department_question = [
      
        {
          type: 'list',
          name: 'choose_the_department',
          message: "Choose the department to view employees?",
          choices: departmentArray,
          default: ""
      }
      ]

      // delete department question

      export const delete_department_question = [
        
        {
          type: 'list',
          name: 'delete_the_department',
          message: "Choose the department to delete:",
          choices: departmentArray,
          default: ""
      }
      ]

      // delete role question

      export const delete_role_question = [
        
        {
          type: 'list',
          name: 'delete_the_role',
          message: "Choose the role to delete:",
          choices: roleArray,
          default: ""
      }
      ]

      // delete employee questions

      export const delete_employee_question = [
       
        {
          type: 'list',
          name: 'delete_employee',
          message: "Choose the employee to delete:",
          choices: employeeArray,
          default: ""
      }
      ]

      // budget question

      export const budget_question = [
      
        {
          type: 'list',
          name: 'view_budget',
          message: "Choose the department to view budget:",
          choices: departmentArray,
          default: ""
      }
      ]

