import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
const app = express();
app.use(express.json());
app.use(cors());

import pg from "pg";
const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });

const PORT = "6020";
app.listen(PORT, () => {
  console.log("port is listening on port 6020");
});

app.get("/", (request, response) => {
  response.send("happy days");
});

app.get("/posts", async (request, response) => {
  try {
    let posts = (
      await db.query(
        `SELECT guestbook.title, guestbook.content, guestbook.rating, categories.category_name FROM guestbook INNER JOIN categories ON guestbook.id = categories.id`
      )
    ).rows;
    console.log(posts);
    response.status(200).json(posts);
    return;
  } catch (err) {
    response.status(400).json(err);
  }
});

app.post("/posts", async (request, response) => {
  try {
    let title = request.body.title;
    let content = request.body.content;
    let rating = request.body.rating;
    let category_name = request.body.category_name;
    let result = await db.query(
      `INSERT INTO categories (category_name)
      INSERT INTO guestbook (title, content, rating, category_name) VALUES 
    ($1, $2, $3, $4)`,
      [title, content, rating, category_name]
    );
    response.status(200).json(result);
  } catch (err) {
    response.status(400).json(err);
  }
});

//post request using $ instead of ? as this is for postgres.

// app.post("/posts", async (request, response) => {
//   try {
//     console.log("Post message received");
//     const title = request.body.title;
//     const content = request.body.content;
//     const rating = request.body.rating;
//     const category = request.body.category;
//     const newPost = db.query(`INSERT INTO guestbook (title, content, rating, category) VALUES (?, ?, ?, ?)`)
//   }
// })

//update request

//delete request
