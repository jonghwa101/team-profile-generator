// Required libraries //
const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');


// Create team array //
const teamMember = [];

function startProfileGen() {
    indexHtml()
    addMember()
}

// Prompt member with questions //
function addMember() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: 'Please select their role.',
            choices: ['Manager', 'Engineer', 'Intern']
        },
        {
            type: 'text',
            name: 'name',
            message: 'What is their name?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                }else {
                    console.log('Please enter a name!');
                    return false;
                }
            }
        },
        // Used validate to make sure member has answered the question //
        {
            type: 'text',
            name: 'id',
            message: 'What is their ID number?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                }else {
                    console.log('Please specify an ID number!');
                    return false;
                }
            }
        },
        {
            type: 'text',
            name: 'email',
            message: 'What is their email address?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                }else {
                    console.log('Please enter an email address!');
                    return false;
                }
            }
        },
    ])
    // Added role information variable for role specific questions //
    .then(function({name, id, email, role}) {
        console.log(role)
        let newMember;
        let roleInformation = ''
        if (role === 'Manager') {
            inquirer.prompt({
                type: 'text',
                name: 'roleInformation',
                message: 'What is their office number?',
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    }else {
                        console.log('Please enter a office number!');
                        return false;
                    }
                }
            })
            .then(function({roleInformation}){
                newMember = new Manager(name, id, email, roleInformation)
                teamMember.push(newMember);
                anotherMember()
                employeeBox(newMember)
            })
        } else if (role === 'Engineer') {
            inquirer.prompt({
                type: 'text',
                name: 'roleInformation',
                message: 'What is their Github username?',
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    }else {
                        console.log('Please enter a Github username!');
                        return false;
                    }
                }
            })
            .then(function({roleInformation}) {
                newMember = new Engineer (name, id, email, roleInformation)
                teamMember.push(newMember);
                anotherMember()
                employeeBox(newMember)
            })
        } else {
            inquirer.prompt({
                type: 'name',
                name: 'roleInformation',
                message: 'What is the name of their school?',
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    }else {
                        console.log('Please enter the name of the school!');
                        return false;
                    }
                }
            })
            .then(function({roleInformation}) {
                newMember = new Intern(name, id, email, roleInformation)
                teamMember.push(newMember);
                anotherMember()
                employeeBox(newMember)
            })
        }
    })
}

function anotherMember() {
    inquirer.prompt({
        type: 'list',
        name: 'anotherMember',
        message: 'Would you like to add another team member?',
        choices: ['Yes', 'No']
    })
    .then(function({anotherMember}) {
        if (anotherMember === 'Yes') {
            addMember()
        }else {
            console.log('Your team has been created!')
        }
    })
}

// Generates an html file in dist/ folder once startProfileGen is called //
function indexHtml() {
    const startHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>My Team</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    </head>
    <body>
        <h1 class="bg-primary text-center">Team Profile</h1>
    `
    fs.writeFile('./dist/index.html', startHtml, function(err) {
        if (err) {
            console.log(err);
        }
    });
}

function employeeBox(employee) {
    const name = employee.getName()
    const id = employee.getId()
    const email = employee.getEmail()
    const role = employee.getRole()
    let card = ''
    if (role === 'Manager') {
        const officeNumber = employee.getOfficeNumber()
        card = `
        <div class="col-4 card"> 
                <h2>${name}</h2>
                <ul>
                    <li>Id: ${id}</li>
                    <li>Email: ${email}</li>
                    <li>Office Number: ${officeNumber}</li>
                </ul>
        </div>
        `
    }
    else if (role === 'Engineer') {
        const github = employee.getGithub()
        card = `
        <div class="col-4 card"> 
                <h2>${name}</h2>
                <ul>
                    <li>Id: ${id}</li>
                    <li>Email: ${email}</li>
                    <li>Github: <a href="https://github.com/${github}">${github}</a></li>
                </ul>
        </div>
        `
    }
    else if (role === 'Intern') {
        const school = employee.getSchool()
        card = `
        <div class="col-4 card"> 
                <h2>${name}</h2>
                <ul>
                    <li>Id: ${id}</li>
                    <li>Email: ${email}</li>
                    <li>School: ${school}</li>
                </ul>
        </div>
        `
    }

    fs.appendFile('./dist/index.html', card, function(err) {
        if (err) {
            console.log(err);
        }
    });
}

function endHtml() {
    const endHtml = `
    
    </body>
    </html>
    `

    fs.appendFile('./dist/index.html', endHtml, function(err) {
        if (err) {
            console.log(err);
        }
    });
}

// Function call to initialize //
startProfileGen();