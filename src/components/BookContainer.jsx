import styles from "../styles/BookContainer.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SingleBook from "./SingleBook";

const notify = () => {
  toast("Book is removed successfully", {
    style: {
      background:
        "linear-gradient(to right,rgb(0, 176, 155), rgb(150, 201, 61))",
      color: "white",
    },
  });
};

export default function BookContainer({ settingFiltered, info }) {
  const [books, setBooks] = useState([]);
  const [updatedBooks, setUpdatedBooks] = useState([]);

  // const [isFinished , setIsFinished] = useState(false);

  // adding info to the books state when ever there is a change in the info
  useEffect(() => {
    try {
      setBooks(info);
    } catch (error) {
      console.log(error);
    }
  }, [info]);

  // deleting the book from the database
  const deleteBook = async bookId => {
    try {
      const { data } = await axios.delete(`/api/books/${bookId}`);
      // adding the filtered books without the deleted book to the books state
      setBooks(books.filter(book => book.id !== bookId));
      // passing the filtered books without the deleted book to the parent component
      settingFiltered(books.filter(book => book.id !== bookId));

      if (data) {
        notify();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-white  flex justify-center relative z-0 lg:pb-8 xs:min-h-screen">
      <div className="h-48 w-48 rounded-xl blur-3xl animate-bounce-slow 2xl:hidden absolute left-[3rem] bottom-[-6rem] bg-[rgba(166,235,18,0.24)] mb-10"></div>
      <div className="h-48 w-48 rounded-xl blur-3xl animate-bounce-slow 2xl:hidden absolute right-10 top-[5rem] bg-[rgba(44,210,97,0.24)]"></div>
      <div className=" w-[50rem] md:w-[40rem] sm:w-[30rem] xxs:h-[35rem]  md:h-[26.5rem] h-[28rem] bg-[#ffffff36] mt-12 rounded-lg ">
        <ul className={styles.bookContainerScroll}>
          {/* mapping the book array in to list items */}
          {books?.map((book, index) => {
            const pageCount = book.pageCount.toString();
            const updatedBook = updatedBooks.find(item => item.id == book.id);
            const isBookCompleted = updatedBook
              ? updatedBook.currentPage == book.pageCount
              : book.currentPage == book.pageCount;

            return (
              <SingleBook
                key={index}
                pageCount={pageCount}
                updatedBook={updatedBook}
                isBookCompleted={isBookCompleted}
                book={book}
                deleteBook={deleteBook}
                setUpdatedBooks={setUpdatedBooks}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}
