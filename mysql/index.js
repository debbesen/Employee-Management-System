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
        name: "first_name",
        type: "input",
        message: "Employee First Name?"

      },
          {
        name: "first_name",
        type: "input",
        message: "Employee First Name?"

      },
    
    ])
      .then(function(answer) {
        var query = "SELECT position, song, year FROM top5000 WHERE ?";
        connection.query(query, { artist: answer.artist }, function(err, res) {
          for (var i = 0; i < res.length; i++) {
            console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
          }
          runSearch();
        });
      });
  }


  function  viewDepartments() {
    inquirer
      .prompt([{
        name: "artist",
        type: "input",
        message: "What artist would you like to search for?"
      }])
      .then(function(answer) {
        var query = "SELECT position, song, year FROM top5000 WHERE ?";
        connection.query(query, { artist: answer.artist }, function(err, res) {
          for (var i = 0; i < res.length; i++) {
            console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
          }
          runSearch();
        });
      });
  }

  function  viewEmployees() {
    inquirer
      .prompt([{
        name: "artist",
        type: "input",
        message: "What artist would you like to search for?"
      }])
      .then(function(answer) {
        var query = "SELECT position, song, year FROM top5000 WHERE ?";
        connection.query(query, { artist: answer.artist }, function(err, res) {
          for (var i = 0; i < res.length; i++) {
            console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
          }
          runSearch();
        });
      });
  }

  function  viewRoles() {
    inquirer
      .prompt([{
        name: "artist",
        type: "input",
        message: "What artist would you like to search for?"
      }])
      .then(function(answer) {
        var query = "SELECT position, song, year FROM top5000 WHERE ?";
        connection.query(query, { artist: answer.artist }, function(err, res) {
          for (var i = 0; i < res.length; i++) {
            console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
          }
          runSearch();
        });
      });
  }

  function   exit() {
    inquirer
      .prompt([{
        name: "artist",
        type: "input",
        message: "What artist would you like to search for?"
      }])
      .then(function(answer) {
        var query = "SELECT position, song, year FROM top5000 WHERE ?";
        connection.query(query, { artist: answer.artist }, function(err, res) {
          for (var i = 0; i < res.length; i++) {
            console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
          }
          runSearch();
        });
      });
  }
  









  function multiSearch() {
    var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
    connection.query(query, function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].artist);
      }
      runSearch();
    });
  }
  
  function rangeSearch() {
    inquirer
      .prompt([
        {
          name: "start",
          type: "input",
          message: "Enter starting position: ",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        },
        {
          name: "end",
          type: "input",
          message: "Enter ending position: ",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ])
      .then(function(answer) {
        var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
        connection.query(query, [answer.start, answer.end], function(err, res) {
          for (var i = 0; i < res.length; i++) {
            console.log(
              "Position: " +
                res[i].position +
                " || Song: " +
                res[i].song +
                " || Artist: " +
                res[i].artist +
                " || Year: " +
                res[i].year
            );
          }
          runSearch();
        });
      });
  }
  
  function songSearch() {
    inquirer
      .prompt({
        name: "song",
        type: "input",
        message: "What song would you like to look for?"
      })
      .then(function(answer) {
        console.log(answer.song);
        connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function(err, res) {
          console.log(
            "Position: " +
              res[0].position +
              " || Song: " +
              res[0].song +
              " || Artist: " +
              res[0].artist +
              " || Year: " +
              res[0].year
          );
          runSearch();
        });
      });
  }
  
  function songAndAlbumSearch() {
    inquirer
      .prompt({
        name: "artist",
        type: "input",
        message: "What artist would you like to search for?"
      })
      .then(function(answer) {
        var query = "SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist ";
        query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
        query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";
  
        connection.query(query, [answer.artist, answer.artist], function(err, res) {
          console.log(res.length + " matches found!");
          for (var i = 0; i < res.length; i++) {
            console.log(
              i+1 + ".) " +
                "Year: " +
                res[i].year +
                " Album Position: " +
                res[i].position +
                " || Artist: " +
                res[i].artist +
                " || Song: " +
                res[i].song +
                " || Album: " +
                res[i].album
            );
          }
  
          runSearch();
        });
      });
  }