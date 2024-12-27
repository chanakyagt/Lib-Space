'use client'
import { fetchBooks } from "../../../../../actions/FetchBooks"
import Testsearch from "@/components/testsearch";
import BookCard from "@/components/ui/BookCard";
import { useEffect, useState } from "react";




const page =  () => {
  const [books, setBooks] = useState([]);
  const [loading,isLoading]=useState(true)
  useEffect(() => {
    const getBooks = async () => {
      const fetchedBooks = await fetchBooks();
      setBooks(fetchedBooks);
      isLoading(false)
      console.log(fetchedBooks);
    };

    getBooks();
  }, []);
  return (
    // <p>{loading ? 'Loading....':'content fetched'}</p>
    <div className="w-full flex flex-col gap-4 bg-red-500  flex-wrap px-2 py-2">
      <Testsearch></Testsearch>
      <div className="w-full flex gap-5 bg-blue-500 flex-wrap">
      {
  books.map((item) => (
    <BookCard
      id={item._id}
      key={item.isbn}
      title={item.title}
      isbn={item.isbn}
      tags={item.tags}
      author={item.author}
      available={item.availableQuantity}
      
    />
  ))
}
      
    </div>
    </div>
  )
}

export default page



// Object
// author
// : 
// "Roald Dahl"
// availableQuantity
// : 
// 13
// isbn
// : 
// "978-0142410318"
// title
// : 
// "Charlie and the Chocolate Factory 