const mysql = require('mysql');
const inquirer = require('inquirer');
const { exit } = require('process');

//making the connection to the database

const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',

    password: 'employee',
    database: 'employee_list'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('Connection successful!')
});

function runSearch() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "Add a new Department",
          "Add Employee role",
          "Add Employee",
          "View other Departments",
          "View all Employees",
          "View all Employee Roles",
          "Exit"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {

        case "Add a new Department":
          addDepartment();
          break;
  
        case "Add Employee role":
          addRole();
          break;
  
        case  "Add Employee":
          addEmployee();
          break;
  
        case "View other Departments":
          viewDepartments();
          break;

        case "View all Employees":
          viewEmployees();
          break;

        case "View all Employees Roles":
          viewRoles();
          break;

        case "Exit":
          console.log('leaving!');;
          break;
        }
      });
  }

  runSearch();
  


  function addDepartment() {
    inquirer
      .prompt([{
        name: "department",
        type: "list",
        message: "What department would you like to add?",
        choices: [
            'Sales',
            'Manager',
            'Engineering',
            'Legal Team'
        ]
      }])


      .then(function(answer) {
        var query = "INSERT INTO department (department_name) VALUES (?)";
        connection.query(query, [answer.department], function(err, res) {
       if (err) throw err;
            console.log(res);
            runSearch();
        });
      });
  };





  function  addRole() {
    inquirer
      .prompt([
          {

        name: "title",
        type: "list",
        message: "What new role would you like to add?",
        choices: [
            'Salesperson',
            'Manager',
            'Team lead',
            'Engineer' 
        ]
 }, 
        {
            name: "salary",
            type: "input",
            message: "employee salary here"
        },
        {
            name: "department_id",
            type: "input",
            message: "employee department_id here"
        },
    ])
      .then(function(answer) {
        var query = "INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?)";
        connection.query(query, [answer.title, answer.salary, answer.department_id], function(err, res) {
         if (err) throw err;
        console.log(res);
          
          runSearch();
        });
      });
  };




  function addEmployee() {
    inquirer
      .prompt([
          {
        name: "first_name",
        type: "input",
        message: "Employee First Name?"

      },
          {
        name: "last_name",
        type: "input",
        message: "Employee Last Name?"

      },
          {
        name: "role_id",
        type: "input",
        message: "Enter Role ID:"

      },
          {
        name: "manager_id",
        type: "input",
        message: "Enter Manager ID:"

      },
    
    ])
      .then(function(answer) {
        var query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
        connection.query(query, [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], function(err, res) {
          if (err) throw err;
            console.log(res);
          
          runSearch();
        });
      });
  };

  //View all depadtments created  

  function viewDepartments() {
    inquirer
      .prompt([{
        name: "departments",
        type: "list",
        message: "View stored Departments?",
        choices: [
            'Sales',
            'Manager',
            'Engineering',
            'Legal Team'
        ]
      }])


      .then(function(answer) {
        var query = "SELECT * FROM department WHERE ?";
        connection.query(query, {department_name: answer.departments}, function(err, res) {
       if (err) throw err;
            console.log(res);
            runSearch();
        });
      });
  };




  function  viewEmployees() {
    inquirer
    .prompt([
        {
      name: "employees",
      type: "input",
      message: "Find employee by Last Name:"

 }])


      .then(function(answer) {
        var query = "SELECT * FROM employee WHERE ?";
        connection.query(query, { last_name: answer.employees }, function(err, res) {
          if (err) throw err;
            console.log(res);
          
          runSearch();
        });
      });
  };


  function  viewRoles() {
    inquirer
    .prompt([
        {
      name: "roles",
      type: "input",
      message: "Find Employee by Role:"

 }])


      .then(function(answer) {
        var query = "SELECT * FROM role WHERE ?";
        connection.query(query, { title: answer.roles }, function(err, res) {
          if (err) throw err;
            console.log(res);
          
          runSearch();
        });
      });
  };
