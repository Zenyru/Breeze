import { HiOutlineSearch } from "react-icons/hi";
import axios from "axios";
import { DebounceInput } from "react-debounce-input";
import { useState, useRef, useEffect } from "react";
import { useOutsideClick } from "rooks";
import { toast } from "react-toastify";
import nProgress from "nprogress";

export default function Input({ passingData, filtered, initialBooks }) {
  const [books, setBooks] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearchQuery, setIsSearchQuery] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isThereData, setIsThereData] = useState(false);
  const [bookInfo, setBookInfo] = useState([]);

  const ref = useRef();
  const inputRef = useRef(null);
  // whenever there is a change in filtered array(which happens when the user deletes the book) , the books array is set to the filtered array
  useEffect(() => {
    setBookInfo(filtered);
  }, [filtered]);

  // getting the initial data from the database
  useEffect(() => {
    setBookInfo(initialBooks);
    passingData(initialBooks);
  }, []);

  const handleChange = async e => {
    if (e.target.value.length === 0) {
      setIsSearchQuery(false);
      setIsThereData(false);
    } else if (e.target.value.length > 0) {
      setIsSearchQuery(true);
      setIsThereData(true);
      setBooks([]);
      try {
        setIsDataLoaded(false);
        // getting the data from the API
        const { data } = await axios.post("/api/search", {
          search: e.target.value,
        });

        setIsThereData(true);
        setBooks(data.message);

        if (data) {
          setIsDataLoaded(true);
        }

        if (data.message.length === 0) {
          setIsThereData(false);
        }
      } catch (error) {
        setIsDataLoaded(false);
        setIsThereData(false);
      }
    }
  };

  const listItemClicked = async (e, key, id) => {
    const itemClicked = document.querySelector(".dropdown").childNodes[key];

    try {
      setIsSearchFocused(false);
      inputRef.current.value = "";
      // creating a new book in the database
      nProgress.start();
      const { data } = await axios.post("/api/addBooks", {
        bookId: itemClicked.id,
      });

      if (data) {
        setBookInfo([...bookInfo, data]);
        // passing the data to the parent component
        passingData([...bookInfo, data]);

        const notify = () => {
          toast("Book is added successfully", {
            style: {
              background:
                "linear-gradient(to right,rgb(0, 176, 155), rgb(150, 201, 61))",
              color: "white",
            },
          });
        };
        // console.log("passingData", [...bookInfo, data]);
        notify();
      }
    } catch (error) {
      if (error.response.data.message) {
        const notify = () => {
          toast("Book is already added", {
            style: {
              background:
                "linear-gradient(to right,rgb(0, 176, 155), rgb(150, 201, 61))",
              color: "white",
            },
          });
        };
        notify();
      } else {
        console.log(error);
      }
    } finally {
      nProgress.done();
    }
  };

  const clickedOutside = () => {
    setIsSearchFocused(false);
  };

  useOutsideClick(ref, clickedOutside);

  return (
    <div className="flex justify-center items-center flex-col relative">
      <div ref={ref} className="flex flex-col items-center relative">
        <form
          onSubmit={e => e.preventDefault()}
          className="relative flex mt-8  justify-center items-center w-[35rem] sm:ml-6 sm:w-[30rem] "
        >
          <HiOutlineSearch className="text-zinc-400 text-2xl left-[34rem] " />
          <DebounceInput
            ref={inputRef}
            className="search-input  w-[90%] ml-[-2.8rem] inline-block  pl-14 py-4 rounded-lg  placeholder:text-lg  bg-[rgba(255,255,255,.2)] focus:outline-none focus:caret-[#2CD261] text-white  focus:w-[100%] transition-all duration-200 ease-in-out relative z-20"
            // type="text"
            debounceTimeout={500}
            onChange={handleChange}
            placeholder="Search For Books..."
            autoComplete="off"
            onFocus={() => {
              setIsSearchFocused(true);
            }}
            spellCheck="false"
          />
        </form>
        {isSearchFocused && isSearchQuery && (
          <ul className="dropdown absolute top-[5.5rem] z-20 h-auto max-h-64 w-[35rem] sm:w-[30rem] sm:ml-6 xxs:w-[28rem] mt-4 rounded-lg mr-[1.27rem] bg-[#242121cb] overflow-y-scroll ">
            {isDataLoaded ? (
              books.map((book, index) => (
                <li
                  key={index}
                  id={book.id}
                  className="list-element text-white text-lg p-2 border-b-[1px] cursor-pointer border-gray-700 first:pt-2 last:pb-2 flex items-center hover:bg-[rgba(51,65,81,0.57)] "
                  onClick={e => listItemClicked(e, index, book.id)}
                >
                  <img className="mr-8" src={book.imageLink} />
                  <p>{book.title}</p>
                </li>
              ))
            ) : (
              <div className="flex w-[100%] justify-start rounded-none">
                {isThereData ? (
                  <p className="text-white text-lg p-2 ml-5 ">Loading...</p>
                ) : (
                  <p className="text-white text-lg p-2 ml-5 ">
                    No Results Found
                  </p>
                )}
              </div>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
