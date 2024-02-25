import dotenv from "dotenv";
dotenv.config();

console.log(process.env.DATABASE_URL);
import pg from "pg";
const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });

db.query(`CREATE TABLE IF NOT EXISTS guestbook(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    rating VARCHAR(100) NOT NULL,
    category_id INTEGER NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(category_id),
    category_name VARCHAR(100) NOT NULL,
    FOREIGN KEY (category_name) REFERENCES categories(category_name)
)`);

db.query(`INSERT INTO guestbook (title, content, rating) VALUES 
('Horrible experience', 'this was a disgusting place to stay, I hated every minute of it. I would like a refund.', 'Horrible'),
('Excellent, I would really recommend', 'Food was excellent, comfort, comfortable pillows, staff were wonderful. Even got a 20% discount for being nice', 'Excellent'),
('Alright value for money', 'cant really argue for the price I paid, cheap and cheerful. Nothing too crazy or amazing, I would probably stay again if I was on a budget', 'meh')`);

//the two tables need to reference each other. Needs id to match so categories match up.

db.query(`CREATE TABLE IF NOT EXISTS categories (
    category_id SERIAL PRIMARY KEY,
    category_name TEXT NOT NULL
)`);

db.query(`INSERT INTO categories (category_name) VALUES
('negative'), ('in the middle'), ('positive')`);

//posts, categories, tags
