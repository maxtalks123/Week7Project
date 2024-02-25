import { useState, useEffect } from "react";

export default function Guestbook() {
  const [guestbook, setGuestbook] = useState([]);

  const [form, setForm] = useState({});

  useEffect(() => {
    getReviews();
  }, []);
  async function getReviews() {
    let data = await fetch(`http://localhost:6020/seedposts`);
    let result = await data.json();
    setGuestbook(result);
  }

  let reviewsJSX = guestbook.map((reviews) => (
    <div key={reviews.id} className="individualReview">
      <h3>Review title: {reviews.title}</h3>
      <p>What this user said: {reviews.content}</p>
      <p>What this user rated us: {reviews.rating}</p>
      <p>Category: {reviews.category}</p>
    </div>
  ));

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
    console.log(form);
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
    <div>
      <h1>See what our guests said below!</h1>
      <form onSubmit={handleSubmit}>
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
      </form>
      {reviewsJSX ? reviewsJSX : <h1>No Reviews Found, add yours!</h1>}
    </div>
  );
}
