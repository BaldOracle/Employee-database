const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('./db/connection.js');

//view functions
function viewAllEmployees() {
    db.query("SELECT * FROM employee", (err, data) => {
        if (err) throw err
        //console.log(err);
        console.table(data);
        dbOperation()
    })
}

function viewAllDepartments() {
    db.query("SELECT * FROM department", (err, data) => {
        if (err) throw err;
        console.table(data);
        dbOperation()
    });
}

function viewAllRoles() {
    db.query("SELECT * FROM role", (err, data) => {
        if (err) throw err;
        console.table(data);
        dbOperation()
    })
}

// Function to add a new department
function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'newDepartment',
                message: 'What is the name of the new department?'
            }
        ])
        .then((response) => {
            db.query('INSERT INTO department SET ?', { name: response.newDepartment }, (err, data) => {
                if (err) throw err;
                console.log("New department added successfully!");
                viewAllDepartments();
            });
        });
}

// Function to add a new role
function addRole() {
    //pull options for department
    db.query("SELECT id, name FROM department", (err, data) => {
        if (err) throw err;

        const departmentOptions = data.map(({ id, name }) => ({
            value: id,
            name,
        }));

        inquirer
            .prompt([
                //need title, salary, and department input
                {
                    name: 'title',
                    message: 'What is the title of the new role?'
                },
                {
                    name: 'salary',
                    message: 'What is the salary of the new role?'
                },
                {
                    type: 'list',
                    name: 'department',
                    message: 'Choose a department',
                    choices: departmentOptions
                }
            ])
            .then((response) => {
                db.query('INSERT INTO role SET ?',
                    {
                        title: response.title,
                        salary: response.salary,
                        department_id: response.department
                    }, (err, data) => {
                        if (err) throw err;
                        console.log("New role added successfully!");
                        viewAllRoles();
                    });
            });
    });
}

//add employee need first name and last name only
function addEmployee() {
    // pull options for role and manager
    db.query("SELECT id, title FROM role", (err, roleData) => {
        if (err) throw err;

        db.query(
            "SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee",
            (err, employeeData) => {
                if (err) throw err;

                const roleOptions = roleData.map(({ id, title }) => ({
                    value: id,
                    name: title,
                }));

                const employeeOptions = employeeData.map(({ id, name }) => ({
                    value: id,
                    name,
                }));

                inquirer
                    .prompt([
                        {
                            name: "firstName",
                            message: "What is the employee's first name?",
                        },
                        {
                            name: "lastName",
                            message: "What is the employee's last name?",
                        },
                        {
                            type: "list",
                            name: "roleId",
                            message: "Choose a role",
                            choices: roleOptions,
                        },
                        {
                            type: "list",
                            name: "managerId",
                            message: "Choose a manager",
                            choices: [{ value: null, name: "None" }, ...employeeOptions],
                        },
                    ])
                    .then((response) => {
                        db.query(
                            "INSERT INTO employee SET ?",
                            {
                                first_name: response.firstName,
                                last_name: response.lastName,
                                role_id: response.roleId,
                                manager_id: response.managerId,
                            },
                            (err, data) => {
                                if (err) throw err;
                                console.log("New employee added successfully!");
                                viewAllEmployees();
                            }
                        );
                    });
            }
        );
    });
}

function updateEmployeeRole() {
    // Get the list of employees
    db.query('SELECT id, first_name, last_name FROM employee', (err, employees) => {
        if (err) throw err;

        // Map the list of employees to a list of choices for inquirer prompt
        const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
            value: id,
            name: `${first_name} ${last_name}`
        }));

        // Get the list of roles
        db.query('SELECT id, title FROM role', (err, roles) => {
            if (err) throw err;

            // Map the list of roles to a list of choices for inquirer prompt
            const roleChoices = roles.map(({ id, title }) => ({
                value: id,
                name: title
            }));

            // Prompt the user for the employee to update and the new role
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeId',
                    message: 'Which employee would you like to update?',
                    choices: employeeChoices
                },
                {
                    type: 'list',
                    name: 'roleId',
                    message: 'What is the new role for the employee?',
                    choices: roleChoices
                }
            ]).then((answers) => {
                // Update the employee's role in the database
                db.query('UPDATE employee SET role_id = ? WHERE id = ?', [answers.roleId, answers.employeeId], (err, result) => {
                    if (err) throw err;
                    console.log('Employee role updated successfully!');
                    viewAllEmployees();
                });
            });
        });
    });
}

//exit function 
function exit() {
    console.log('All done!');
    process.exit();
}

function dbOperation() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'option',
                message: 'What would you like to do?',
                choices: [
                    'View All Departments',
                    'View All Roles',
                    'view all employees',
                    'Add a Department',
                    'Add a Role',
                    'Add an Employee',
                    'Update an Employee Role',
                    'Exit'
                ]
            }
        ])
        .then((response) => {
            switch (response.option) {
                case 'View All Departments':
                    viewAllDepartments();
                    break;
                case 'View All Roles':
                    viewAllRoles();
                    break;
                case 'view all employees':
                    viewAllEmployees();
                    break;
                case 'Add a Department':
                    addDepartment();
                    break;
                case 'Add a Role':
                    addRole()
                    break;
                case 'Add an Employee':
                    addEmployee()
                    break;
                case 'Update an Employee Role':
                    updateEmployeeRole()
                    break;
                case 'Exit':
                    exit()
                    break;
            }
        })
        .catch((error) => {
            if (error.isTtyError) {
                console.log(error)
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else went wrong
                console.log(error)
            }
        });
}

dbOperation();

