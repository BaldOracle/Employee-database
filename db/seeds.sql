INSERT INTO department (name) VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance');

INSERT INTO role (title, salary, department_id) VALUES
  ('Salesperson', 50000, 1),
  ('Engineer', 75000, 2),
  ('Accountant', 60000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Doe', 2, 1),
  ('Bob', 'Smith', 3, 1);
