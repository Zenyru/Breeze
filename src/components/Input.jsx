import { HiOutlineSearch } from "react-icons/hi";
import axios from "axios";
import { DebounceInput } from "react-debounce-input";
import { useState, useRef, useEffect } from "react";
import Toastify from "toastify-js";
import { useOutsideClick } from "rooks";

export default function Input({
  passingData,
  filtered,
}) {
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
    try {
      axios.get("/api/addBooks").then(res => {
        setBookInfo(res.data);
        passingData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
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
    const itemImage = itemClicked.querySelector("img");
    try {
      setIsSearchFocused(false);
      inputRef.current.value = "";
      // creating a new book in the database
      const { data } = await axios.post("/api/addBooks", {
        bookId: itemClicked.id,
        title: itemClicked.innerText,
        image: itemImage.src,
      });

      if (data) {
        setBookInfo([...bookInfo, data]);
        // passing the data to the parent component
        passingData([...bookInfo, data]);

        console.log("passingData", [...bookInfo, data]);
        Toastify({
          text: "Book is added successfully",
          duration: 2000,
          style: {
            color: "white",
            textAlign: "center",
            background:
              "linear-gradient(to right,rgb(0, 176, 155), rgb(150, 201, 61))",
            height: "2.3rem",
            width: "15rem",
            padding: ".25rem",
            position: "absolute",
            left: "0",
            right: "0",
            margin: "0 auto",
          },
        }).showToast();
      }
    } catch (error) {
      if (error.response.data.message) {
        Toastify({
          text: "Book is already added",
          duration: 2000,
          style: {
            color: "white",
            textAlign: "center",
            background:
              "linear-gradient(to right,rgb(0, 176, 155), rgb(150, 201, 61))",
            height: "2.3rem",
            width: "15rem",
            padding: ".25rem",
            position: "absolute",
            left: "0",
            right: "0",
            margin: "0 auto",
          },
        }).showToast();
      } else {
        console.log(error);
      }
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
          className="relative flex mt-8 justify-center items-center w-[35rem] "
        >
          <HiOutlineSearch className="text-zinc-400 text-2xl left-[34rem] " />
          <DebounceInput
            ref={inputRef}
            className="search-input w-[90%] ml-[-2.8rem] inline-block  pl-14 py-4 rounded-lg  placeholder:text-lg  bg-[rgba(255,255,255,.2)] focus:outline-none focus:caret-[#2CD261] text-white  focus:w-[100%] transition-all duration-200 ease-in-out relative z-20"
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
          <ul className="dropdown absolute top-[5.5rem] z-20 h-auto max-h-64 w-[35rem] mt-4 rounded-lg mr-[1.27rem] bg-[#242121cb] overflow-y-scroll ">
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
