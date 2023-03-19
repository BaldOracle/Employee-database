import inquirer from "inquirer";
//const conn = require("./config/connection");
import db from './db';
//require("console.table");

function DbOperation() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'view all employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role']
        },
    ])
        .then(res => {
            console.log("testing")
            let option = res.options
            switch (option) {
                case 'View All Departments':

                    break;
                case 'View All Roles':

                    break;
                case 'view all employees':
                    viewAllEmployees()
                    break;
                case 'Add a Department':

                    break;
                case 'Add a Role':

                    break;
                case 'Add an Employee':

                    break;
                case 'Update an Employee Role':

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

function viewAllEmployees() {
    db.query("SELECT * FROM employee", (err, data) => {
        if (err) throw err
        console.table(data)
    })
}

DbOperation()