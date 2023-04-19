// import inquirer from 'inquirer';
// import db from './db/connection.js';

const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('./db/connection.js');

function viewAllEmployees() {
    db.query("SELECT * FROM employee", (err, data) => {
        if (err) throw err
        //console.log(err);
        console.table(data);
    })
}

function viewAllDepartments() {
    db.query("SELECT * FROM department", (err, data) => {
      if (err) throw err;
      console.table(data);
    });
  }

function viewAllRoles(){
    db.query("SELECT * FROM role", (err,data)=>{
        if (err) throw err;
        console.table(data);
      })
}
  
function addDepartment() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'newDepartment',
            message: 'What is the name of the new department?'
        }
    ])
}

console.log('before function')

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
                    'Update an Employee Role'
                ]
            }
        ])
        .then((response) => {
            console.log('it is working');
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

console.log('about to call the function')
dbOperation();

