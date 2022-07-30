import styles from "../styles/BookContainer.module.css";
import axios from "axios";
import { BsDot } from "react-icons/bs";
import { HiMinusCircle } from "react-icons/hi";
import { Tooltip } from "@nextui-org/react";
import {  useRef } from "react";
import { Popover, Transition } from "@headlessui/react";
import { IoMdArrowDropleft } from "react-icons/io";
import "react-toastify/dist/ReactToastify.css";

const SingleBook = ({
  pageCount,
  updatedBook,
  isBookCompleted,
  deleteBook,
  book,
  setUpdatedBooks,
}) => {
  const ref = useRef(null);

  return (
    <Popover className="w-[100%]">
      <li className=" text-white text-lg p-4 border-b-[1px] relative border-gray-700 flex  items-center ">
        {/* h-24 */}
        <img className="" src={book.image} alt="book image" />
        <div className="flex items-center justify-center ml-8">
          <BsDot className="text-xl" />
          <p className="ml-2 text-xl">{book.title}</p>
        </div>
        <Popover.Button className=" ml-auto mt-auto mr-[-1.5rem] mb-4">
          <Tooltip content={"Details"} color="invert" contentColor="default">
            <IoMdArrowDropleft />
          </Tooltip>
        </Popover.Button>

        <div className=" mb-auto mt-5 ">
          <Tooltip
            content={"Remove Book"}
            color="invert"
            contentColor="default"
          >
            <HiMinusCircle
              onClick={() => deleteBook(book.id)}
              className="text-3xl text-[#ffffff88] cursor-pointer"
            />
          </Tooltip>
        </div>
        <Transition
          enter="transition ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100 "
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 "
          leaveTo="opacity-0 "
        >
          <Popover.Panel>
            <div className="text-white absolute top-4 right-16 rounded-lg bg-[#000000a6]  h-[11rem] w-[20rem] backdrop-blur-md p-4 ">
              <form
                onSubmit={async e => {
                  e.preventDefault();
                  const currentPage = ref.current?.value;
                  console.log(ref.current);
                  const numbCurrentPage = Math.trunc(currentPage);

                  const { data } = await axios.post(`/api/books/${book.id}`, {
                    currentPage: numbCurrentPage,
                  });
                  ref.current.value = "";
                  ref.current.blur();
                  setUpdatedBooks(prevBooks => [
                    ...prevBooks.filter(item => item.id !== book.id),
                    data,
                  ]);
                }}
              >
                <input
                  ref={ref}
                  min="0"
                  max={pageCount}
                  type="number"
                  className=" h-[2.5rem] w-[50%] pl-4 rounded-md  placeholder:text-sm  bg-[rgba(255,255,255,.2)] focus:outline-none focus:caret-[#2CD261] text-white transition-all duration-200 ease-in-out relative z-20 focus:w-[80%]"
                  placeholder="Page Number "
                />
              </form>

              {!isBookCompleted ? (
                <>
                  <p className="mt-2 ml-3 tracking-wide ">
                    Number Of Pages : {book.pageCount}
                  </p>
                  <p className="mt-1 ml-3 tracking-wide ">
                    Current Page :{" "}
                    {updatedBook ? updatedBook.currentPage : book.currentPage}
                  </p>
                  <p className="mt-1 ml-3 tracking-wide ">
                    Remaining Pages :{" "}
                    {updatedBook
                      ? updatedBook.pageCount - updatedBook.currentPage
                      : book.pageCount - book.currentPage}{" "}
                  </p>
                </>
              ) : (
                <p className="mt-4 text-lg font-semibold">
                  <span className="bg-gradient-to-r from-[#2CD261] to-[#A8EB12] text-gradient">
                    Congrats!
                  </span>{" "}
                  You Have Finished Reading This Book
                </p>
              )}
            </div>
          </Popover.Panel>
        </Transition>
      </li>
    </Popover>
  );
};

export default SingleBook;
