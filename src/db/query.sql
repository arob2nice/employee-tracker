-- =========================================
-- DEPARTMENT QUERIES
-- =========================================

-- create_department.sql
-- Insert a new department
-- Params: $1 = name
INSERT INTO department (name)
VALUES ($1)
RETURNING *;


-- list_departments.sql
-- Get all departments
SELECT id, name
FROM department;


-- delete_department.sql
-- Delete a department by id
-- Params: $1 = department id
DELETE FROM department
WHERE id = $1;


-- department_budget.sql
-- Sum of salaries for a department
-- Params: $1 = department id
SELECT
  d.name AS department,
  SUM(r.salary) AS utilized_budget
FROM employee e
JOIN role r      ON e.role_id       = r.id
JOIN department d ON r.department_id = d.id
WHERE d.id = $1
GROUP BY d.name;


-- =========================================
-- ROLE QUERIES
-- =========================================

-- create_role.sql
-- Insert a new role
-- Params: $1 = title, $2 = salary, $3 = department_id
INSERT INTO role (title, salary, department_id)
VALUES ($1, $2, $3)
RETURNING *;


-- list_roles.sql
-- Get all roles (optionally filtered by department)
-- Params: $1 = department_id (or omit / pass NULL for all)
SELECT id, title, salary, department_id
FROM role
WHERE (department_id = $1 OR $1 IS NULL);


-- delete_role.sql
-- Delete a role by id
-- Params: $1 = role id
DELETE FROM role
WHERE id = $1;


-- =========================================
-- EMPLOYEE QUERIES
-- =========================================

-- create_employee.sql
-- Insert a new employee
-- Params: $1 = first_name, $2 = last_name, $3 = role_id, $4 = manager_id (or NULL)
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ($1, $2, $3, $4)
RETURNING *;


-- list_employees.sql
-- Get all employees with role, department and manager
SELECT
  e.id,
  e.first_name,
  e.last_name,
  r.title   AS role,
  d.name    AS department,
  m.first_name || ' ' || m.last_name AS manager
FROM employee e
JOIN role r      ON e.role_id       = r.id
JOIN department d ON r.department_id = d.id
LEFT JOIN employee m ON e.manager_id = m.id
ORDER BY e.id;


-- update_employee_manager.sql
-- Change an employee’s manager
-- Params: $1 = new manager_id (or NULL), $2 = employee id
UPDATE employee
SET manager_id = $1
WHERE id = $2;


-- list_employees_by_manager.sql
-- Get employees under a specific manager
-- Params: $1 = manager id
SELECT id, first_name, last_name
FROM employee
WHERE manager_id = $1
ORDER BY last_name, first_name;


-- list_employees_by_department.sql
-- Get employees in a specific department
-- Params: $1 = department id
SELECT
  e.id,
  e.first_name,
  e.last_name,
  r.title AS role
FROM employee e
JOIN role r
  ON e.role_id = r.id
WHERE r.department_id = $1
ORDER BY e.last_name, e.first_name;


-- delete_employee.sql
-- Delete an employee by id
-- Params: $1 = employee id
DELETE FROM employee
WHERE id = $1;
