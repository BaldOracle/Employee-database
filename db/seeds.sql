USE employee_db;
INSERT INTO department (
    name 
) VALUES 
('Sales'),
('inbound'),
('outbound');

INSERT INTO role (
    title, salary, department_id 
) VALUES 
('manager',62000, 1),
('HR', 62000, 2),
('team-member', 50000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Johnny', 'Appleseed', 1, 1),
('Michael', 'J', 2, 2),
('John', 'Doe', 3, 3),
('Jane', 'Doe', 4, NULL);