-- department(id SERIAL PRIMARY KEY, name VARCHAR)
INSERT INTO department (name) VALUES
  ('Production'),
  ('Distribution'),
  ('Marketing'),
  ('Finance'),
  ('Legal'),
  ('Human Resources'),
  ('IT'),
  ('Sales'),
  ('Customer Service'),
  ('Research and Development');

-- role(id SERIAL PRIMARY KEY, title VARCHAR, salary NUMERIC, department_id INT)
INSERT INTO roles (title, salary, department_id) VALUES
  ('Director',            100000, 1),
  ('Manager',              80000, 2),
  ('Supervisor',           60000, 3),
  ('Team Lead',            50000, 4),
  ('Senior Developer',     70000, 5),
  ('Junior Developer',     50000, 6),
  ('Intern',               30000, 7),
  ('Sales Associate',      40000, 8),
  ('Customer Service Rep', 35000, 9),
  ('Research Scientist',   90000,10);

-- employee(id SERIAL PRIMARY KEY, first_name VARCHAR, last_name VARCHAR, role_id INT, manager_id INT NULL)
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('John',  'Doe',    1,  NULL),
  ('Jane',  'Smith',  2,     1),
  ('Jim',   'Brown',  3,     2),
  ('Jake',  'White',  4,     3),
  ('Jill',  'Green',  5,     4),
  ('Jack',  'Black',  6,     5),
  ('Jenny', 'Blue',   7,     6),
  ('Joe',   'Red',    8,     7),
  ('Judy',  'Yellow', 9,     8),
  ('James', 'Purple',10,     9);
