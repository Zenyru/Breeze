import { getSession } from "next-auth/react";
import prisma from "../lib/prisma";
import Logo from "../components/Logo";
import { HiOutlineSearch } from "react-icons/hi";
import axios from "axios";
import { useState } from "react";
import { DebounceInput } from "react-debounce-input";

export default function dashboard({ user }) {
  const [books, setBooks] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearchQuery, setIsSearchQuery] = useState(false);
  const handleChange = async e => {
    if (e.target.value.length === 0) {
      setIsSearchQuery(false);
    } else if (e.target.value.length > 0) {
      setIsSearchQuery(true);
      console.log(e.target.value);
      const { data } = await axios.post("/api/search", {
        search: e.target.value,
      });
      if (data) {
        setBooks(data.message);
      }

      // data.message.map(book => {
      //   console.log(book.title);
      //   return (
      //     <div>
      //       <p className="text-white text-lg">{book.title}</p>
      //     </div>
      //   );
      // });

      // console.log(data);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="pt-4">
        <Logo />
      </div>
      <h1 className="text-white text-center font-bold text-2xl">
        Hi{" "}
        <span className="bg-gradient-to-r from-[#A8EB12] to-[#2CD261] text-gradient">
          {user.name}
        </span>{" "}
        ! Welcome to your dashboard.
      </h1>
      <div className="flex justify-center items-center flex-col ">
        <form
          action="/dashboard"
          method="POST"
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
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => {
              setIsSearchFocused(false);
            }}
          />
        </form>
        {isSearchFocused && isSearchQuery && (
          <ul className="dropdown h-auto max-h-64 w-[35rem] mt-4 rounded-lg mr-[1.27rem] bg-[rgba(255,255,255,.2)] overflow-y-scroll">
            {books.map(book => (
              <li
                key={books.indexOf(book)}
                className="text-white text-lg p-2 border-b-[1px] border-gray-700 first:pt-2 last:pb-2 "
              >
                {book.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export const getServerSideProps = async ctx => {
  const session = await getSession(ctx);

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {
      session,
      user,
    },
  };
};
