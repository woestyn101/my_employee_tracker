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
          'exit'],
            default: "See all Departments"
        }
       
        /* Pass your questions in here */
      

]

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

