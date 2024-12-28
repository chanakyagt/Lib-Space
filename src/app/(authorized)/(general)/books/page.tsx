'use client';
import SkeletonCard from "@/components/BookSkeletonCard";
import { fetchBooks } from "../../../../../actions/FetchBooks";
import Testsearch from "@/components/testsearch";
import BookCard from "@/components/ui/BookCard";
import { useEffect, useState } from "react";
import AddBookPlus from "@/components/AddBookPlus";

const Page = () => {
  const [books, setBooks] = useState([]);
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    const getBooks = async () => {
      const fetchedBooks = await fetchBooks();
      setBooks(fetchedBooks);
      isLoading(false);
      console.log(fetchedBooks);
    };

    getBooks();
  }, []);

  return (
    <div className="w-full flex flex-col gap-4 flex-wrap px-2 py-2">
      <Testsearch />

      {loading ? (
        <div className="w-full flex gap-5 flex-wrap">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : (
        <div className="w-full flex gap-5 flex-wrap">
          {books.map((item) => (
            <BookCard
              id={item._id}
              key={item.isbn}
              title={item.title}
              isbn={item.isbn}
              tags={item.tags}
              author={item.author}
              available={item.availableQuantity}
            />
          ))}
        </div>
      )}

      {/* Other content if any */}
      
      {/* Place the button outside the main content */}

      <AddBookPlus></AddBookPlus>
      </div>
  );
};

export default Page;
