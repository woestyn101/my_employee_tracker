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
            'Update an employee',
          'exit'],
            default: "See all Departments"
        }
       
        /* Pass your questions in here */
      

]

export var departmentArray = [];
export var departmentIdsArray = [];
export var roleArray = [];
export var managerArray = [];
export var managerIdsArray = [];
export var employeeArray = [];
export var employeeIdsArray = [];
export var  roleIdsArray = [];

export const add_department_question = 
    
    [
        /* Pass your questions in here */
        {
          type: 'input',
          name: 'dept_name',
          message: "What is the name of the department?",
          default: ""
      }
      ]
  
      export const add_role_questions = [
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
      ]

     export const add_employee_questions =  [
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
    ]

    export const update_employee_role_questions = [
        /* Pass your questions in here */
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

