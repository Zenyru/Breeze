import styles from "../styles/BookContainer.module.css";
import axios from "axios";
import { BsDot } from "react-icons/bs";
import { HiMinusCircle } from "react-icons/hi";
import { Tooltip } from "@nextui-org/react";
import Toastify from "toastify-js";
import { useEffect, useState } from "react";

export default function BookContainer({ settingFiltered, info }) {
  const [books, setBooks] = useState([]);

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
      setBooks(books.filter(book => book.bookId !== bookId));
      // passing the filtered books without the deleted book to the parent component
      settingFiltered(books.filter(book => book.bookId !== bookId));

      if (data) {
        Toastify({
          text: "Book is removed successfully",
          duration: 2000,
          style: {
            color: "white",
            textAlign: "center",
            background:
              "linear-gradient(to right,rgb(0, 176, 155), rgb(150, 201, 61))",
            height: "2.3rem",
            width: "17rem",
            padding: ".25rem",
            position: "absolute",
            left: "0",
            right: "0",
            margin: "0 auto",
          },
        }).showToast();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-white  flex justify-center relative z-0  ">
      <div className="h-48 w-48 rounded-xl blur-3xl animate-bounce-slow absolute left-[3rem] bottom-[-6rem] bg-[rgba(166,235,18,0.24)] mb-10"></div>
      <div className="h-48 w-48 rounded-xl blur-3xl animate-bounce-slow absolute right-10 top-[5rem] bg-[rgba(44,210,97,0.24)]"></div>
      <div className=" w-[50rem] h-[28rem] bg-[#ffffff36] mt-12 rounded-lg ">
        <ul className={styles.bookContainerScroll}>
          {/* mapping the book array in to list items */}
          {books
            ? books.map((book, index) => {
                return (
                  <li
                    key={index}
                    className=" text-white text-lg p-4 border-b-[1px]  border-gray-700 flex  items-center hover:bg-[rgba(51,65,81,0.57)"
                  >
                    {/* h-24 */}
                    <img className="" src={book.image} alt="book image" />
                    <div className="flex items-center justify-center ml-8">
                      <BsDot className="text-xl" />
                      <p className="ml-2 text-xl">{book.title}</p>
                    </div>

                    <div className="ml-auto mb-auto mt-5 ">
                      <Tooltip
                        content={"Remove Book"}
                        color="invert"
                        contentColor="default"
                      >
                        <HiMinusCircle
                          onClick={() => deleteBook(book.bookId)}
                          className="text-3xl text-[#ffffff88] cursor-pointer"
                        />
                      </Tooltip>
                    </div>
                  </li>
                );
              })
            : null}
        </ul>
      </div>
    </div>
  );
}
