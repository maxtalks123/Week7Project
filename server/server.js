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
    let posts = await db.query(`SELECT * FROM guestbook`.all());
    console.log(posts);
    response.status(200).json(posts);
    return;
  } catch (err) {
    response.status(400).json(err);
  }
});
