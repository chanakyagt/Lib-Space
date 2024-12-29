import React from 'react';

import { Badge } from './ui/badge';
import { UserPlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ReturnBookButton from './ReturnBookButton';

// import AddUser from './AddUser'

const IndividualUser = ({ user }) => {
  const router = useRouter();

  const handleBookClick = (bookId) => {
    router.push(`/books/${bookId}`);
  };

  console.log('in component', user);

  return (
    <div className='px-10 py-4 flex flex-col gap-4'>
      <h1 className='text-lg font-bold'>{user.name}</h1>
      <div>
        
        <h2 className='text-sm italic text-zinc-800'>Email: {user.email}</h2>
        <h2 className='text-sm italic text-zinc-800'>User Type: {user.userType}</h2>
        <div className='flex gap-1'>
          <h2 className='text-sm italic text-zinc-800'>
            Borrowed Books: {user.borrowedBooks.length}
          </h2>
        </div>
      </div>
      {/* Display borrowed books */}
      <div>
        <h1 className='text-md font-bold'>Borrowed Books</h1>
        {user.borrowedBooks.length > 0 ? (
          <ul className='list-disc pl-5'>
            {user.borrowedBooks.map((book) => (
              <li
                key={book._id}
                onClick={() => handleBookClick(book.isbn)}
                className='cursor-pointer text-blue-500 hover:underline'
              >
                {book.title} by {book.author}
              </li>
            ))}
          </ul>
        ) : (
          <p className='italic text-zinc-800'>No borrowed books.</p>
        )}
      </div>
      {/* Display user roles as badges */}
      <ReturnBookButton user={user}></ReturnBookButton>
    </div>
  );
};

export default IndividualUser;
