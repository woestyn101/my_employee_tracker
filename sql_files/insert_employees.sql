USE myemployees_db;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Vinnie', 'Menendez', 5, NULL),
  ('Lynsey', 'McMurrugh', 3, NULL),
  ('Vittorio', 'Choppen', 4, 2),
  ('Petrina', 'Averay', 8, 2),
  ('Davita', 'Cranidge', 3, 1),
  ('Burton', 'Holliar', 6, 2),
  ('Arlene', 'Roote', 3, 2),
  ('Vivyan', 'Djorvic', 7, 1);
  
  