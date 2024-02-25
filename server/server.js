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
    let result = await db.query(
      `INSERT INTO guestbook (title, content, rating) VALUES 
      ($1, $2, $3)`,
      [title, content, rating]
    );
    response.status(200).json(result);
  } catch (err) {
    response.status(500).json(err);
  }
});

app.post("/categories", async (request, response) => {
  try {
    let categoryName = request.body.category_name;
    let result = await db.query(
      `INSERT INTO categories (category_name) VALUES ($1)`,
      [categoryName]
    );
    response.status(200).json(result);
  } catch (error) {
    response.status(500).json(error);
  }
});

// My attempt at inserting one in to the other:
// app.post("/posts", async (request, response) => {
//   try {
//     let title = request.body.title;
//     let content = request.body.content;
//     let rating = request.body.rating;
//     let category_name = request.body.category_name;
//     let result = await client.query("BEGIN");
//     const categoryText = `INSERT INTO categories (category_name) VALUES ($1) RETURNING id`;
//     const categoryResult = await client.query(categoryText, [
//       "made up category",
//     ]);
//     const guestbookText = `INSERT INTO guestbook (category.id, title, content, rating) VALUES
//       ($1, $2, $3, $4)`;
//     const guestbookResult = await client.query(
//       guestbookText[(title, content, rating)]
//     );
//     const insertValues = [categoryResult.rows[0].id, "s3.bucket.foo"];
//     await client.query(guestbookResult, insertValues);
//     await client.query("COMMIT");
//     response.status(200).json(result);
//   } catch (err) {
//     await client.query("ROLLBACK");
//     response.status(500).json(err);
//   }
// });

//post request using $ instead of ? as this is for postgres.
//What I had
// app.post("/posts", async (request, response) => {
//   try {
//     let title = request.body.title;
//     let content = request.body.content;
//     let rating = request.body.rating;
//     let result = await db.query(
//       `INSERT INTO categories (category_name) VALUES ($4);
//       SELECT categories.category_name FROM categories WHERE categories.category_name = ($4);
//       INSERT INTO guestbook (title, content, rating, category_name) VALUES
//       ($1, $2, $3, $4)`,
//       [title, content, rating, category_name]
//     );
//     response.status(200).json(result);
//   } catch (err) {
//     response.status(400).json(err);
//   }
// });

// `INSERT INTO categories ${category_name},
// SELECT ${category_name} FROM categories WHERE guestbook.id = categories.id,
// INSERT INTO guestbook (title, content, rating, category_name) VALUES
// ($1, $2, $3, $4)`,
// [title, content, rating, category_name]
// );

//update request

//delete request

// SELECT guestbook.title, guestbook.content, guestbook.rating, categories.category_name FROM guestbook INNER JOIN categories ON guestbook.id = categories.id`

// INSERT INTO categories (category_name) VALUES ('hi');
// SELECT categories.category_name FROM guestbook INNER JOIN categories ON guestbook.id = categories.id;
// INSERT INTO guestbook (title, content, rating, categories.category_name) VALUES
// ($1, $2, $3, $4),
// (title, content, rating, category_name)
