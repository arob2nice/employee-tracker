import express from 'express';
import { queryHandler } from './queryHandler.js'; // Import the query handler
import inquirer from 'inquirer';
import ascii from 'asciiart-logo';

// Create the express app and setup the port
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Create the main menu with Inquirer
const mainMenu = async () => {
  console.log(
    ascii({ name: 'Employee Tracker', font: 'Standard', lineChars: 10 }).render()
  );

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
      const { deptName } = await inquirer.prompt([
        {
          type: 'input',
          name: 'deptName',
          message: 'Enter the name of the new department:',
        },
      ]);
      await queryHandler.addDepartment(deptName);
      break;

    case 'Add a role':
      const roleAnswers = await inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Enter the title of the role:',
        },
        {
          type: 'number',
          name: 'salary',
          message: 'Enter the salary for the role:',
        },
        {
          type: 'number',
          name: 'department_id',
          message: 'Enter the department ID this role belongs to:',
        },
      ]);
      await queryHandler.addRole(roleAnswers);
      break;

      case 'Add an employee': {
        const employeeAnswers = await inquirer.prompt([
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
            type: 'number',
            name: 'role_id',
            message: "Enter the employee's role ID:",
          },
          {
            type: 'input',
            name: 'manager_id',
            message: "Enter the employee's manager ID (leave blank if none):",
          },
        ]);
  
        const managerId = employeeAnswers.manager_id
          ? parseInt(employeeAnswers.manager_id)
          : null;
  
        await queryHandler.addEmployee({
          first_name: employeeAnswers.first_name,
          last_name: employeeAnswers.last_name,
          role_id: employeeAnswers.role_id,
          manager_id: managerId,
        });
        break;
      }
  

    case 'Update an employee role':
      const updateAnswers = await inquirer.prompt([
        {
          type: 'number',
          name: 'employee_id',
          message: 'Enter the ID of the employee to update:',
        },
        {
          type: 'number',
          name: 'role_id',
          message: 'Enter the new role ID:',
        },
      ]);
      await queryHandler.updateEmployeeRole(updateAnswers.employee_id, updateAnswers.role_id);
      break;

    case 'Exit':
      console.log('Goodbye!');
      startServer();  // Start the server after the user chooses "Exit"
      return;  // Exit from the mainMenu function
  }

  // Loop back to the main menu after an action is completed
  mainMenu();
};

// Start the Inquirer menu first
mainMenu();

// Server start logic will be inside this function
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

// Define routes for your API
app.post('/api/departments', async (req, res) => {
  try {
    const department = await queryHandler.createDepartment(req.body.name);
    res.status(201).json({ data: department });
  } catch (err) {
    res.status(400).json({ error: err instanceof Error ? err.message : 'An unknown error occurred' });
  }
});

app.get('/api/departments', async (_req, res) => {
  const departments = await queryHandler.listDepartments();
  res.json({ data: departments });
});

app.delete('/api/departments/:id', async (req, res) => {
  const success = await queryHandler.deleteDepartment(req.params.id);
  if (!success) {
    return res.status(404).json({ message: 'Department not found' });
  }
  res.json({ message: 'Department deleted' });
});
