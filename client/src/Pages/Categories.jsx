import { useState, useEffect } from "react";

export default function Categories() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  let categoriesJSX = category.map((category) => (
    <div key={category.id} className="category">
      <h3>Category name:</h3>
      <ul>
        <p>{category.category_name}</p>
      </ul>
    </div>
  ));

  async function getCategories() {
    let data = await fetch(`http://localhost:6020/posts`);
    let result = await data.json();
    setCategory(result);
  }
  return (
    <div key={category.id}>
      <h1>Categories of posts</h1>
      {categoriesJSX ? (
        categoriesJSX
      ) : (
        <h1> No categories found, add yours now!</h1>
      )}
    </div>
  );
}
