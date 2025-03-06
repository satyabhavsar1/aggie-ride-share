import pool from "../db";

const createTables = async () => {
  try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS "users" (
          id SERIAL PRIMARY KEY,
          first_name VARCHAR(255) NOT NULL,
          last_name VARCHAR(255) NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          registration_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
    
      await pool.query(`
        CREATE TABLE IF NOT EXISTS "rides" (
          id SERIAL PRIMARY KEY,
          user_id VARCHAR(255),
          date DATE,
          time TIME,
          pickups TEXT[],     
          drops TEXT[],        
          cost DECIMAL,        
          drop_date DATE,     
          drop_time TIME,       
          num_seats INTEGER,  
          city_from TEXT,       
          city_to TEXT,        
          contact_number BIGINT,
          whatsapp_number BIGINT
        );
      `);
      

    console.log("Tables created successfully!");
    process.exit(); 
  } catch (err) {
    console.error("Error creating tables:", err);
    process.exit(1);
  }
};

createTables();
