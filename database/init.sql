-- Enable UUID support
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- MASTER TABLES
-- =====================================================

CREATE TABLE IF NOT EXISTS districts (
    id SERIAL PRIMARY KEY,
    district_name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS units (
    id SERIAL PRIMARY KEY,
    district_id INT NOT NULL REFERENCES districts(id) ON DELETE CASCADE,
    unit_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS courts (
    id SERIAL PRIMARY KEY,
    district_id INT REFERENCES districts(id) ON DELETE SET NULL,
    court_name VARCHAR(150) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS crime_heads (
    id SERIAL PRIMARY KEY,
    crime_name VARCHAR(150) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS crime_sub_heads (
    id SERIAL PRIMARY KEY,
    crime_head_id INT NOT NULL REFERENCES crime_heads(id) ON DELETE CASCADE,
    sub_head_name VARCHAR(150) NOT NULL
);

CREATE TABLE IF NOT EXISTS acts (
    id SERIAL PRIMARY KEY,
    act_name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS sections (
    id SERIAL PRIMARY KEY,
    act_id INT NOT NULL REFERENCES acts(id) ON DELETE CASCADE,
    section_name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    unit_id INT REFERENCES units(id) ON DELETE SET NULL,
    employee_name VARCHAR(150) NOT NULL,
    designation VARCHAR(100),
    badge_number VARCHAR(50) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TRANSACTIONAL TABLES
-- =====================================================

CREATE TABLE IF NOT EXISTS case_master (
    id SERIAL PRIMARY KEY,
    fir_number VARCHAR(100) NOT NULL UNIQUE,
    district_id INT NOT NULL REFERENCES districts(id),
    unit_id INT NOT NULL REFERENCES units(id),
    crime_head_id INT REFERENCES crime_heads(id),
    crime_sub_head_id INT REFERENCES crime_sub_heads(id),
    occurrence_date TIMESTAMP NOT NULL,
    complaint_date TIMESTAMP NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Open',
    investigating_officer_id INT REFERENCES employees(id) ON DELETE SET NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS victims (
    id SERIAL PRIMARY KEY,
    case_id INT NOT NULL REFERENCES case_master(id) ON DELETE CASCADE,
    victim_name VARCHAR(150) NOT NULL,
    age INT,
    gender VARCHAR(20),
    contact_info VARCHAR(100),
    injury_type VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS accused (
    id SERIAL PRIMARY KEY,
    case_id INT NOT NULL REFERENCES case_master(id) ON DELETE CASCADE,
    accused_name VARCHAR(150) NOT NULL,
    age INT,
    gender VARCHAR(20),
    status VARCHAR(50) DEFAULT 'Absconding',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS complainants (
    id SERIAL PRIMARY KEY,
    case_id INT NOT NULL REFERENCES case_master(id) ON DELETE CASCADE,
    complainant_name VARCHAR(150) NOT NULL,
    contact_info VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS arrest_surrender (
    id SERIAL PRIMARY KEY,
    case_id INT NOT NULL REFERENCES case_master(id) ON DELETE CASCADE,
    accused_id INT NOT NULL REFERENCES accused(id) ON DELETE CASCADE,
    arrest_date TIMESTAMP NOT NULL,
    arresting_officer_id INT REFERENCES employees(id) ON DELETE SET NULL,
    court_id INT REFERENCES courts(id),
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX idx_case_master_fir ON case_master(fir_number);
CREATE INDEX idx_case_master_dates ON case_master(occurrence_date);
CREATE INDEX idx_case_master_status ON case_master(status);
CREATE INDEX idx_accused_case_id ON accused(case_id);
CREATE INDEX idx_victims_case_id ON victims(case_id);