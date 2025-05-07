// src/index.ts
import inquirer from 'inquirer';
import ascii from 'asciiart-logo';
import { queryHandler } from './queryHandler.js';
console.log(ascii({ name: 'Employee Tracker', font: 'Standard', lineChars: 10 }).render());
async function mainMenu() {
    const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit',
        ],
    });
    switch (action) {
        // ─── VIEW ───────────────────────────────────────────────────────────
        case 'View all departments': {
            const depts = await queryHandler.getAllDepartments();
            console.table(depts);
            break;
        }
        case 'View all roles': {
            const roles = await queryHandler.getAllRoles();
            console.table(roles);
            break;
        }
        case 'View all employees': {
            const emps = await queryHandler.getAllEmployees();
            console.table(emps);
            break;
        }
        // ─── ADD ────────────────────────────────────────────────────────────
        case 'Add a department': {
            const { deptName } = await inquirer.prompt({
                type: 'input',
                name: 'deptName',
                message: 'Enter new department name:',
            });
            await queryHandler.addDepartment(deptName);
            console.log(`✔️  Department "${deptName}" added to the database.`);
            break;
        }
        case 'Add a role': {
            const departments = await queryHandler.getAllDepartments();
            const deptChoices = departments.map(d => ({ name: d.name, value: d.id }));
            const roleAnswers = await inquirer.prompt([
                { type: 'input', name: 'title', message: 'Role title:' },
                { type: 'number', name: 'salary', message: 'Role salary:' },
                {
                    type: 'list',
                    name: 'department_id',
                    message: 'Select department:',
                    choices: deptChoices,
                },
            ]);
            await queryHandler.addRole(roleAnswers);
            console.log(`✔️  Role "${roleAnswers.title}" added to the database.`);
            break;
        }
        case 'Add an employee': {
            const roles = await queryHandler.getAllRoles();
            const roleChoices = roles.map(r => ({ name: r.title, value: r.id }));
            const employees = await queryHandler.getAllEmployees();
            const managerChoices = employees.map(e => ({
                name: `${e.first_name} ${e.last_name}`,
                value: e.id,
            }));
            managerChoices.unshift({ name: 'None', value: null });
            const employeeAnswers = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: "Employee's first name:",
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: "Employee's last name:",
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: "Employee's role:",
                    choices: roleChoices,
                },
                {
                    type: 'list',
                    name: 'manager_id',
                    message: "Employee's manager:",
                    choices: managerChoices,
                },
            ]);
            await queryHandler.addEmployee(employeeAnswers);
            console.log('✔️  Employee added to the database:', employeeAnswers);
            break;
        }
        // ─── UPDATE ──────────────────────────────────────────────────────────
        case 'Update an employee role': {
            const employees = await queryHandler.getAllEmployees();
            const empChoices = employees.map(e => ({
                name: `${e.first_name} ${e.last_name}`,
                value: e.id,
            }));
            const roles = await queryHandler.getAllRoles();
            const roleChoices = roles.map(r => ({ name: r.title, value: r.id }));
            const updateAnswers = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee_id',
                    message: 'Select employee to update:',
                    choices: empChoices,
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'Select new role:',
                    choices: roleChoices,
                },
            ]);
            await queryHandler.updateEmployeeRole(updateAnswers.employee_id, updateAnswers.role_id);
            console.log('✔️  Employee role updated');
            break;
        }
        case 'Exit':
            console.log('👋 Goodbye!');
            process.exit(0);
    }
    // Loop back to main menu after each action
    await mainMenu();
}
// Start the menu loop
mainMenu();
