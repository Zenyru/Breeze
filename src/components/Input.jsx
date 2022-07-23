import { HiOutlineSearch } from "react-icons/hi";
import axios from "axios";
import { DebounceInput } from "react-debounce-input";
import { useState } from "react";

export default function Input() {
  const [books, setBooks] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearchQuery, setIsSearchQuery] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isThereData, setIsThereData] = useState(false);

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

  // console.log(isSearchQuery, "isSearchQuery");
  // console.log(isSearchFocused, "isSearchFocused");

  return (
    <div className="flex justify-center items-center flex-col ">
      <form
        onSubmit={e => e.preventDefault()}
        className="relative flex mt-8 justify-center items-center w-[35rem] "
      >
        <HiOutlineSearch className="text-zinc-400 text-2xl left-[34rem] " />

        <DebounceInput
          className=" w-[90%] ml-[-2.8rem] inline-block  pl-14 py-4 rounded-lg  placeholder:text-lg  bg-[rgba(255,255,255,.2)] focus:outline-none focus:caret-[#2CD261] text-white  focus:w-[100%] transition-all duration-200 ease-in-out "
          type="text"
          debounceTimeout={500}
          onChange={handleChange}
          placeholder="Search For Books..."
          autoComplete="off"
          onFocus={() => {
            setIsSearchFocused(true);
          }}
          onBlur={() => {
            setIsSearchFocused(false);
          }}
        />
      </form>
      {isSearchFocused && isSearchQuery && (
        <ul className="dropdown h-auto max-h-64 w-[35rem] mt-4 rounded-lg mr-[1.27rem] bg-[rgba(255,255,255,.2)] overflow-y-scroll ">
          {isDataLoaded ? (
            books.map((book, index) => (
              <li
                key={index}
                className="text-white text-lg p-2 border-b-[1px] cursor-pointer border-gray-700 first:pt-2 last:pb-2 flex items-center "
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
                <p className="text-white text-lg p-2 ml-5 ">No Results Found</p>
              )}
            </div>
          )}
        </ul>
      )}
    </div>
  );
}
