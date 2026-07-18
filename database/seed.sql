-- =====================================================
-- SEED DATA FOR KARNATAKA POLICE CRIME ANALYTICS
-- =====================================================

-- 1. Districts
INSERT INTO districts (id, district_name) VALUES
(1, 'Bengaluru City'),
(2, 'Mysuru'),
(3, 'Hubballi-Dharwad'),
(4, 'Mangaluru'),
(5, 'Belagavi')
ON CONFLICT DO NOTHING;

-- 2. Units (Police Stations)
INSERT INTO units (id, district_id, unit_name) VALUES
(1, 1, 'Koramangala PS'),
(2, 1, 'Indiranagar PS'),
(3, 1, 'Whitefield PS'),
(4, 2, 'Devaraja PS'),
(5, 2, 'Krishnaraja PS'),
(6, 3, 'Suburban PS'),
(7, 4, 'Barke PS'),
(8, 5, 'Camp PS')
ON CONFLICT DO NOTHING;

-- 3. Courts
INSERT INTO courts (id, district_id, court_name) VALUES
(1, 1, 'City Civil Court, Bengaluru'),
(2, 2, 'District and Sessions Court, Mysuru'),
(3, 3, 'Hubballi District Court')
ON CONFLICT DO NOTHING;

-- 4. Crime Heads
INSERT INTO crime_heads (id, crime_name) VALUES
(1, 'Theft'),
(2, 'Assault'),
(3, 'Cyber Crime'),
(4, 'Murder'),
(5, 'Fraud')
ON CONFLICT DO NOTHING;

-- 5. Crime Sub Heads
INSERT INTO crime_sub_heads (id, crime_head_id, sub_head_name) VALUES
(1, 1, 'Vehicle Theft'),
(2, 1, 'House Break-in'),
(3, 2, 'Grievous Hurt'),
(4, 3, 'Phishing'),
(5, 4, 'Murder for Gain'),
(6, 5, 'Financial Fraud')
ON CONFLICT DO NOTHING;

-- 6. Acts
INSERT INTO acts (id, act_name) VALUES
(1, 'Indian Penal Code (IPC)'),
(2, 'Information Technology Act'),
(3, 'Narcotic Drugs and Psychotropic Substances Act')
ON CONFLICT DO NOTHING;

-- 7. Sections
INSERT INTO sections (id, act_id, section_name) VALUES
(1, 1, 'Section 378 (Theft)'),
(2, 1, 'Section 302 (Murder)'),
(3, 1, 'Section 420 (Cheating)'),
(4, 2, 'Section 66C (Identity Theft)')
ON CONFLICT DO NOTHING;

-- 8. Employees (Police Personnel)
INSERT INTO employees (id, unit_id, employee_name, designation, badge_number) VALUES
(1, 1, 'Rajesh Kumar', 'Inspector', 'KA-001'),
(2, 2, 'Ananya Singh', 'Sub-Inspector', 'KA-002'),
(3, 3, 'Vikram Patil', 'Constable', 'KA-003'),
(4, 4, 'Sunil Joshi', 'Inspector', 'KA-004'),
(5, 5, 'Pooja Hegde', 'Sub-Inspector', 'KA-005')
ON CONFLICT DO NOTHING;

-- 9. Case Master (FIRs)
INSERT INTO case_master (id, fir_number, district_id, unit_id, crime_head_id, crime_sub_head_id, occurrence_date, complaint_date, status, investigating_officer_id, latitude, longitude) VALUES
(1, 'FIR/2023/001', 1, 1, 1, 1, '2023-01-10 14:30:00', '2023-01-11 09:00:00', 'Under Investigation', 1, 12.9352, 77.6245),
(2, 'FIR/2023/002', 1, 2, 3, 4, '2023-02-15 10:00:00', '2023-02-16 11:30:00', 'Closed', 2, 12.9784, 77.6408),
(3, 'FIR/2023/003', 2, 4, 4, 5, '2023-03-20 23:45:00', '2023-03-21 06:15:00', 'Charge Sheeted', 4, 12.3051, 76.6551),
(4, 'FIR/2023/004', 3, 6, 2, 3, '2023-04-05 18:20:00', '2023-04-06 10:00:00', 'Under Investigation', 3, 15.3647, 75.1240),
(5, 'FIR/2023/005', 4, 7, 5, 6, '2023-05-12 09:15:00', '2023-05-13 14:45:00', 'Open', 5, 12.8700, 74.8436),
(6, 'FIR/2024/001', 1, 3, 1, 2, '2024-01-05 02:00:00', '2024-01-05 08:30:00', 'Under Investigation', 1, 12.9698, 77.7499)
ON CONFLICT DO NOTHING;

