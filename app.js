const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// const employees = [];

const createNewTeam = async (employees = []) => {
      const newEmployeeInputs = await inquirer.prompt([ {
        type: 'input',
        name: 'name',
        message: 'Enter the name of a new team member:'
    },
    {
        type: 'input',
        name: 'id',
        message: "Enter member's ID:"
    },
    {
        type: 'input',
        name: 'email',
        message: "Enter member's email:"
    },
    {
        type: 'list',
        name: 'role',
        message: "Enter member's role:",
        choices: ['Manager', 'Engineer', 'Intern']
    }]);



    switch(newEmployeeInputs.role){
        case 'Manager':
            const managerSpec = await inquirer.prompt([
                {
                    type: 'number',
                    name: 'officeNumber',
                    message: "Enter Manager's office number:"
                },
                {
                    type: 'confirm',
                    name: 'again',
                    message: 'Do you want to add another member?'
                }
            ]);
            newEmployeeInputs.officeNumber = managerSpec.officeNumber;
            newEmployeeInputs.again = managerSpec.again;
        break;

        case 'Engineer':
            const engineerSpec = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'github',
                    message: "Enter Engineer's GitHub user:"
                },
                {
                    type: 'confirm',
                    name: 'again',
                    message: 'Do you want to add another member?'
                }

            ]);
            newEmployeeInputs.github = engineerSpec.github;
            newEmployeeInputs.again = engineerSpec.again;
        break;

        case 'Intern':
            const internSpec = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'school',
                    message: "Enter Intern's school name:"
                },
                {
                    type: 'confirm',
                    name: 'again',
                    message: 'Do you want to add another member?'
                }
            ]);
            newEmployeeInputs.school = internSpec.school;
            newEmployeeInputs.again = internSpec.again;
        break;
    }

    let newEmployee = {};
    let updatedEmployees = [];

    switch(newEmployeeInputs.role){
        case 'Manager':
            newEmployee = new Manager(newEmployeeInputs.name, newEmployeeInputs.id, newEmployeeInputs.email, newEmployeeInputs.officeNumber);
            updatedEmployees = [...employees, newEmployee];
            return newEmployeeInputs.again ? createNewTeam(updatedEmployees) : updatedEmployees;
        break;
        case 'Engineer':
            newEmployee = new Engineer(newEmployeeInputs.name, newEmployeeInputs.id, newEmployeeInputs.email, newEmployeeInputs.github);
            updatedEmployees = [...employees, newEmployee];
            return newEmployeeInputs.again ? createNewTeam(updatedEmployees) : updatedEmployees;
        break;
        case 'Intern':
            newEmployee = new Intern(newEmployeeInputs.name, newEmployeeInputs.id, newEmployeeInputs.email, newEmployeeInputs.school);
            updatedEmployees = [...employees, newEmployee];
            return newEmployeeInputs.again ? createNewTeam(updatedEmployees) : updatedEmployees;
    }
}


const init = async () =>{
    const team = await createNewTeam();
    console.log(team);

};

init();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!



// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
