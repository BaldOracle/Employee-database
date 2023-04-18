// import inquirer from "inquirer";
// const inquirer = require('inquirer');
//  const conn = require("./config/connection");
// const table = require("console.table");
// const db = require("./db/connection.js");
// import db from './db/db.js';

import inquirer from 'inquirer';
import db from './db/connection.js';
// import { prompt } from 'inquirer';

// const inquirer = require('inquirer');

function viewAllEmployees() {
    db.query("SELECT * FROM employee", (err, data) => {
        if (err) throw err
        console.log(err);
        console.table(data);
    })
}


function DbOperation() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'option',
                message: 'What would you like to do?',
                choices: ['View All Departments', 'View All Roles', 'view all employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role']
            },
        ]).then((response) => {
            console.log(option)
            console.log(response)
            let option = response
            switch (option) {
                case 'View All Departments':
                    // TODO: Implement view all departments functionality
                    break;
                case 'View All Roles':
                    // TODO: Implement view all roles functionality
                    break;
                case 'view all employees':
                    viewAllEmployees()
                    break;
                case 'Add a Department':
                    // TODO: Implement add department functionality
                    break;
                case 'Add a Role':
                    // TODO: Implement add role functionality
                    break;
                case 'Add an Employee':
                    // TODO: Implement add employee functionality
                    break;
                case 'Update an Employee Role':
                    // TODO: Implement update employee role functionality
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
DbOperation();

