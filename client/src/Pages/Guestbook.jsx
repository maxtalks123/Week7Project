import { useState, useEffect } from "react";
import SortFunction from "./SortFunction";
import "./Guestbook.css";

export default function Guestbook() {
  const [guestbook, setGuestbook] = useState([]);

  const [form, setForm] = useState({});

  useEffect(() => {
    getReviews();
  }, [form]);
  async function getReviews() {
    let data = await fetch(`http://localhost:6020/posts`);
    let result = await data.json();
    setGuestbook(result);
  }

  let reviewsJSX = guestbook.map((reviews) => (
    <div key={reviews.id} className="individualReview">
      <h3>Review title: {reviews.title}</h3>
      <p>What this user said: {reviews.content}</p>
      <p>What this user rated us: {reviews.rating}</p>
      <p>Category: {reviews.category_name}</p>
    </div>
  ));

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let result = await fetch(`http://localhost:6020/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    if (result.ok) {
      getReviews();
    }
  }

  return (
    <div key={guestbook.id} className="guestbookContainer">
      <h1>See what our guests said below!</h1>
      <form key={guestbook.id} onSubmit={handleSubmit}>
        <input
          placeholder="title your review"
          name="title"
          onChange={handleChange}
        ></input>
        <input
          placeholder="main content"
          name="content"
          onChange={handleChange}
        ></input>
        <input
          placeholder="rate your experience"
          name="rating"
          onChange={handleChange}
        ></input>
        <input
          placeholder="review category"
          name="category_name"
          onChange={handleChange}
        ></input>
        <button type="submit">Submit here</button>
        <SortFunction optionValue={reviewsJSX.category_name} />
      </form>
      <div className="alignReviews">
        {reviewsJSX ? reviewsJSX : <h1>No Reviews Found, add yours!</h1>}
      </div>
    </div>
  );
}
