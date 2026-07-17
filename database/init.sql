-- Enable UUID support
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- DISTRICT
-- =====================================================

CREATE TABLE IF NOT EXISTS districts (
    id SERIAL PRIMARY KEY,
    district_name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- UNIT
-- =====================================================

CREATE TABLE IF NOT EXISTS units (
    id SERIAL PRIMARY KEY,
    district_id INT REFERENCES districts(id),
    unit_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- CRIME HEAD
-- =====================================================

CREATE TABLE IF NOT EXISTS crime_heads (
    id SERIAL PRIMARY KEY,
    crime_name VARCHAR(150) NOT NULL UNIQUE
);

-- =====================================================
-- CRIME SUB HEAD
-- =====================================================

CREATE TABLE IF NOT EXISTS crime_sub_heads (
    id SERIAL PRIMARY KEY,
    crime_head_id INT REFERENCES crime_heads(id),
    sub_head_name VARCHAR(150)
);

-- =====================================================
-- CASE MASTER
-- =====================================================

CREATE TABLE IF NOT EXISTS case_master (
    id SERIAL PRIMARY KEY,

    fir_number VARCHAR(100),

    district_id INT REFERENCES districts(id),

    unit_id INT REFERENCES units(id),

    crime_head_id INT REFERENCES crime_heads(id),

    crime_sub_head_id INT REFERENCES crime_sub_heads(id),

    occurrence_date TIMESTAMP,

    complaint_date TIMESTAMP,

    status VARCHAR(50),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);