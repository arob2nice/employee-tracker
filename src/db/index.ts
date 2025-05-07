import inquirer from 'inquirer';
import { queryHandler } from '../queryHandler.js';


async function mainMenu() {
  const { action } = await inquirer.prompt([
    {
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
    },
  ]);

  switch (action) {
    case 'View all departments':
      const departments = await queryHandler.getAllDepartments();
      console.table(departments);
      break;

    case 'View all roles':
      const roles = await queryHandler.getAllRoles();
      console.table(roles);
      break;

    case 'View all employees':
      const employees = await queryHandler.getAllEmployees();
      console.table(employees);
      break;

    case 'Add a department':
      const { dept_name } = await inquirer.prompt([
        {
          type: 'input',
          name: 'dept_name',
          message: 'Enter the name of the new department:',
        },
      ]);
      await queryHandler.addDepartment(dept_name);
      console.log(`Added department: ${dept_name}`);
      break;

    case 'Add a role':
      const departmentsList = await queryHandler.getAllDepartments();
      const deptChoices = departmentsList.map((dept: any) => ({
        name: dept.name,
        value: dept.id,
      }));

      const roleData = await inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Enter the name of the new role:',
        },
        {
          type: 'input',
          name: 'salary',
          message: 'Enter the salary for this role:',
        },
        {
          type: 'list',
          name: 'department_id',
          message: 'Select the department for this role:',
          choices: deptChoices,
        },
      ]);

      await queryHandler.addRole(roleData);
      console.log(`Added role: ${roleData.title}`);
      break;

    case 'Add an employee':
      const rolesList = await queryHandler.getAllRoles();
      const roleChoices = rolesList.map((role: any) => ({
        name: role.title,
        value: role.id,
      }));

      const employeeList = await queryHandler.getAllEmployees();
      const managerChoices = employeeList.map((emp: any) => ({
        name: `${emp.first_name} ${emp.last_name}`,
        value: emp.id,
      }));
      managerChoices.unshift({ name: 'None', value: null });

      const employeeData = await inquirer.prompt([
        {
          type: 'input',
          name: 'first_name',
          message: "Enter the employee's first name:",
        },
        {
          type: 'input',
          name: 'last_name',
          message: "Enter the employee's last name:",
        },
        {
          type: 'list',
          name: 'role_id',
          message: "Select the employee's role:",
          choices: roleChoices,
        },
        {
          type: 'list',
          name: 'manager_id',
          message: "Select the employee's manager:",
          choices: managerChoices,
        },
      ]);

      await queryHandler.addEmployee(employeeData);
      console.log(`Added employee: ${employeeData.first_name} ${employeeData.last_name}`);
      break;

    case 'Update an employee role':
      const employeesUpdateList = await queryHandler.getAllEmployees();
      const employeeChoices = employeesUpdateList.map((emp: any) => ({
        name: `${emp.first_name} ${emp.last_name}`,
        value: emp.id,
      }));

      const rolesUpdateList = await queryHandler.getAllRoles();
      const roleUpdateChoices = rolesUpdateList.map((role: any) => ({
        name: role.title,
        value: role.id,
      }));

      const updateData = await inquirer.prompt([
        {
          type: 'list',
          name: 'employee_id',
          message: 'Select the employee to update:',
          choices: employeeChoices,
        },
        {
          type: 'list',
          name: 'role_id',
          message: 'Select the new role:',
          choices: roleUpdateChoices,
        },
      ]);

      await queryHandler.updateEmployeeRole(updateData.employee_id, updateData.role_id);
      console.log(`Updated employee role.`);
      break;

    case 'Exit':
      console.log('Goodbye!');
      process.exit(0);
  }

  // Return to main menu
  await mainMenu();
}

mainMenu();
