"use client";
import { useParams } from "next/navigation"; // Example path
import { fetchBook } from "../../../../../../actions/FetchBooks";
import { Badge } from "@/components/ui/badge";
import { connectToMongoDB } from "@/lib/dbConnect";
import bookModel from "@/schema/BookSchema";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import IndividualBook from "@/components/IndividualBook";

const page = ({ params }  ) => {
  // const obj={
  //   "_id": "673f5612d5965f66b76a1fbf",
  //   "title": "The Upanishads",
  //   "author": "Eknath Easwaran",
  //   "isbn": "978-8184950915",
  //   "summary": "\"The Upanishads\" translated by Eknath Easwaran is not a novel, but rather a modern English translation and interpretation of ancient Indian scriptures that form the core of Indian philosophical thought. The Upanishads are part of the Vedas, ancient Indian texts that are foundational to Hinduism and also influential in other Indian religions.\n\nEknath Easwaran's version is highly regarded for its accessibility and clarity, making these profound texts more approachable for Western readers. In his translation, Easwaran provides detailed introductions and context for each of the Upanishads he includes, helping readers understand the historical and spiritual significance of the teachings.\n\nThe Upanishads themselves are a collection of texts that explore the nature of reality, the self, and the universe, posing deep philosophical questions and offering insights aimed at guiding individuals towards spiritual enlightenment. They delve into themes such as the connection between the individual soul (Atman) and the universal essence (Brahman), the nature of knowledge, and the path to liberation.\n\nEaswaran's translation is particularly noted for its emphasis on how the teachings of the Upanishads can be applied to daily life, making it a valuable resource for those seeking spiritual depth in their everyday experiences. This translation is suitable for both newcomers to Indian philosophy and those who are already familiar with Eastern spirituality, providing a thoughtful and meditative reading experience.",
  //   "availableQuantity": 10,
  //   "borrowedBy": [],
  //   "tags": [
  //     "Hinduism",
  //     "Philosophy",
  //     "Spirituality",
  //     "Religious Texts",
  //     "Indian Literature"
  //   ],
  //   "createdAt": "2024-11-21T15:47:30.226Z",
  //   "updatedAt": "2024-11-21T15:47:30.226Z",
  //   "__v": 0
  // }
  const [book, setBook] = useState({
    _id: "n/a",
    title: "n/a",
    author: "n/a",
    isbn: "n/a",
    summary: "n/a",
    availableQuantity: 0,
    borrowedBy: [],
    tags: [],
    createdAt: "n/a",
    updatedAt: "n/a",
    __v: 0,
  });
  const [loading, setLoading] = useState(true);

  const param_book = useParams(params).book;
  console.log("res-params",param_book)

  useEffect(() => {
    console.log("hi")
    // console.log(params.book);
    fetchBook(param_book).then((res) => {
      console.log("res in promise", res);
      const data = res[0];
      setBook(data);
    });
    setLoading(false);
    console.log("recieved", book);
    console.log("end of the useEffect");
  }, []);

  return (
    <div>

      {loading ? "loading" : <IndividualBook book={book}></IndividualBook>}
    </div>
  );
};

export default page;