-- 10. Victims
INSERT INTO victims (id, case_id, victim_name, age, gender, contact_info, injury_type) VALUES
(1, 1, 'Ramesh Babu', 45, 'Male', '9876543210', 'None'),
(2, 2, 'Kavitha N', 32, 'Female', '9876543211', 'None'),
(3, 3, 'Suresh Reddy', 50, 'Male', '9876543212', 'Fatal'),
(4, 4, 'Imran Khan', 28, 'Male', '9876543213', 'Severe'),
(5, 5, 'Geetha Rao', 40, 'Female', '9876543214', 'None'),
(6, 6, 'Anand S', 35, 'Male', '9876543215', 'Minor')
ON CONFLICT DO NOTHING;

-- 11. Accused
INSERT INTO accused (id, case_id, accused_name, age, gender, status) VALUES
(1, 1, 'Unknown', NULL, 'Unknown', 'Absconding'),
(2, 2, 'Cyber Hacker Group A', NULL, 'Unknown', 'Under Investigation'),
(3, 3, 'Manoj Kumar', 38, 'Male', 'Arrested'),
(4, 4, 'Karthik Gowda', 25, 'Male', 'Bailed Out'),
(5, 5, 'Ravi Teja', 42, 'Male', 'Absconding'),
(6, 6, 'Unknown', NULL, 'Unknown', 'Absconding')
ON CONFLICT DO NOTHING;

-- 12. Complainants
INSERT INTO complainants (id, case_id, complainant_name, contact_info) VALUES
(1, 1, 'Ramesh Babu', '9876543210'),
(2, 2, 'Kavitha N', '9876543211'),
(3, 3, 'Lakshmi Reddy', '9876543216'),
(4, 4, 'Imran Khan', '9876543213'),
(5, 5, 'Geetha Rao', '9876543214'),
(6, 6, 'Anand S', '9876543215')
ON CONFLICT DO NOTHING;

-- 13. Arrest Surrender
INSERT INTO arrest_surrender (id, case_id, accused_id, arrest_date, arresting_officer_id, court_id, status) VALUES
(1, 3, 3, '2023-03-25 10:00:00', 4, 2, 'Remanded to Custody'),
(2, 4, 4, '2023-04-10 14:00:00', 3, 3, 'Bailed Out')
ON CONFLICT DO NOTHING;

-- Adjust Sequences
SELECT setval('districts_id_seq', (SELECT MAX(id) FROM districts));
SELECT setval('units_id_seq', (SELECT MAX(id) FROM units));
SELECT setval('courts_id_seq', (SELECT MAX(id) FROM courts));
SELECT setval('crime_heads_id_seq', (SELECT MAX(id) FROM crime_heads));
SELECT setval('crime_sub_heads_id_seq', (SELECT MAX(id) FROM crime_sub_heads));
SELECT setval('acts_id_seq', (SELECT MAX(id) FROM acts));
SELECT setval('sections_id_seq', (SELECT MAX(id) FROM sections));
SELECT setval('employees_id_seq', (SELECT MAX(id) FROM employees));
SELECT setval('case_master_id_seq', (SELECT MAX(id) FROM case_master));
SELECT setval('victims_id_seq', (SELECT MAX(id) FROM victims));
SELECT setval('accused_id_seq', (SELECT MAX(id) FROM accused));
SELECT setval('complainants_id_seq', (SELECT MAX(id) FROM complainants));
SELECT setval('arrest_surrender_id_seq', (SELECT MAX(id) FROM arrest_surrender));
