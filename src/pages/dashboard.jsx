import { getSession } from "next-auth/react";
import prisma from "../lib/prisma";
import Logo from "../components/Logo";
import { HiOutlineSearch } from "react-icons/hi";
import axios from "axios";

export default function dashboard({ user }) {
  const handleSubmit = async e => {
    console.log(e.target.value);
   const {data} = await axios.post("/api/search", {
      search: e.target.value,
    });
    console.log(data);
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
      <div className="flex justify-center">
        <form
          action="/dashboard"
          method="POST"
          className="relative flex mt-8 justify-center items-center w-[35rem] "
          onChange={handleSubmit}
        >
          <HiOutlineSearch className="text-zinc-400 text-2xl left-[34rem] " />
          <input
            className=" w-[90%] ml-[-2.8rem] inline-block  pl-14 py-4 rounded-lg  placeholder:text-lg  bg-[rgba(255,255,255,.2)] focus:outline-none focus:caret-[#2CD261] text-white  focus:w-[100%] transition-all duration-200 ease-in-out"
            type="text"
            placeholder="Search For Books..."
            autoComplete="off"
          />
        </form>
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
