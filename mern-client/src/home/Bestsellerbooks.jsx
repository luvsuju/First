import React, { useEffect, useState } from 'react';
import BookCards from '../components/BookCards';

const BestSellerBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/all-books")
      .then(res => res.json())
      .then(data => {
        console.log(data);  // Log the fetched data
        setBooks(data.slice(0,8));    // Update the state with the fetched data if needed
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <BookCards books={books} headline="Best Seller Books"/>
    </div>
  );
};

export default BestSellerBooks;
